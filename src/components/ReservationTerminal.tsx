/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BoothReservation } from "../types";
import { Calendar, ShieldAlert, Cpu, CheckSquare, Layers, Lock, Sparkles, Terminal } from "lucide-react";

interface ReservationTerminalProps {
  onReservationSubmitted: () => void;
}

export default function ReservationTerminal({ onReservationSubmitted }: ReservationTerminalProps) {
  const [name, setName] = useState("");
  const [size, setSize] = useState(2);
  const [time, setTime] = useState("MIDNIGHT PROTOCOL (22:00 - 01:00)");
  const [specs, setSpecs] = useState<string[]>([]);
  const [bookingState, setBookingState] = useState<"idle" | "submitting" | "confirmed">("idle");
  const [assignedBooth, setAssignedBooth] = useState<number | null>(null);

  // Active reservation registry mock list starting off
  const [registry, setRegistry] = useState<BoothReservation[]>([
    {
      id: "res-01",
      operativeName: "MR. HANDS",
      partySize: 4,
      timeWindow: "VIP AFTERMATH (01:00 - 04:00)",
      specialRequirements: "Soundproof sonic box, Trauma locator, weapons locker",
      timestamp: "21:44:02",
      status: "approved",
      boothId: 7
    },
    {
      id: "res-02",
      operativeName: "DINO DINOVIC",
      partySize: 1,
      timeWindow: "MIDNIGHT PROTOCOL (22:00 - 01:00)",
      specialRequirements: "ICE coverage, secure subnet connection",
      timestamp: "22:15:55",
      status: "approved",
      boothId: 12
    }
  ]);

  const toggleSpec = (spec: string) => {
    setSpecs(prev => 
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    );
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("PLEASE SUBMIT A REPUTABLE OPERATIVE ALIAS");
      return;
    }

    setBookingState("submitting");

    // Network synchronization visualizer timers
    setTimeout(() => {
      const boothNum = Math.floor(Math.random() * 20) + 1;
      const newReservation: BoothReservation = {
        id: `res-user-${Date.now()}`,
        operativeName: name.toUpperCase(),
        partySize: size,
        timeWindow: time,
        specialRequirements: specs.join(", ") || "No extra security hardware requested.",
        timestamp: new Date().toLocaleTimeString(),
        status: "approved",
        boothId: boothNum
      };

      setAssignedBooth(boothNum);
      setRegistry(prev => [newReservation, ...prev]);
      setBookingState("confirmed");
      onReservationSubmitted(); // signal parents
    }, 2200);
  };

  return (
    <section id="reserve" className="py-24 bg-surface-base border-t border-cyber-purple/20 font-mono relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Title Grid */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-6 border-b border-cyber-purple/20">
          <div>
            <div className="font-share text-cyber-purple-light text-xs uppercase mb-1.5 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-cyber-purple-light rounded-full animate-ping"></span>
              <span>BOOTH_RESERVATION_v4.2: SECURE SYSTEM LAYER</span>
            </div>
            <h2 className="font-display-lg text-[#DFB7FF] text-3xl font-black uppercase tracking-tight glow-purple">
              SECURE BOOTH RESERVATIONS
            </h2>
          </div>
          <span className="text-[10px] text-text-muted font-bold tracking-widest mt-2 md:mt-0 uppercase">
            AUTHORIZED BY: QUEEN_ROGUE
          </span>
        </div>

        {/* Form and Status Registry split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT: The Booking Interactive Terminal */}
          <div className="lg:col-span-6 bg-surface-dark/95 border-2 border-cyber-purple/40 cyber-clip p-6 box-glow-purple flex flex-col justify-between">
            {bookingState === "idle" && (
              <form onSubmit={handleBookingSubmit} className="space-y-5 text-xs">
                
                <div className="flex items-center gap-2 border-b border-cyber-purple/20 pb-3">
                  <Layers className="w-4.5 h-4.5 text-cyber-cyan" />
                  <span className="text-[10px] text-cyber-cyan font-extrabold uppercase font-share">
                    // SUBMIT NEW SECURITY RESERVATION PACKET
                  </span>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-text-muted font-bold text-[10px] uppercase">OPERATIVE_ALIAS</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., V, WEILAND, FALCON"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-surface-base border border-cyber-purple/30 text-cyber-cyan font-mono px-3 py-2 outline-none focus:border-cyber-cyan rounded-none"
                  />
                </div>

                {/* Size Grid selector */}
                <div className="space-y-1.5">
                  <label className="block text-text-muted font-bold text-[10px] uppercase">CO-CONSPIRATORS (PARTY SIZE)</label>
                  <div className="grid grid-cols-5 gap-1.5 text-center font-bold">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setSize(num)}
                        className={`py-2 border transition-all ${
                          size === num 
                            ? "bg-[#dfb7ff] border-[#dfb7ff] text-surface-base font-black" 
                            : "border-cyber-purple/20 text-text-primary hover:border-cyber-purple/50"
                        }`}
                      >
                        {num === 5 ? "5+ VIP" : `${num}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time frame selector code windows */}
                <div className="space-y-1.5">
                  <label className="block text-text-muted font-bold text-[10px] uppercase">TEMPORAL TRANSMISSION TIER</label>
                  <select
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full bg-surface-base border border-cyber-purple/30 text-cyber-cyan font-mono px-2 py-2 outline-none focus:border-cyber-cyan rounded-none"
                  >
                    <option value="MIDNIGHT PROTOCOL (22:00 - 01:00)">MIDNIGHT PROTOCOL (22:00 - 01:00)</option>
                    <option value="VIP AFTERMATH (01:00 - 04:00)">VIP AFTERMATH (01:00 - 04:00)</option>
                    <option value="DAWN INFILTRATION (04:00 - 07:00)">DAWN INFILTRATION (04:00 - 07:00)</option>
                  </select>
                </div>

                {/* Special secure checkboxes */}
                <div className="space-y-1.5">
                  <label className="block text-text-muted font-bold text-[10px] uppercase">SECURE UTILITY SPECIFICATIONS</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] uppercase font-bold text-text-primary/95">
                    {[
                      "Weapons Locker", 
                      "Electrostatic ICE coverage", 
                      "Soundproof sonic box", 
                      "Trauma locator beacon"
                    ].map(spec => (
                      <div 
                        key={spec}
                        onClick={() => toggleSpec(spec)}
                        className={`flex items-center gap-2 border p-2 cursor-pointer transition-all ${
                          specs.includes(spec) 
                            ? "border-cyber-cyan text-cyber-cyan bg-cyber-cyan/5" 
                            : "border-cyber-purple/15 text-text-primary/75 hover:border-cyber-purple/30"
                        }`}
                      >
                        <CheckSquare className={`w-4 h-4 ${specs.includes(spec) ? "text-cyber-cyan" : "text-text-muted"}`} />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyber-purple hover:bg-[#dfb7ff] text-white hover:text-surface-base font-bold py-3.5 transition-colors duration-300 text-[10px] tracking-widest uppercase border border-cyber-purple"
                >
                  TRANSMIT BOOKING CLEARANCE
                </button>
              </form>
            )}

            {/* Submitting visual decrypter animation */}
            {bookingState === "submitting" && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-12 text-center text-xs">
                <div className="animate-spin h-8 w-8 rounded-full border-2 border-cyber-cyan border-t-transparent box-glow-cyan"></div>
                <div className="space-y-1">
                  <p className="text-cyber-cyan font-bold uppercase tracking-wider animate-pulse font-share text-sm">
                    SYNCHRONIZING WITH BOUNCER MAINFRAME...
                  </p>
                  <p className="text-text-primary/60 text-[10px]">
                    Validating neural profile with Rogue's security records. Stand by.
                  </p>
                </div>
              </div>
            )}

            {/* Booking Confirmed success layout code */}
            {bookingState === "confirmed" && (
              <div className="flex-1 flex flex-col justify-between py-4 text-xs font-mono space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-cyber-cyan/30 pb-3">
                    <Calendar className="w-5 h-5 text-cyber-cyan" />
                    <span className="text-cyber-cyan font-bold block uppercase font-share text-sm">
                      CLEARANCE_STATUS: VERIFIED
                    </span>
                  </div>

                  <div className="space-y-2 p-4 bg-surface-base border border-cyber-cyan/35 rounded-none text-cyan-50 leading-relaxed text-[11px] select-all">
                    <p><strong className="text-cyber-cyan">ASSIGNED BOOTH:</strong> NODE_{assignedBooth}</p>
                    <p><strong className="text-cyber-cyan">OPERATIVE REGISTERED:</strong> {name.toUpperCase()}</p>
                    <p><strong className="text-cyber-cyan">TEMPORAL WINDOW:</strong> {time}</p>
                    <p><strong className="text-cyber-cyan">ACCESS SPECS:</strong> {specs.join(", ") || "No accessories."}</p>
                    <p className="text-[9px] text-text-muted mt-2 border-t border-cyber-cyan/15 pt-2">
                      SYS_SEC_KEY: AFTERLIFE_BOOTH_APPROVE_REF_{Date.now().toString().substring(6)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setName("");
                      setSpecs([]);
                      setBookingState("idle");
                    }}
                    className="w-full bg-cyber-cyan hover:bg-[#dfb7ff] text-surface-base font-bold py-2.5 text-[10px] uppercase tracking-wider transition-all rounded-none"
                  >
                    OPEN NEW TICKET PROTOCOL
                  </button>
                </div>
              </div>
            )}

            {/* Disclaimer details bar */}
            <div className="border-t border-cyber-purple/15 pt-3 mt-5 text-[9px] text-text-muted flex items-center gap-1.5 select-none">
              <ShieldAlert className="w-3.5 h-3.5 text-acid-red" />
              <span>Weapons must remain secured within assigned bulletproof lockers at all times inside Sector 4 boundaries.</span>
            </div>
          </div>

          {/* RIGHT: Live Booth clearances scroll monitor log */}
          <div className="lg:col-span-6 bg-surface-dark border border-cyber-purple/30 cyber-clip p-5 flex flex-col justify-between box-glow-purple">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-cyber-purple/20 text-xs">
                <span className="text-[#DFB7FF] font-bold flex items-center gap-2 font-share">
                  <Terminal className="w-4 h-4 text-cyber-purple-light" />
                  <span>SECURE_BOOTHS_REGISTRY_LIVE_FEED</span>
                </span>
                <span className="text-[9px] text-cyber-cyan font-bold tracking-widest uppercase">
                  ACTIVE NODES: 20
                </span>
              </div>

              {/* Clearance Feed Rows */}
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 text-[11px] font-mono scrollbar-thin">
                {registry.map(res => (
                  <div
                    key={res.id}
                    className="p-3 bg-surface-base border border-cyber-purple/15 hover:border-cyber-cyan transition-colors duration-300 relative group"
                  >
                    {/* Pulsing indicator node */}
                    <div className="absolute top-3 right-3 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse"></span>
                      <span className="text-[8px] text-cyber-cyan font-bold font-share">BOOTH {res.boothId}</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[9px] text-text-muted">
                        [{res.timestamp}] // OPERATIVE: <strong className="text-cyber-purple-light">{res.operativeName}</strong>
                      </div>

                      <div className="text-text-primary/85 select-all leading-normal">
                        <strong>Time:</strong> {res.timeWindow}<br />
                        <strong>Utility Specs:</strong> <span className="text-text-primary/75 text-[10px]">{res.specialRequirements}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-cyber-purple/15 pt-3.5 mt-4 text-[9px] text-text-muted font-bold flex justify-between select-none">
              <span>ICE SHIELDS ACTIVE ON DISPENSER NODES</span>
              <span className="text-cyber-cyan">BOUNCER_GRID_STABLE</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
