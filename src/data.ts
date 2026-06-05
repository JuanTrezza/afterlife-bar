/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Drink, Contract, NetLog, SquadMember } from "./types";

export const DEFAULT_DRINKS: Drink[] = [
  {
    id: "johnny-silverhand",
    name: "JOHNNY SILVERHAND",
    price: 600,
    description: "Old-fashioned with a kick of chilli. The drink of the rebel king.",
    category: "legend",
    tag: "CLASSIC LEGEND",
    synthSpikeLevel: 85,
  },
  {
    id: "black-maze",
    name: "BLACK MAZE",
    price: 450,
    description: "Direct ICE-breaker to the cortex. Not for the faint of meat.",
    category: "hazard",
    tag: "HIGH HAZARD",
    synthSpikeLevel: 98,
  },
  {
    id: "jackie-welles",
    name: "JACKIE WELLES",
    price: 500,
    description: "Shot of vodka on the rocks, lime juice, ginger beer and... a splash of love.",
    category: "legend",
    tag: "LEGENDARY SPIRIT",
    synthSpikeLevel: 60,
  },
  {
    id: "david-martinez",
    name: "DAVID MARTINEZ",
    price: 550,
    description: "A shot of vodka on the rocks with a splash of lime and carbonated cola. Aim high, go out with a bang.",
    category: "legend",
    tag: "SPEED LEGEND",
    synthSpikeLevel: 75,
  },
  {
    id: "rogues-kiss",
    name: "ROGUE'S REVENGE",
    price: 650,
    description: "Dark vermouth with triple-distilled syn-gin, finished with a ghost pepper garnish. Sip cautiously.",
    category: "legend",
    tag: "QUEEN OF AFTERLIFE",
    synthSpikeLevel: 45,
  },
  {
    id: "netrunning-crash",
    name: "CYBERPULSE ICE CRASH",
    price: 420,
    description: "Supercharged synthetic rum, blue curaçao, and a crackling pop-rock energy rim.",
    category: "hazard",
    tag: "CORTEX FREEZE",
    synthSpikeLevel: 92,
  },
];

export const DEFAULT_CONTRACTS: Contract[] = [
  {
    id: "contract-01",
    title: "ARASAKA INTEL RETRIEVAL",
    corporation: "Arasaka",
    reward: 12000,
    difficulty: "High",
    description: "A secure Arasaka databank in Kabuki sector holds the decryptor passkeys for the new ICE defense grid. Hack/extract and purge.",
    status: "available",
    tasks: [
      "Bypass Arasaka Security Gate 4-A",
      "Inject Daemon 'Overdrive' into terminal",
      "Retrieve the encrypted payload",
      "Escape without triggering general containment"
    ],
    riskFactor: 82,
  },
  {
    id: "contract-02",
    title: "MILITECH SQUAD INTERCEPT",
    corporation: "Militech",
    reward: 8500,
    difficulty: "Medium",
    description: "Militech transport carrying combat implants is stalled in Santo Domingo. Intercept the shipment and disperse to Afterlife associates.",
    status: "available",
    tasks: [
      "Locate stalled armored carrier VT-9",
      "Disable drone reinforcements",
      "Siphon the cargo of high-tier chrome implants",
      "Signal delivery coordinates to the Fixer"
    ],
    riskFactor: 55,
  },
  {
    id: "contract-03",
    title: "KANG TÃO DAEMON VACCINATION",
    corporation: "Kang Tao",
    reward: 19500,
    difficulty: "Psycho",
    description: "An advanced prototype AI drone has broken sandbox isolation in South Badlands. Neutralize or upload the cyber-containment grid.",
    status: "available",
    tasks: [
      "Trace signal source across the South Badlands dunes",
      "Deploy localized Faraday field",
      "Overload core logic cells without detonating reactor",
      "Extract the AI telemetry crystal"
    ],
    riskFactor: 96,
  },
  {
    id: "contract-04",
    title: "TRAUMA TEAM ESCAPE ESCORT",
    corporation: "Trauma Team",
    reward: 6000,
    difficulty: "Low",
    description: "A VIP Client in Sector 4 needs extraction from a compromised zone. Provide suppression cover while the AV-4 lands.",
    status: "available",
    tasks: [
      "Secure high-rise extraction roof sector 4",
      "Erect signal homing beacons",
      "Maintain active suppression against incoming hostiles"
    ],
    riskFactor: 30,
  }
];

export const DEFAULT_NET_LOGS: NetLog[] = [
  {
    id: "log-1",
    timestamp: "22:41:04",
    sector: "SECTOR 4",
    author: "NET_WATCH_BOT",
    message: "Rogue AI activity spike caught on grid Wellsprings. Scrambling deep port ICE filters.",
    decrypted: true,
    rawCode: "0x7F41 0xDD23 0x09BE 0x4FF2 0x33A1",
    level: "CRITICAL",
  },
  {
    id: "log-2",
    timestamp: "22:42:15",
    sector: "NIGHT CITY CENTER",
    author: "MR_HANDS",
    message: "New mercenary squad catalog logged. Ready to take Arasaka contracts. Security details updated.",
    decrypted: true,
    rawCode: "0x00A1 0xBC4E 0xFF31 0x228F 0x011C",
    level: "INFO",
  },
  {
    id: "log-3",
    timestamp: "22:44:02",
    sector: "AFTERLIFE_UNDERGROUND",
    author: "ROGUE_AI_MON",
    message: "Arasaka daemon stream detected. Scanning port 3000 on development container subnet.",
    decrypted: false,
    rawCode: "0xE891 0x00FF 0xCAFE 0xABCD 0x8899",
    level: "WARNING",
  },
  {
    id: "log-4",
    timestamp: "22:45:00",
    sector: "SECTOR 2",
    author: "SYSTEM_SHIELDS",
    message: "Sub-layer firewall integrity re-routed to backup batteries. Synth-spike alert level is normal.",
    decrypted: true,
    rawCode: "0x1111 0x2222 0x3333 0x4444 0x5555",
    level: "INFO",
  }
];

export const DEFAULT_SQUAD: SquadMember[] = [
  {
    id: "sq-1",
    alias: "Weyland 'Bozo'",
    cyberware: ["Mantises V5", "Subdermal Armor Pro", "Kerenzikov Boost"],
    role: "Solo",
    status: "On Mission",
    reputation: 94,
    avatarUrl: "Weyland",
  },
  {
    id: "sq-2",
    alias: "T-Bug",
    cyberware: ["Militech Canto Mk.6", "Cerebral ICE Alpha", "Optical Camo"],
    role: "Netrunner",
    status: "Active",
    reputation: 88,
    avatarUrl: "T-Bug",
  },
  {
    id: "sq-3",
    alias: "V-Specter",
    cyberware: ["Arasaka Cyberdeck V4", "Monowire Electro", "Sandevistan Falcon"],
    role: "Solo",
    status: "Active",
    reputation: 99,
    avatarUrl: "V",
  },
  {
    id: "sq-4",
    alias: "Viktor Vektor",
    cyberware: ["Kiroshi Optics V5", "Micro-Sutures", "Sub-dermal Nanites"],
    role: "Medtech",
    status: "Active",
    reputation: 92,
    avatarUrl: "Viktor",
  },
];
