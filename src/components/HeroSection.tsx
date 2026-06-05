/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { MessageSquare, RefreshCw, Send, Sparkles, Volume2, ShieldAlert } from "lucide-react";

interface HeroSectionProps {
  onSecureBoothClick: () => void;
}

export default function HeroSection({ onSecureBoothClick }: HeroSectionProps) {
  const [selectedChar, setSelectedChar] = useState<"bartender" | "rogue" | "johnny">("bartender");
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; isAi: boolean }>>([
    {
      sender: "Claire / Bartender",
      text: "Welcome to the Afterlife, merc. Grab a glass, watch your back, and let's see if you can make history.",
      isAi: true
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText;
    setInputText("");
    setMessages(prev => [...prev, { sender: "YOU", text: userMsg, isAi: false }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMsg,
          character: selectedChar
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, {
          sender: data.author || "COMM_DECRYPTOR",
          text: data.text,
          isAi: true
        }]);
      } else {
        throw new Error("Comms line jammed.");
      }
    } catch (err) {
      // Direct high quality local simulation fallback
      setTimeout(() => {
        let reply = "Connection scrambled by local ICE defenses. Stand by.";
        if (selectedChar === "johnny") {
          reply = "The corps are jamming the frequencies again. Go stick an override module into their nearest relay.";
        } else if (selectedChar === "rogue") {
          reply = "I don't have time for bad frequencies. Fix your cyberware connection and chat when you have eddies.";
        }
        setMessages(prev => [...prev, { sender: "SYS_COMMS_FALLBACK", text: reply, isAi: true }]);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  const getCharacterAvatarColor = (char: string) => {
    if (char === "johnny") return "border-acid-red text-acid-red bg-acid-red/10";
    if (char === "rogue") return "border-cyber-purple text-cyber-purple-light bg-cyber-purple/10";
    return "border-cyber-cyan text-cyber-cyan bg-cyber-cyan/10";
  };

  return (
    <section id="hero" className="relative h-screen flex flex-col justify-center items-center overflow-hidden pt-16 font-mono">
      {/* Immersive Dark overlay grid & cyber background */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Afterlife Interior" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd16p2rdNDUu2rxjsJH3Hl8Pq0JkwdnyLXP2hs692F8TAZ0g63yVojzmwou8xmoPpV0DBUkZw1askaNxJkDGUBInL5VzD5gyL59U8FrrIFrwU7zhxdYtysJtpdGf7a5ngJKda-A58rpAuLrIdYVXaMbiuSXA0Y0cUKlywp1p-QVsGL4ZbzuLLtM24Rmo_Kr_Ypmco6PPn6hEKcpXx9HMy2gE95B2v9TeOXOgPVhz0yBKK8u6q2O7gKPEtTgeD2_yHSrp4QfgQfLuM" 
          className="w-full h-full object-cover opacity-50 gray-scale"
          referrerPolicy="no-referrer"
        />
        {/* Ambient Dark-to-light fading shadow anchors */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-base via-surface-base/70 to-surface-base/30"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,26,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(18,16,26,0.3)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        
        {/* Left Column: Big Atmospheric Title & Tagline */}
        <div className="lg:col-span-7 text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-acid-red/20 border border-acid-red text-white text-[10px] uppercase font-bold animate-pulse tracking-widest">
            <ShieldAlert className="w-4 h-4 text-acid-red" />
            <span>SYS_ALERT: SECURE PROTOCOL IN EFFECT // SECTOR 4 active</span>
          </div>

          <div className="relative">
            <h1 className="font-display-lg text-[#DFB7FF] text-6xl md:text-8xl lg:text-[100px] leading-none font-black tracking-tighter uppercase drop-shadow-[0_0_25px_rgba(155,0,255,0.6)]">
              AFTERLIFE
            </h1>
            <span className="absolute -top-10 right-4 lg:right-1/3 font-bebas text-cyber-cyan tracking-[0.2em] opacity-40 text-4xl italic">
              アフターライフ
            </span>
          </div>

          <p className="font-bebas text-cyber-cyan text-xl md:text-2xl tracking-[0.25em] leading-snug">
            DRINK WITH THE LEGENDS. JOIN THEM IF YOU DARE.
          </p>

          <p className="text-[13px] text-text-primary/80 font-mono leading-relaxed max-w-xl">
            In Night City, you aren't remembered by how you lived, but by how you went out. 
            Welcome to the home of Solos, Netrunners, and Fixers looking for a quiet booth, 
            a lethal contract, and a drink named after their final flight.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 items-start sm:items-center">
            <button
              onClick={onSecureBoothClick}
              className="cyber-button-clip bg-[#dfb7ff] text-surface-base px-8 py-3.5 font-bold uppercase hover:shadow-[0_0_15px_#dfb7ff] transition-all hover:scale-[1.02] flex items-center gap-2 text-xs"
              id="secure-booth-cta"
            >
              <Sparkles className="w-4 h-4 text-surface-base" />
              SECURE BOOTH TERMINAL
            </button>

            <div className="border-l-2 border-amber-gold/50 pl-4 space-y-0.5 text-[10px] text-amber-gold font-bold">
              <div>LOC: 34.772.001 // NIGHT CITY</div>
              <div>TEMP: 24°C // HUMID: 88%</div>
              <div>STATUS: SYSTEM LEVEL Giga_LEGEND</div>
            </div>
          </div>
        </div>

        {/* Right Column: Holographic Intercom / Decryptor Chat with local characters */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-surface-dark/95 border-2 border-cyber-purple/50 cyber-clip-md p-4 box-glow-purple h-[380px] lg:h-[420px] flex flex-col relative">
            
            {/* HUD Scan Line & Holo Signal Badge */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-cyber-purple/20 shadow-[0_2px_4px_#9b00ff]"></div>
            
            {/* Header: Chat Selection */}
            <div className="flex items-center justify-between pb-3 border-b border-cyber-purple/30 text-[10px]">
              <div className="flex items-center gap-1.5 text-cyber-purple-light font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple-light animate-ping"></span>
                <span>HOLOCOMMS_CHANNEL_v5.2</span>
              </div>
              <span className="text-text-muted">LINK_STRENGTH: DB9.1</span>
            </div>

            {/* Quick Character selector tabs */}
            <div className="grid grid-cols-3 gap-1 my-3 text-[9px] uppercase font-bold text-center">
              {[
                { id: "bartender", name: "Claire", sub: "BARMAN" },
                { id: "rogue", name: "Rogue", sub: "QUEEN" },
                { id: "johnny", name: "Johnny", sub: "SAMURAI" }
              ].map(char => (
                <button
                  key={char.id}
                  onClick={() => setSelectedChar(char.id as any)}
                  className={`py-1.5 border transition-all ${
                    selectedChar === char.id 
                      ? "border-cyber-cyan text-cyber-cyan bg-cyber-cyan/15 font-black" 
                      : "border-cyber-purple/20 text-text-muted hover:border-cyber-purple/50 hover:text-white"
                  }`}
                >
                  <div>{char.name}</div>
                  <div className="text-[7px] text-text-muted/60">{char.sub}</div>
                </button>
              ))}
            </div>

            {/* Simulated Stream Log Box */}
            <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-black/60 rounded-sm mb-3 text-[11px] scrollbar-thin">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col ${msg.isAi ? "items-start" : "items-end"}`}
                >
                  <span className={`text-[8px] font-bold mb-0.5 ${msg.isAi ? "text-cyber-cyan" : "text-cyber-purple-light"}`}>
                    {msg.sender.toUpperCase()}
                  </span>
                  <div className={`px-2.5 py-1.5 rounded-sm max-w-[90%] leading-relaxed ${
                    msg.isAi 
                      ? "bg-cyber-cyan/5 border border-cyber-cyan/20 text-cyan-50" 
                      : "bg-cyber-purple/10 border border-cyber-purple/20 text-purple-50"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-1.5 text-cyber-cyan animate-pulse text-[10px]">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>DECRYPTING COMP-DAT SYSTEM SECURE LINK...</span>
                </div>
              )}
            </div>

            {/* Text Input area */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder={`SEND ENCRYPTED CHAT PACKET...`}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                disabled={loading}
                className="flex-1 bg-surface-base border border-cyber-purple/40 text-cyber-cyan placeholder-text-muted/60 font-mono text-[11px] px-3 py-2 outline-none focus:border-cyber-cyan rounded-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-cyber-purple hover:bg-cyber-cyan hover:text-surface-base text-white px-3 transition-colors duration-300 rounded-none cursor-pointer flex items-center justify-center border border-cyber-purple"
                title="Send Packet"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Visual background rail label overlays */}
      <div className="absolute top-1/4 left-6 text-text-muted/20 tracking-[0.3em] uppercase text-[9px] vertical-text font-mono hidden xl:block" style={{ writingMode: "vertical-rl" }}>
        LOG_RE_45 // CORRECTION_PROTOCOL_OFFLINE
      </div>
      <div className="absolute bottom-12 right-12 text-text-muted/30 uppercase text-[9px] font-mono hidden xl:block tracking-widest">
        SECURITY STATUS: OMEGA // ICE ENGAGED: YES
      </div>
    </section>
  );
}
