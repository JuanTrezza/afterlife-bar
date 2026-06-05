/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, Volume2, Music, Radio } from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  tempo: number; // multiplier for visual speed
}

export default function MusicVisualizer() {
  const tracks: Track[] = [
    { id: "rebel-path", title: "The Rebel Path (Cellist Version)", artist: "P.T. Adamczyk", tempo: 1.8 },
    { id: "never-fade-away", title: "Never Fade Away (Night Circle Edit)", artist: "SAMURAI", tempo: 1.2 },
    { id: "chippin-in", title: "Chippin' In (Overdrive Re-mix)", artist: "Kerry Eurodyne", tempo: 1.6 },
    { id: "cyber-dream", title: "I Really Want to Stay at Your House", artist: "Rosa Walton", tempo: 1.1 }
  ];

  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animeRef = useRef<number | null>(null);

  const track = tracks[currentTrackIdx];

  // Canvas visualizer loop drawing custom animated retro equalizer bars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let barsCount = 32;
    let frequencies = Array(barsCount).fill(2); // start static flatline

    const render = () => {
      // Clear canvas with deep dark transparent overlay
      ctx.fillStyle = "rgba(7, 5, 9, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let barWidth = (canvas.width / barsCount) - 2;
      let time = Date.now() * 0.003 * track.tempo;

      // Calculate dynamic bar fluctuations
      for (let i = 0; i < barsCount; i++) {
        if (isPlaying) {
          // Combination of different sine frequencies for natural bounce
          let value = Math.sin(i * 0.3 + time) * Math.cos(i * 0.15 - time) * 15;
          value += Math.sin(i * 0.8 + time * 1.5) * 8;
          value = Math.abs(value) + 3; // ensure positive
          
          // decay towards previous frequencies slightly for smoother motion
          frequencies[i] = frequencies[i] * 0.7 + value * 0.3;
        } else {
          // Slow flatline decay when paused
          frequencies[i] = frequencies[i] * 0.85;
          if (frequencies[i] < 2) frequencies[i] = 1.5;
        }

        // Color styling: color gradients from cyan to neon purple, to gold/yellow at peaks
        let gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, "#9b00ff"); // deep base cyber purple
        gradient.addColorStop(0.5, "#00F0FF"); // neon cyan
        gradient.addColorStop(1, "#FF8C00"); // Peak gold

        ctx.fillStyle = gradient;
        
        let barHeight = frequencies[i] * 1.2;
        // Keep within canvas layout boundaries
        if (barHeight > canvas.height - 4) barHeight = canvas.height - 4;

        ctx.fillRect(
          i * (barWidth + 2), 
          canvas.height - barHeight, 
          barWidth, 
          barHeight
        );
      }

      animeRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animeRef.current) cancelAnimationFrame(animeRef.current);
    };
  }, [isPlaying, currentTrackIdx, track]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    setCurrentTrackIdx(prev => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 bg-surface-dark/95 border-t border-cyber-purple/40 shadow-[0_-5px_15px_rgba(155,0,255,0.15)] font-mono text-xs py-2 lg:py-3 px-4 lg:px-8">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
        
        {/* Left Side: Track Title / Info */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="p-2 bg-cyber-purple/20 border border-cyber-purple/40 text-cyber-purple-light rounded-sm animate-pulse hidden sm:block">
            <Radio className="w-4 h-4" />
          </div>
          <div className="text-left select-none text-[11px] truncate max-w-xs">
            <div className="text-[#DFB7FF] font-bold tracking-wide truncate">{track.title}</div>
            <div className="text-[10px] text-text-muted mt-0.5 uppercase truncate">{track.artist}</div>
          </div>
        </div>

        {/* Center: Interactive Graphic Equalizer Canvas */}
        <div className="flex-1 max-w-sm lg:max-w-md h-12 w-full border-l border-r border-cyber-purple/15 px-3 select-none flex items-center justify-center">
          <canvas 
            ref={canvasRef} 
            width={380} 
            height={48} 
            className="w-full h-full bg-[#070509]/30 rounded-none cursor-pointer"
            onClick={handlePlayPause}
            title="Interactive equalizer - click to pause/play"
          />
        </div>

        {/* Right Side: Player Knobs & Control actions */}
        <div className="flex items-center gap-6 justify-between md:justify-end w-full md:w-auto">
          {/* Visual state label */}
          <div className="flex items-center gap-2 text-[10px] text-text-muted">
            <Volume2 className="w-3.5 h-3.5 text-cyber-cyan" />
            <span className="hidden lg:inline">AUDIO: HIGH_RES //</span>
            <span className={isPlaying ? "text-cyber-cyan font-bold" : ""}>
              {isPlaying ? "PLAYING" : "PAUSED"}
            </span>
          </div>

          {/* Buttons Group */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayPause}
              className={`p-2 transition-all border cursor-pointer ${
                isPlaying 
                  ? "bg-cyber-cyan text-surface-base border-cyber-cyan hover:bg-cyber-cyan/80" 
                  : "border-cyber-purple/35 text-cyber-purple-light hover:border-cyber-cyan hover:text-cyber-cyan"
              }`}
              title={isPlaying ? "Pause Stream" : "Play Stream"}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={handleNextTrack}
              className="p-2 border border-cyber-purple/35 text-text-primary hover:border-cyber-cyan hover:text-cyber-cyan transition-colors duration-300 cursor-pointer"
              title="Next Track"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
