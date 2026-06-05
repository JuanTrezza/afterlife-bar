/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import DashboardHeader from "./components/DashboardHeader";
import HeroSection from "./components/HeroSection";
import ContractsDeck from "./components/ContractsDeck";
import DrinkCatalog from "./components/DrinkCatalog";
import NetLogsFeed from "./components/NetLogsFeed";
import ReservationTerminal from "./components/ReservationTerminal";
import MusicVisualizer from "./components/MusicVisualizer";
import { ShieldAlert, Zap, RefreshCw, X } from "lucide-react";

export default function App() {
  const [barTab, setBarTab] = useState<number>(0);
  const [synthSpike, setSynthSpike] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Show critical alert when spikes exceed 85%
  const [showOverloadAlert, setShowOverloadAlert] = useState<boolean>(false);
  const [decompressing, setDecompressing] = useState<boolean>(false);

  // Scroll listener to update active section highlighted state
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "contracts", "menu", "feed", "reserve"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle drink checkout ordering callback
  const handleOrderDrink = (price: number, synthIncrease: number) => {
    setBarTab(prev => prev + price);
    setSynthSpike(prev => {
      const nextSpike = prev + synthIncrease;
      if (nextSpike >= 85) {
        setShowOverloadAlert(true);
      }
      return Math.min(nextSpike, 100);
    });
  };

  // Handle contract earnings
  const handleEarnEddies = (amount: number) => {
    setBarTab(prev => Math.max(prev - amount, 0)); // contracts pay off your bar tab debts!
  };

  // Handle risk factor increases inside hacks
  const handleIncreaseSpikes = (amount: number) => {
    setSynthSpike(prev => {
      const nextSpike = prev + amount;
      if (nextSpike >= 85) {
        setShowOverloadAlert(true);
      }
      return Math.min(nextSpike, 100);
    });
  };

  // Reset drink tab
  const handleResetTab = () => {
    setBarTab(0);
    setSynthSpike(0);
    alert(">> SYSTEM RECORD_PURGED: DRINK TAB WIPED.");
  };

  // Flush neural spikes decompression action
  const handleFlushBiomonitor = () => {
    setDecompressing(true);
    
    // Play bio flush sound (Web Audio Synth)
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(330, audioCtx.currentTime); // diagnostic alert wave
      osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.8);
      
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.85);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.9);
    } catch (e) {
      // safe bypass
    }

    // Decompression visual timeout sequence
    setTimeout(() => {
      setSynthSpike(0);
      setDecompressing(false);
      setShowOverloadAlert(false);
      alert(">> BIOMONITOR CORTEX DISCHARGED. TOXICITY NOMINAL.");
    }, 2000);
  };

  const handleSecureBoothClick = () => {
    const el = document.getElementById("reserve");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-surface-base text-text-primary overflow-x-hidden scanlines crt-flicker">
      
      {/* HUD Bar Header */}
      <DashboardHeader 
        barTab={barTab} 
        synthSpike={synthSpike} 
        onResetTab={handleResetTab} 
        activeSection={activeSection}
      />

      {/* Hero Terminal Hub Section */}
      <HeroSection onSecureBoothClick={handleSecureBoothClick} />

      {/* Warn Red Scrolling Ticker banner layout */}
      <div className="w-full bg-[#FF003C] text-white py-1.5 overflow-hidden font-mono uppercase text-[10px] font-bold tracking-widest border-t border-b border-black z-30 relative select-none">
        <div className="animate-marquee whitespace-nowrap">
          SYSTEM SCAN ALERT: NO WEAPONS INSIDE THE AFTERLIFE // UNDERSTAND THE CONTRACT REQUIREMENTS BEFORE INITIATING THE IMPLANT BREAKER MAIN-STAGE // DRINK WITH UTMOST ATTENTION TO COGNITION LEVELS // SYSTEMS LEVEL UNLOCKED IN SECURE DEVELOPMENT MODE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
          SYSTEM SCAN ALERT: NO WEAPONS INSIDE THE AFTERLIFE // UNDERSTAND THE CONTRACT REQUIREMENTS BEFORE INITIATING THE IMPLANT BREAKER MAIN-STAGE // DRINK WITH UTMOST ATTENTION TO COGNITION LEVELS // SYSTEMS LEVEL UNLOCKED IN SECURE DEVELOPMENT MODE
        </div>
      </div>

      {/* Contracts Spec Desk */}
      <ContractsDeck 
        onEarnEddies={handleEarnEddies} 
        onIncreaseSpikes={handleIncreaseSpikes} 
      />

      {/* Interactive Drink Mixer & Table List */}
      <DrinkCatalog onOrderDrink={handleOrderDrink} />

      {/* Grayscale Netlog collage images */}
      <NetLogsFeed />

      {/* Deep Secure Booth Reservations */}
      <ReservationTerminal onReservationSubmitted={() => {}} />

      {/* Cyber Equalizer Bottom Bar Player */}
      <MusicVisualizer />

      {/* Audio player bottom safety margin spacer block */}
      <div className="h-16 bg-surface-dark"></div>

      {/* CRITICAL SYNTH TOXIC OVERCHARGE MODAL OVERLAY */}
      {showOverloadAlert && (
        <div className="fixed inset-0 bg-[#070509]/90 z-100 flex items-center justify-center p-4 backdrop-blur-md font-mono">
          <div className="max-w-md w-full bg-[#0c0812] border-2 border-acid-red p-6 pointer-events-auto shadow-[0_0_35px_rgba(255,0,60,0.4)] cyber-clip-md relative flex flex-col space-y-4">
            
            <button 
              onClick={() => setShowOverloadAlert(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-acid-red border-b border-acid-red/30 pb-3">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
              <span className="font-bebas text-xl uppercase tracking-wider">
                SYNTH-TOXIC OVERLAY WARNING
              </span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-text-primary/95">
              <p className="font-bold text-acid-red animate-pulse">
                [ALERT] SYNTHETIC SPIKE SATURATION EXCEEDS RED SAFETY LINE LIMITS: {synthSpike}%
              </p>
              <p>
                Neural feedback loops from high-octane beverages or hacking operations have triggered critical cortex thermal spikes. 
                Immediate cellular de-compression is highly recommended to protect your optics and secure cyber-mod networks.
              </p>
            </div>

            <div className="bg-black/40 border border-acid-red/30 p-2 text-center text-[10px] text-amber-gold">
              BIOMONITOR STATUS: CEREBRAL FLUSH INTEGRITY [LOCKED]
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleFlushBiomonitor}
                disabled={decompressing}
                className="w-full bg-[#FF003C] hover:bg-[#FF003C]/80 disabled:opacity-50 text-white font-bold py-3 text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${decompressing ? "animate-spin" : ""}`} />
                {decompressing ? "FLUSHING NEURAL FLUID BOARDS..." : "FLUSH NEURAL BIOMONITOR (-100% SPIKES)"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
