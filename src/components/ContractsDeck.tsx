/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Contract } from "../types";
import { DEFAULT_CONTRACTS } from "../data";
import { Shield, Hammer, Flame, Terminal, Play, CheckCircle, AlertTriangle, Cpu, DollarSign } from "lucide-react";

interface ContractsDeckProps {
  onEarnEddies: (amount: number) => void;
  onIncreaseSpikes: (amount: number) => void;
}

export default function ContractsDeck({ onEarnEddies, onIncreaseSpikes }: ContractsDeckProps) {
  const [contracts, setContracts] = useState<Contract[]>(DEFAULT_CONTRACTS);
  const [targetCorp, setTargetCorp] = useState<string>("all");
  const [chosenCorp, setChosenCorp] = useState("Arasaka");
  const [difficulty, setDifficulty] = useState("Medium");
  const [generating, setGenerating] = useState(false);

  // Active executing contract monitoring
  const [executingContract, setExecutingContract] = useState<Contract | null>(null);
  const [executingStep, setExecutingStep] = useState(0);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [executingStatus, setExecutingStatus] = useState<"idle" | "running" | "success" | "failed">("idle");

  const filterCorps = ["all", "Arasaka", "Militech", "Kang Tao", "Trauma Team"];

  const handleCreateAIContract = async () => {
    setGenerating(true);
    try {
      const response = await fetch("/api/contract-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ corporation: chosenCorp, difficulty })
      });

      if (response.ok) {
        const newContract = await response.json();
        setContracts(prev => [newContract, ...prev]);
        alert(`>> ENCRYPTED SIGNAL DECRYPTED: ${newContract.title} ADDED TO ACTIVE FEED`);
      } else {
        throw new Error("Jammed frequencies.");
      }
    } catch (err) {
      // Local high performance fallback generator
      const defaultRewards: any = { Low: 5000, Medium: 9500, High: 16000, Psycho: 28000 };
      const fallback = {
        id: `fallback-${Date.now()}`,
        title: `CRITICAL SABOTAGE IN ${chosenCorp.toUpperCase()}`,
        corporation: chosenCorp as any,
        reward: defaultRewards[difficulty] || 10000,
        difficulty: difficulty as any,
        description: `Corrupt local ICE subnets under ${chosenCorp} development core. Retrieve confidential blueprints before terminal meltdown.`,
        status: "available" as const,
        tasks: [
          "Bypass neural firewalls", 
          "Copy database schema partition key", 
          "Vent cooling gas to escape"
        ],
        riskFactor: difficulty === "Low" ? 22 : difficulty === "Medium" ? 48 : difficulty === "High" ? 75 : 95
      };
      setContracts(prev => [fallback, ...prev]);
      alert(`>> LOCAL BACKUP COMPILED: ${fallback.title} INJECTED SUCCESSFULLY`);
    } finally {
      setGenerating(false);
    }
  };

  const handleAcceptAndExecute = (contract: Contract) => {
    setExecutingContract(contract);
    setExecutingStep(0);
    setExecutingStatus("running");
    
    const logs = [
      `>> INJECTING CYBERDECK INTO ${contract.corporation.toUpperCase()} SUBNET...`,
      `>> EXECUTING FIREWALL ICE-BREAKER... RISK TO OVERLOAD: ${contract.riskFactor}%`,
    ];
    setExecutionLogs(logs);

    // Dynamic timer sequence simulating custom terminal hack phases!
    const runStep = (step: number) => {
      setTimeout(() => {
        if (step >= contract.tasks.length) {
          // Success rate depends on risk vs luck
          const chance = Math.random() * 100;
          const isSuccess = chance > (contract.riskFactor * 0.25); // high risk lowers success slightly

          if (isSuccess) {
            setExecutingStatus("success");
            setExecutionLogs(prev => [
              ...prev,
              `>> PAYLOAD EXTRUSION COMPLETED. UPLOADING...`,
              `>> ENCRYPTED PAYMENT TRANSFERRED: +${contract.reward.toLocaleString()} EB`,
              `>> CONNECTION RESET. CLEAN LOG COPIES REMAIN.`
            ]);
            onEarnEddies(contract.reward);
            // Spikes increase with risk
            onIncreaseSpikes(Math.round(contract.riskFactor * 0.3));
            setContracts(prev => prev.map(c => c.id === contract.id ? { ...c, status: "completed" } : c));
          } else {
            setExecutingStatus("failed");
            setExecutionLogs(prev => [
              ...prev,
              `>> FIREWALL ISOLATION COLLAPSED! CORP SECURITY DETECTED CORES.`,
              `>> TARGET DEFENSE SYSTEM OVERLOADED YOUR NERVOUS SPECS! EXTRACTION FAILURE`,
              `>> EMERGENCY CORRECTION RESET ENGAGED.`
            ]);
            onIncreaseSpikes(Math.round(contract.riskFactor * 0.6)); // massive synth overload
            setContracts(prev => prev.map(c => c.id === contract.id ? { ...c, status: "failed" } : c));
          }
          return;
        }

        const task = contract.tasks[step];
        setExecutingStep(step + 1);
        setExecutionLogs(prev => [
          ...prev,
          `&gt; EXECUTION PHASE ${step + 1}: ${task.toUpperCase()} ... APPROVED.`
        ]);
        runStep(step + 1);
      }, 1800);
    };

    runStep(0);
  };

  const filteredContracts = targetCorp === "all" 
    ? contracts 
    : contracts.filter(c => c.corporation.toLowerCase() === targetCorp.toLowerCase());

  return (
    <section id="contracts" className="py-24 bg-surface-base border-t border-cyber-purple/20 font-mono relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Title Grid */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6 pb-6 border-b border-cyber-purple/20">
          <div>
            <div className="font-share text-cyan-glow text-xs uppercase mb-1 flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan"></span>
              <span>LIVE_SECURE_CONTRACTS_SYSTEM_ONLINE</span>
            </div>
            <h2 className="font-display-lg text-[#DFB7FF] text-3xl lg:text-4xl leading-none font-bold tracking-tight uppercase glow-purple">
              MERCENARY WORKBOARD
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 text-[10px] uppercase font-bold">
            {filterCorps.map(corp => (
              <button
                key={corp}
                onClick={() => setTargetCorp(corp)}
                className={`px-3 py-1.5 border transition-all ${
                  targetCorp === corp 
                    ? "bg-[#dfb7ff] text-surface-base border-[#dfb7ff] font-bold" 
                    : "border-cyber-purple/30 text-text-primary hover:border-cyber-purple hover:bg-cyber-purple/10"
                }`}
              >
                {corp === "all" ? "ALL CORPORATIONS" : corp.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Content columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: About Section ("BEYOND THE VEIL") & AI Contract Generator */}
          <div className="lg:col-span-4 space-y-10">
            {/* Embedded About Block with custom image */}
            <div className="relative group">
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-cyber-cyan"></div>
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-cyber-cyan"></div>
              
              <div className="relative overflow-hidden bg-surface-dark border border-cyber-purple/30 cyber-clip">
                <img 
                  alt="Afterlife Contract Negotiation" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-JWVBEsjmUZJHRS0pdAmAMmW8q9W7YooWcyKpeHi8ZqweO5CXt0-J4mqcwUWu8e65b90H2sjXyrmKocrelx2u8KnK556tXgzYfA3pppsc8c59631Ie0pvJAnJaGby6w8PfgehX55Hl6cgc_KSsrpOh1FGZ5PgJxWfoFvnxzUzsBnWaIa_CQ2c-l-IpNaUoM39YRAYlnd7J8dKqXUgKm8DeMxa1-K5RFViSXl6YP2Z71f3FB_iUCEBIdPSxhQVl6pnA8TF1LY4NFE" 
                  className="w-full grayscale hover:grayscale-0 transition-all duration-700 h-48 object-cover"
                  referrerPolicy="no-referrer"
                />
                
                <div className="p-4 space-y-3">
                  <span className="text-[10px] text-cyber-cyan font-bold block uppercase font-share">
                    // HISTORIC_RECORDS: BEYOND THE VEIL
                  </span>
                  <p className="text-[11px] text-text-primary/70 leading-relaxed font-sans">
                    Afterlife was built inside an old military mortuary. The graves have vanished, but the grim atmosphere remains. 
                    It is the legendary hub where the highest-profile corporate operations are bought and sold silently over synth-spirits.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-center border-t border-cyber-purple/20 pt-3">
                    <div>
                      <div className="text-[#DFB7FF] font-bold text-base font-display-lg">99.1%</div>
                      <div className="text-[8px] text-text-muted font-bold tracking-widest uppercase">SUCCESS RATIO</div>
                    </div>
                    <div>
                      <div className="text-cyber-cyan font-bold text-base font-display-lg text-cyan-glow">0.05ms</div>
                      <div className="text-[8px] text-text-muted font-bold tracking-widest uppercase">NODE_LATENCY</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Custom Contract Negotiator (Generative) */}
            <div className="bg-surface-dark border-2 border-cyber-purple/40 p-5 font-mono cyber-clip box-glow-purple">
              <span className="text-[10px] text-cyber-cyan font-extrabold font-share block uppercase mb-4 animate-pulse">
                // GENERATE_CUSTOM_MERCENARY_CONTRACT
              </span>
              
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-text-muted text-[10px] font-bold mb-1.5 uppercase">TARGET CORPORATE BODY</label>
                  <select 
                    value={chosenCorp}
                    onChange={e => setChosenCorp(e.target.value)}
                    className="w-full bg-surface-base border border-cyber-purple/40 text-cyber-cyan font-mono px-2 py-1.5 outline-none rounded-none focus:border-cyber-cyan"
                  >
                    <option value="Arasaka">ARASAKA CORP</option>
                    <option value="Militech">MILITECH INTL</option>
                    <option value="Kang Tao">KANG TAO SHIELDS</option>
                    <option value="Trauma Team">TRAUMA TEAM INC</option>
                    <option value="Night Corp">NIGHT CORP PUBLIC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-text-muted text-[10px] font-bold mb-1.5 uppercase">INTELLIGENCE RISK LEVEL</label>
                  <div className="grid grid-cols-4 gap-1 text-[9px] font-extrabold uppercase text-center cursor-pointer">
                    {["Low", "Medium", "High", "Psycho"].map(lvl => (
                      <button
                        key={lvl}
                        onClick={() => setDifficulty(lvl)}
                        className={`py-1.5 border ${
                          difficulty === lvl 
                            ? "bg-cyber-cyan border-cyber-cyan text-surface-base" 
                            : "border-cyber-purple/30 text-text-primary hover:border-cyber-purple"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={generating}
                  onClick={handleCreateAIContract}
                  className="w-full bg-cyber-purple hover:bg-[#dfb7ff] text-white hover:text-surface-base py-3.5 font-bold uppercase transition-all duration-300 text-[10px] tracking-widest border border-cyber-purple flex items-center justify-center gap-2"
                >
                  <Cpu className={`w-3.5 h-3.5 ${generating ? "animate-spin text-cyber-cyan" : "text-white"}`} />
                  {generating ? "DECRYPTING SUBNET..." : "REQUEST TARGET CONTRACT"}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Contracts List View Display */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Live Hack Executing Console Panel overlay */}
            {executingStatus !== "idle" && executingContract && (
              <div className="p-5 bg-black border-2 border-cyber-cyan cyber-clip-md animate-pulse space-y-4 box-glow-cyan">
                <div className="flex items-center justify-between border-b border-cyber-cyan/30 pb-3 text-xs font-bold text-cyber-cyan">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-ping"></span>
                    <span>ACTIVE_DECK_HACK: {executingContract.title}</span>
                  </div>
                  <span>DANGER: HIGH TERMINAL SHIELDING</span>
                </div>

                {/* Animated progress stages */}
                <div className="space-y-1.5 font-mono text-[10px] leading-relaxed max-h-40 overflow-y-auto bg-surface-dark/90 p-3 scrollbar-thin border border-cyber-cyan/15 rounded-sm">
                  {executionLogs.map((log, lIdx) => (
                    <div key={lIdx} className={log.includes("EB") || log.includes("TRANSFERRED") ? "text-amber-gold font-bold" : log.includes("FAILURE") ? "text-acid-red font-bold" : "text-cyan-50"}>
                      {log}
                    </div>
                  ))}
                </div>

                {executingStatus === "running" ? (
                  <div className="flex items-center justify-center gap-3 py-2 text-cyber-cyan text-[11px] font-bold">
                    <span className="animate-spin rounded-full h-4.5 w-4.5 border-2 border-cyber-cyan border-t-transparent"></span>
                    <span>OVERRIDING LOCAL DOM NODES... SECONDS TO EXTRACTION...</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setExecutingStatus("idle");
                      setExecutingContract(null);
                    }}
                    className="w-full bg-cyber-cyan/15 hover:bg-cyber-cyan/35 border border-cyber-cyan text-cyber-cyan text-[11px] py-1.5 font-bold uppercase transition-all duration-300"
                  >
                    DISCONNECT CYBERDECK LINK
                  </button>
                )}
              </div>
            )}

            {/* List grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredContracts.map(contract => (
                <div
                  key={contract.id}
                  className={`group bg-surface-dark p-5 border transition-all duration-500 hover:scale-[1.01] flex flex-col justify-between cyber-clip ${
                    contract.status === "completed" 
                      ? "border-emerald-500/30 hover:border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.15)]" 
                      : contract.status === "failed" 
                      ? "border-acid-red/30 hover:border-acid-red/70 shadow-[0_0_10px_rgba(255,0,60,0.15)]" 
                      : "border-cyber-purple/20 hover:border-cyber-purple"
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[9px] font-bold text-text-muted tracking-widest block uppercase font-share">
                          // CORPORATION: {contract.corporation.toUpperCase()}
                        </span>
                        <h3 className="font-bebas text-[#DFB7FF] text-xl group-hover:text-cyber-cyan transition-colors duration-300 tracking-wider">
                          {contract.title}
                        </h3>
                      </div>
                      <span className="font-share text-[#DFB7FF] text-xs font-bold whitespace-nowrap bg-cyber-purple/10 border border-cyber-purple/30 px-2 py-0.5">
                        {contract.reward.toLocaleString()} EB
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[11px] text-text-primary/70 leading-relaxed font-sans line-clamp-3">
                      {contract.description}
                    </p>

                    {/* Progress Checklist */}
                    <div className="border-t border-cyber-purple/15 pt-3.5 space-y-1.5">
                      <div className="text-[8px] text-text-muted font-bold tracking-widest uppercase">
                        SUB_TASKS INTEGRATED_SCHEME
                      </div>
                      <div className="space-y-1">
                        {contract.tasks.map((task, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[9px] text-text-primary/80">
                            <span className="w-1.5 h-1.5 bg-cyber-cyan/60 rounded-full"></span>
                            <span className="truncate">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions footer summary */}
                  <div className="flex justify-between items-center gap-4 mt-5 border-t border-cyber-purple/15 pt-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 text-[8px] font-bold uppercase rounded-sm border ${
                        contract.difficulty === "Low" 
                          ? "text-emerald-400 border-emerald-400 bg-emerald-400/5" 
                          : contract.difficulty === "Medium" 
                          ? "text-cyber-cyan border-cyber-cyan bg-cyber-cyan/5" 
                          : contract.difficulty === "High" 
                          ? "text-amber-gold border-amber-gold bg-amber-gold/5" 
                          : "text-acid-red border-acid-red bg-acid-red/5 animate-pulse"
                      }`}>
                        RISK_{contract.difficulty}
                      </span>
                      <span className="text-[9px] text-text-muted font-mono">{contract.riskFactor}% FATAL_CHANCE</span>
                    </div>

                    {contract.status === "completed" ? (
                      <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
                        <CheckCircle className="w-4.5 h-4.5" />
                        <span>PAYLOAD_TRANSFERRED</span>
                      </div>
                    ) : contract.status === "failed" ? (
                      <div className="flex items-center gap-1 text-acid-red text-[10px] font-bold">
                        <AlertTriangle className="w-4.5 h-4.5" />
                        <span>TACTICAL_MELTDOWN</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAcceptAndExecute(contract)}
                        disabled={executingStatus === "running"}
                        className="bg-transparent border border-[#dfb7ff] hover:bg-[#dfb7ff] hover:text-surface-base text-[#dfb7ff] font-bold px-3.5 py-1.5 text-[9px] uppercase tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        INIT_DEEP_HACK
                      </button>
                    )}
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
