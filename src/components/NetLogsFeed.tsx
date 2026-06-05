/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { DEFAULT_NET_LOGS } from "../data";
import { NetLog } from "../types";
import { Shield, Lock, Unlock, Eye, Sparkles, Terminal } from "lucide-react";

export default function NetLogsFeed() {
  const [logs, setLogs] = useState<NetLog[]>(DEFAULT_NET_LOGS);
  const [decryptingId, setDecryptingId] = useState<string | null>(null);

  const handleDecryptLog = (logId: string) => {
    setDecryptingId(logId);
    
    // Scramble effect simulation
    setTimeout(() => {
      setLogs(prev => prev.map(log => {
        if (log.id === logId) {
          return {
            ...log,
            decrypted: true,
            message: log.message.toUpperCase() + " // [SUBNET INTEGRITY CONFIRMED]"
          };
        }
        return log;
      }));
      setDecryptingId(null);
    }, 1500);
  };

  return (
    <section id="feed" className="py-24 bg-surface-base border-t border-cyber-purple/20 font-mono relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16 space-y-2">
          <span className="text-[10px] text-cyber-cyan font-bold tracking-widest uppercase block font-share">
            // TELEMETRY_STREAM: GRID_NODE_VISUAL_LOGS
          </span>
          <h2 className="font-display-lg text-[#DFB7FF] text-3xl font-black tracking-tight uppercase glow-purple">
            NET_LOG_VISUALS
          </h2>
        </div>

        {/* Outer Layout Split: Left details block collage and Right interactive Log stream reader */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT COLUMN: Grayscale High Contrast Image Collage Deck */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            
            {/* Image 1: Main Afterlife Table - spans 2 cols, 2 rows */}
            <div className="col-span-2 overflow-hidden bg-black border border-cyber-purple/20 cyber-clip relative group">
              <div className="absolute top-2 left-2 bg-black/80 text-[8px] text-cyber-cyan font-bold px-1.5 py-0.5 z-10">
                CAM_NODE_SECTOR_4_HD
              </div>
              <img 
                alt="Afterlife Crew Table" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-JWVBEsjmUZJHRS0pdAmAMmW8q9W7YooWcyKpeHi8ZqweO5CXt0-J4mqcwUWu8e65b90H2sjXyrmKocrelx2u8KnK556tXgzYfA3pppsc8c59631Ie0pvJAnJaGby6w8PfgehX55Hl6cgc_KSsrpOh1FGZ5PgJxWfoFvnxzUzsBnWaIa_CQ2c-l-IpNaUoM39YRAYlnd7J8dKqXUgKm8DeMxa1-K5RFViSXl6YP2Z71f3FB_iUCEBIdPSxhQVl6pnA8TF1LY4NFE" 
                className="w-full h-48 object-cover filter grayscale contrast-150 group-hover:scale-[1.03] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Image 2: Conceptual Corridor */}
            <div className="overflow-hidden bg-black border border-cyber-purple/15 cyber-clip h-32 relative group">
              <div className="absolute top-2 left-2 bg-black/80 text-[8px] text-text-muted font-bold px-1.5 py-0.5 z-10">
                GRID_INFRA_LINK_9
              </div>
              <img 
                alt="Cyberpunk grid corridors" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX0N-KIiF2Cw9kuIibNYqZ_97S_yCf8TVPWwAR3GEzyRomzpDiujuzxaI3ZDBt0wuDG22r00Y0Q36CJIXJDzFC8Hxv1bMM5UMInMr8KhTXk8i6KMrgWY-yfDRgh552idUPrnX6_Ed9dMSSlctbI_r3ldFb1UaFmu3hTR2mt5Kx3I5LaICM7k3uFXsWe-GbyPHeTgECdEwEFysd4mt3zzsofvEgalCFSKiORvdj2ccy6F3GMhns1Uprbr1ERKbcpn2J4gAjfNweVu4" 
                className="w-full h-full object-cover filter grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Image 3: Coding Prosthetic Finger typing */}
            <div className="overflow-hidden bg-black border border-cyber-purple/15 cyber-clip h-32 relative group">
              <div className="absolute top-2 left-2 bg-black/80 text-[8px] text-text-muted font-bold px-1.5 py-0.5 z-10">
                PROSTH_CORTEX_TYPE_01
              </div>
              <img 
                alt="Cybernetic fingers typing" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8wd3rz9xl-WuTIH5HreXGSS2B-y6JeB8ZB8lFaih8IZw0wdPfWWTDpcohv_BaOq2-3vhniD1P-m9CNYIyZV2036BkvwrF5rUqKzBE4xxNvW4cWRYAxhWdAevyM89dTqOt-QYTLTiHHsh2YxIriUAzjVV1Q_0Z62oi9DEYQ3InUEwqhSWsNZTFhY-z1W7LB4icCOrXtOhssDaoBI7kveGlZX8bnqxgrNXI7eYWaRjMKGI_k2JHL3YK19r5AqEExv0oJmgUOVOXqlA" 
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Image 4: Underground Panoramic views dance area */}
            <div className="col-span-2 overflow-hidden bg-black border border-cyber-purple/15 cyber-clip h-36 relative group">
              <div className="absolute top-2 left-2 bg-black/80 text-[8px] text-[#DFB7FF] font-bold px-1.5 py-0.5 z-10">
                DANCE_FLOOR_LASER_PULSE
              </div>
              <img 
                alt="Cyberpunk dance floor panoramic view" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA9_oCVKeageMZQIZGDhz1SWwlcyEaJCO8mn52iX3WyPUKw3W9DEKk_RmETr1JhyqkSk_VYcVfzKQcx6oj9oeEpiXUDHChOtEB5gP02JGsy735NRoRWur1b1pai0hU6Q3RP36em6NRbWmnJznKx8XHvss8m2uvPA911JMbIxIUl9CZPeR8zhcU6AGu9t5bSWrEsHDG0EQhG0t5oOejwIGjFVSnFgbQqeEr3xs_z-RPdh-APAk14H2efnTwoZsY_-qqHt7P1aQspm8" 
                className="w-full h-full object-cover filter grayscale group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>

          {/* RIGHT COLUMN: Log Monitor Stream interactive decoder console */}
          <div className="lg:col-span-5 bg-surface-dark border-2 border-cyber-purple/40 cyber-clip p-5 flex flex-col justify-between box-glow-purple">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-cyber-purple/20 text-xs">
                <span className="text-[#DFB7FF] font-bold flex items-center gap-1.5 font-share">
                  <Terminal className="w-4 h-4 text-cyber-purple-light" />
                  <span>SECURE_DATA_STREAM_LOG</span>
                </span>
                <span className="text-[9px] bg-cyber-purple/15 text-[#DFB7FF] border border-cyber-purple/35 px-1.5">
                  DECRYPTERS: ON
                </span>
              </div>

              {/* Log stream ticker list scroll area */}
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1 text-xs font-mono scrollbar-thin">
                {logs.map(log => (
                  <div 
                    key={log.id} 
                    className={`p-3 border rounded-none space-y-2 relative transition-all duration-300 ${
                      log.level === "CRITICAL" 
                        ? "bg-acid-red/5 border-acid-red/30 hover:border-acid-red" 
                        : log.level === "WARNING" 
                        ? "bg-amber-gold/5 border-amber-gold/30 hover:border-amber-gold" 
                        : "bg-surface-base border-cyber-purple/20 hover:border-cyber-purple"
                    }`}
                  >
                    {/* Timestamp & Author tags */}
                    <div className="flex justify-between text-[9px] text-text-muted font-bold">
                      <span className="text-cyber-purple-light select-all">[{log.timestamp}] // {log.sector}</span>
                      <span className={log.level === "CRITICAL" ? "text-acid-red text-[8px] animate-pulse" : ""}>
                        {log.level}
                      </span>
                    </div>

                    {/* Decryption Message logic flow */}
                    <div className="leading-relaxed">
                      <span className="text-cyber-cyan block mb-1 text-[10px] font-bold uppercase">{log.author}</span>
                      {log.decrypted ? (
                        <p className="text-text-primary/95 text-[11px] leading-relaxed select-all">
                          {log.message}
                        </p>
                      ) : (
                        <div className="space-y-1.5">
                          <p className="text-[10px] text-text-muted italic select-none">
                            [ENCRYPTED_PACKET: {log.rawCode}]
                          </p>
                          <button
                            type="button"
                            disabled={decryptingId === log.id}
                            onClick={() => handleDecryptLog(log.id)}
                            className="bg-cyber-purple/20 hover:bg-cyber-purple text-cyber-purple-light hover:text-white border border-cyber-purple/40 hover:border-cyber-purple px-2 py-1 text-[9px] font-share transition-all duration-300 uppercase cursor-pointer"
                          >
                            {decryptingId === log.id ? "SCRAPING INTEGRITY..." : "DECRYPT_ICE_LOG"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick telemetry baseline summary */}
            <div className="border-t border-cyber-purple/15 pt-3.5 mt-4 text-[9px] text-text-muted font-bold flex justify-between items-center">
              <span>SYS_MON_READS: TOTAL_LOGS_ACTIVE_4</span>
              <span className="text-cyber-cyan">CIPHER: SAMURAI_v0.7</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
