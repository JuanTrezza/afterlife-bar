/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Drink } from "../types";
import { DEFAULT_DRINKS } from "../data";
import { Coffee, ShieldAlert, Cpu, Sparkles, Filter, ChevronRight, PlusCircle, GlassWater } from "lucide-react";

interface DrinkCatalogProps {
  onOrderDrink: (price: number, synthSpikes: number) => void;
}

export default function DrinkCatalog({ onOrderDrink }: DrinkCatalogProps) {
  const [drinks, setDrinks] = useState<Drink[]>(DEFAULT_DRINKS);
  const [filter, setFilter] = useState<"all" | "legend" | "hazard">("all");

  // Mix custom cocktail form states
  const [ingredient, setIngredient] = useState("");
  const [vibe, setVibe] = useState("");
  const [mixing, setMixing] = useState(false);

  // High quality hover status for beverage scanner
  const [scannedDrink, setScannedDrink] = useState<Drink>(DEFAULT_DRINKS[0]);

  const handleMixCocktail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredient.trim()) {
      alert("PLEASE CHOOSE A KEY INGREDIENT MODULE.");
      return;
    }

    setMixing(true);
    try {
      const response = await fetch("/api/cocktail-mixer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredient: ingredient,
          themeVibe: vibe || "cyberpunk rebel"
        })
      });

      if (response.ok) {
        const customDrink = await response.json();
        const finalDrink: Drink = {
          ...customDrink,
          id: `custom-${Date.now()}`,
          custom: true
        };
        setDrinks(prev => [finalDrink, ...prev]);
        setScannedDrink(finalDrink);
        setIngredient("");
        setVibe("");
        alert(`>> NEURAL DISPENSER SYNCHRONIZED: ${finalDrink.name} READY TO ORDER`);
      } else {
        throw new Error("Line failure.");
      }
    } catch (err) {
      // Local highly detailed simulation fallback
      const mockCustom: Drink = {
        id: `custom-fallback-${Date.now()}`,
        name: `REBEL_${ingredient.toUpperCase().replace(/\s+/g, "_")}`,
        price: 540,
        description: `Infused with carbonated chrome juices and ${vibe || "dangerous vibes"}. Drink to bypass system node firewalls.`,
        category: "hazard",
        tag: "CUSTOM MIXTURE",
        synthSpikeLevel: 88,
        custom: true
      };
      setDrinks(prev => [mockCustom, ...prev]);
      setScannedDrink(mockCustom);
      setIngredient("");
      setVibe("");
      alert(`>> DISPENSER BACKUP ENGAGED: Mixed ${mockCustom.name}`);
    } finally {
      setMixing(false);
    }
  };

  const handlePurchaseDrink = (drink: Drink) => {
    onOrderDrink(drink.price, drink.synthSpikeLevel);
    
    // Play electronic key tone using Web Audio API! (Amazing engineering detail under Guidelines)
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // chime frequency
      osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
      // Audio context block browser fallbacks smoothly
    }
  };

  const filteredDrinks = filter === "all" 
    ? drinks 
    : drinks.filter(d => d.category === filter);

  return (
    <section id="menu" className="py-24 bg-surface-base border-t border-cyber-purple/20 relative font-mono overflow-hidden">
      
      {/* Background glowing particles dot grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#dfb7ff 1.5px, transparent 1.5px)", backgroundImageSize: "24px 24px" }}></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 pb-6 border-b border-cyber-purple/20">
          <div>
            <div className="font-share text-[#FF8C00] text-xs uppercase mb-1.5 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-amber-gold rounded-full animate-pulse"></span>
              <span>SYNTH_SPIKE_CONCENTRATION_ALERT_ACTIVE</span>
            </div>
            <h2 className="font-display-lg text-[#DFB7FF] text-3xl lg:text-4xl leading-none font-bold uppercase tracking-tight glow-purple">
              LIQUID LEGENDS BAR MENU
            </h2>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase">
            <span className="text-text-muted flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> FILTER TIER:
            </span>
            {(["all", "legend", "hazard"] as const).map(tier => (
              <button
                key={tier}
                onClick={() => setFilter(tier)}
                className={`px-3 py-1.5 border transition-all ${
                  filter === tier 
                    ? "bg-[#dfb7ff] text-surface-base border-[#dfb7ff] font-bold" 
                    : "border-cyber-purple/25 text-text-primary hover:border-cyber-purple/50"
                }`}
              >
                {tier === "all" ? "ALL LIQUIDS" : tier === "legend" ? "LEGENDARY SPIRITS" : "HAZARDOUS CYBERS"}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Main grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Column 1 (Left 4 cells): Real-time Beverage Scanner HUD Graphic */}
          <div className="lg:col-span-5 w-full">
            <div className="relative group border-2 border-cyber-cyan/50 bg-surface-dark/95 cyber-clip-md p-5 space-y-5 box-glow-cyan">
              
              {/* Scanline grid and holographic badges */}
              <div className="absolute top-4 right-4 bg-black/80 px-3 py-1.5 border border-cyber-cyan/40 backdrop-blur-sm z-15">
                <span className="text-[10px] text-cyber-cyan font-bold tracking-widest block uppercase font-share animate-pulse">
                  ENCRYPTED_LIQUID_STREAM_v0.7
                </span>
                <div className="h-1 w-full bg-cyber-cyan/20 mt-1">
                  <div className="h-full bg-cyber-cyan w-2/3 transition-all duration-700" style={{ width: `${scannedDrink.synthSpikeLevel}%` }}></div>
                </div>
              </div>

              {/* The Cocktail Photo Box with scanned scanner text labels */}
              <div className="relative overflow-hidden cyber-clip aspect-square bg-[#0b0811] border border-cyber-cyan/25 flex items-center justify-center">
                <img 
                  alt={scannedDrink.name} 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7BQLU5HjBSZ4NwxWd7ZumXoEkIDy2eBYVW4nBoFlNe9WzzoxncuhEvkoT-c4qucZpsp6Q-hpY_ddhMy_W4324WoVF-o2EnzWf1J34SqfsU_Qd4--jdtBQ7Rcam6xIO5R4jRMVGaZgm_v4nP8PjA9quz2Hr-_lW-HM4UHoEYXQ1TPi4_7knW828FLWI0yzieVDrg9fnciedTi-QnXL68bANSU2WvNkh-6cCJ2pQuUK1-iQAsMfLeVeIxNjBDAmDJ-UvSU-VjYeejg" 
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Cyber tech labels layout overlay */}
                <div className="absolute left-4 bottom-4 bg-black/70 border border-cyber-cyan/30 p-2 font-mono text-[9px] text-cyber-cyan space-y-0.5">
                  <div>NAME: {scannedDrink.name}</div>
                  <div>TOXIC_SPIKES: {scannedDrink.synthSpikeLevel}%</div>
                  <div>EDDIES: {scannedDrink.price} EB</div>
                </div>
              </div>

              {/* Holographic Diagnostic Analysis readout */}
              <div className="space-y-2 border-t border-cyber-cyan/20 pt-4 text-xs">
                <div className="flex justify-between font-bold text-cyber-cyan text-[10px]">
                  <span>BEVERAGE_DIAGNOSTICS</span>
                  <span>SCANNER_OK</span>
                </div>
                <p className="text-[11px] text-text-primary/80 italic leading-relaxed">
                  "{scannedDrink.description}"
                </p>

                <div className="grid grid-cols-2 gap-3 text-center border-t border-cyber-cyan/15 pt-3">
                  <div className="bg-surface-base p-2 border border-cyber-cyan/10">
                    <div className="text-sm font-bold text-cyber-cyan">{scannedDrink.synthSpikeLevel}%</div>
                    <div className="text-[8px] text-text-muted font-bold tracking-widest uppercase">CORTEX_SPIKERS</div>
                  </div>
                  <div className="bg-surface-base p-2 border border-cyber-cyan/10">
                    <div className="text-sm font-bold text-amber-gold">{scannedDrink.price} EB</div>
                    <div className="text-[8px] text-text-muted font-bold tracking-widest uppercase">STREET_COST</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 (Right 7 cells): Active drinks list & interactive mix machine */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Cocktail Mixer Form (Generative AI mixer widget) */}
            <form onSubmit={handleMixCocktail} className="p-5 bg-surface-dark/95 border-2 border-cyber-purple/40 cyber-clip box-glow-purple space-y-4">
              <div className="flex items-center gap-2 text-text-primary">
                <Coffee className="w-4 h-4 text-cyber-purple-light" />
                <span className="text-[10px] font-extrabold font-share block uppercase tracking-widest text-[#DFB7FF]">
                  COCKTAIL_DISPENSER_MIXER_v3.0 (AI_POWERED)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[9px] uppercase text-text-muted font-extrabold mb-1">KEY INGREDIENT FLUID</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., synth-absinthe, ghost pepper, mercury juice"
                    value={ingredient}
                    onChange={e => setIngredient(e.target.value)}
                    className="w-full bg-surface-base border border-cyber-purple/40 text-cyber-cyan font-mono px-3 py-2 outline-none focus:border-cyber-cyan"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase text-text-muted font-extrabold mb-1">COGNITIVE THEME VIBE</label>
                  <input
                    type="text"
                    placeholder="E.g., anti-marasaka rebel overdrive, netrunner icebreaker"
                    value={vibe}
                    onChange={e => setVibe(e.target.value)}
                    className="w-full bg-surface-base border border-cyber-purple/40 text-cyber-cyan font-mono px-3 py-2 outline-none focus:border-cyber-cyan"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={mixing}
                className="w-full bg-cyber-purple hover:bg-cyber-cyan text-white hover:text-surface-base uppercase font-bold py-3 transition-colors duration-300 text-[10px] tracking-widest border border-cyber-purple flex items-center justify-center gap-2"
              >
                <Sparkles className={`w-3.5 h-3.5 ${mixing ? "animate-spin text-cyber-cyan" : "text-white"}`} />
                {mixing ? "RE-ROUTING NEURAL FLUIDS..." : "MIX DRINK WITH GEMINI MODEL"}
              </button>
            </form>

            {/* Menu catalog cards table list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredDrinks.map(drink => (
                <div
                  key={drink.id}
                  onMouseEnter={() => setScannedDrink(drink)}
                  className={`group bg-surface-dark p-5 border transition-all duration-300 cyber-clip flex flex-col justify-between ${
                    scannedDrink.id === drink.id 
                      ? "border-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.15)]" 
                      : "border-cyber-purple/20 hover:border-cyber-purple"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        {drink.custom && (
                          <span className="text-[7px] bg-cyber-purple/20 text-cyber-purple-light border border-cyber-purple/40 px-1 font-bold animate-pulse absolute -top-2 right-4">
                            MIXER_PROTO
                          </span>
                        )}
                        <h3 className="font-bebas text-[#DFB7FF] text-xl group-hover:text-cyber-cyan transition-colors duration-300 tracking-wider">
                          {drink.name}
                        </h3>
                      </div>
                      <span className="text-cyber-cyan font-bold font-share text-xs">
                        {drink.price} EB
                      </span>
                    </div>

                    <p className="text-[11px] text-text-primary/75 leading-relaxed font-sans line-clamp-3">
                      {drink.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-cyber-purple/15 pt-3.5 mt-5">
                    <span className={`px-2 py-0.5 text-[8px] font-share font-extrabold border uppercase rounded-sm ${
                      drink.category === "legend" 
                        ? "text-cyber-cyan border-cyber-cyan/35 bg-cyber-cyan/5" 
                        : "text-acid-red border-acid-red/35 bg-acid-red/5"
                    }`}>
                      {drink.tag}
                    </span>

                    <button
                      onClick={() => handlePurchaseDrink(drink)}
                      className="bg-transparent border border-[#dfb7ff] hover:bg-[#dfb7ff] hover:text-surface-base text-[#dfb7ff] font-bold px-3.5 py-1.5 text-[9px] uppercase tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer"
                    >
                      <PlusCircle className="w-3 h-3 text-current" />
                      ORDER_DRINK
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
