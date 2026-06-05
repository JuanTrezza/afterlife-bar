/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Terminal, Shield, Cpu, RefreshCw } from "lucide-react";

interface HeaderProps {
  barTab: number;
  synthSpike: number;
  onResetTab: () => void;
  activeSection: string;
}

export default function DashboardHeader({ barTab, synthSpike, onResetTab, activeSection }: HeaderProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("GUEST_OPERATIVE");

  const handleLogin = () => {
    if (!loggedIn) {
      const alias = prompt("ENTER NETRUNNER SECURE ALIAS:", "V_Specter");
      if (alias) {
        setUserName(alias.toUpperCase().substring(0, 15));
        setLoggedIn(true);
      }
    } else {
      setLoggedIn(false);
      setUserName("GUEST_OPERATIVE");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-surface-base/80 backdrop-blur-md border-b border-cyber-purple/30 shadow-[0_0_15px_rgba(155,0,255,0.25)] font-mono">
      <div className="flex justify-between items-center w-full px-4 lg:px-8 py-3 max-w-[1920px] mx-auto text-xs">
        {/* Brand Logo with glitchy hover effect */}
        <a 
          href="#hero" 
          className="group relative flex items-center gap-2 text-cyber-purple-light font-display-lg text-lg lg:text-xl tracking-widest font-black uppercase italic select-none"
          id="nav-logo"
        >
          <span className="text-cyber-cyan font-bold">&gt;&gt;</span>
          <span className="relative z-10 hover:text-white transition-colors duration-300">
            AFTERLIFE
          </span>
          <span className="absolute -inset-0.5 bg-cyber-purple/25 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></span>
        </a>

        {/* Live HUD System Status */}
        <div className="hidden xl:flex items-center gap-4 text-[10px] text-text-muted border-l border-r border-text-muted/20 px-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"></span>
            <span>SECURENODE_v4.9: ONLINE</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyber-purple-light">
            <Shield className="w-3.5 h-3.5 text-cyber-purple-light" />
            <span>ICE_INTEGRITY: 100%</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-gold">
            <Cpu className="w-3.5 h-3.5 text-amber-gold" />
            <span>CORTEX_SYNC: NOMINAL</span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex gap-6 items-center text-[11px] uppercase tracking-wider font-semibold">
          {[
            { id: "hero", label: "HUB" },
            { id: "contracts", label: "CONTRACTS" },
            { id: "menu", label: "BAR MENU" },
            { id: "feed", label: "NET FEED" },
            { id: "reserve", label: "RESERVE" }
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`transition-all duration-300 hover:text-cyber-cyan relative py-1 ${
                activeSection === item.id 
                  ? "text-cyber-cyan border-b-2 border-cyber-cyan" 
                  : "text-on-surface-variant hover:scale-105"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right side interactions: Tab, Spikes, Login */}
        <div className="flex items-center gap-4">
          {/* Cybernetic Tab Wallet */}
          <div className="hidden sm:flex flex-col items-end px-3 py-1 bg-surface-dark border border-cyber-purple/40 text-right">
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-text-muted font-bold uppercase tracking-widest">DRINK_TAB</span>
              {barTab > 0 && (
                <button 
                  onClick={onResetTab} 
                  title="Wipe bar tab history"
                  className="p-0.5 text-acid-red hover:text-white hover:bg-acid-red/20 transition-all rounded"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              )}
            </div>
            <span className="text-amber-gold font-bold">{barTab.toLocaleString()} <span className="text-[10px] text-amber-gold/80">EB</span></span>
          </div>

          {/* Synth Spike Hazard level */}
          <div className="hidden lg:flex flex-col items-center bg-surface-dark border border-cyber-purple/40 px-3 py-1 w-28">
            <div className="flex justify-between w-full text-[9px] mb-1 text-text-muted">
              <span>SYNTH_SPIKES</span>
              <span className={synthSpike > 80 ? "text-acid-red font-bold animate-pulse" : "text-cyber-cyan"}>{synthSpike}%</span>
            </div>
            <div className="w-full bg-surface-medium h-1.5 rounded-none overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  synthSpike > 80 
                    ? "bg-acid-red animate-pulse" 
                    : synthSpike > 50 
                    ? "bg-amber-gold" 
                    : "bg-cyber-cyan"
                }`}
                style={{ width: `${Math.min(synthSpike, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Action Login button */}
          <button 
            id="net-login-btn"
            onClick={handleLogin}
            className={`cyber-button-clip px-4 py-1.5 font-bold uppercase transition-all duration-300 text-[10px] ${
              loggedIn 
                ? "bg-acid-red text-white hover:bg-neutral-800" 
                : "bg-cyber-cyan text-surface-base hover:bg-cyber-cyan/80 shadow-[0_0_8px_#00F0FF]"
            }`}
          >
            {loggedIn ? userName : "NET_LOGIN"}
          </button>
        </div>
      </div>
    </nav>
  );
}
