/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Drink {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "legend" | "hazard";
  tag: string;
  synthSpikeLevel: number; // 0 to 100%
  custom?: boolean;
}

export interface Contract {
  id: string;
  title: string;
  corporation: "Arasaka" | "Militech" | "Kang Tao" | "Trauma Team" | "Night Corp" | "Border Security";
  reward: number; // in eurodollars (EB)
  difficulty: "Low" | "Medium" | "High" | "Psycho";
  description: string;
  status: "available" | "signed" | "completed" | "failed";
  tasks: string[];
  riskFactor: number; // percentage
}

export interface NetLog {
  id: string;
  timestamp: string;
  sector: string;
  author: string;
  message: string;
  decrypted: boolean;
  rawCode: string;
  level: "INFO" | "WARNING" | "CRITICAL";
}

export interface BoothReservation {
  id: string;
  operativeName: string;
  partySize: number;
  timeWindow: string;
  specialRequirements: string;
  timestamp: string;
  status: "pending" | "approved" | "denied";
  boothId: number;
}

export interface SquadMember {
  id: string;
  alias: string;
  cyberware: string[];
  role: "Solo" | "Netrunner" | "Techie" | "Medtech" | "Fixer";
  status: "Active" | "Flatlined" | "On Mission" | "In Rehab";
  reputation: number; // percentage
  avatarUrl: string;
}
