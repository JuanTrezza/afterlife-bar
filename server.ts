/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        aiClient = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });
        console.log(">> Gemini AI initialized successfully on server-side.");
      } catch (err) {
        console.error("Failed to initialize GoogleGenAI:", err);
      }
    } else {
      console.log(">> No GEMINI_API_KEY found, running in local cybernetic fallback simulation.");
    }
  }
  return aiClient;
}

// Ensure the client is checked/warmed on boot
getGemini();

// API Endpoint 1: Talk to Afterlife characters (Bartender, Rogue, Johnny)
app.post("/api/chat", async (req, res) => {
  const { message, character } = req.body;
  if (!message) {
    res.status(400).json({ error: "Missing prompt message" });
    return;
  }

  const char = character || "bartender";
  let promptPrefix = "";
  let botName = "";

  if (char === "johnny") {
    botName = "Johnny Silverhand";
    promptPrefix = `
      You are Johnny Silverhand from Cyberpunk 2077. Your personality is arrogant, rebellious, deeply anti-corporation (especially Arasaka), rockstar-legendary, cynical yet charismatic. You speak with high-energy slang, swear occasionally (keep it PG-13 but punchy), and refer with absolute authority to the old wars and your rock band Samurai. Let the user know they're talking to a digital construct.
      Answer the user's message concisely in 3-4 atmospheric sentences.
    `;
  } else if (char === "rogue") {
    botName = "Rogue Amendiares";
    promptPrefix = `
      You are Rogue Amendiares, the Queen of Afterlife and the best Fixer in Night City. Your personality is tough-as-nails, highly professional, sharp, business-oriented, and cautious. You don't tolerate talkers, you respect professionals who get the job done. You know everything about everyone in Sector 4 and Night City.
      Answer the user's message concisely in 3-4 atmospheric sentences.
    `;
  } else {
    botName = "Claire / The Bartender";
    promptPrefix = `
      You are Claire, the elite bartender of the Afterlife who knows all the legendary mercs and their lethal drinks. You are friendly but street-smart, calm, observing the chaos of Night City. You tell legends of those who got drinks named after them (by dying in glorious battle).
      Answer the user's message concisely in 3-4 atmospheric sentences.
    `;
  }

  const ai = getGemini();

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: message,
        config: {
          systemInstruction: promptPrefix,
          temperature: 0.8,
        },
      });

      res.json({
        author: botName,
        text: response.text || "Connection scrambled. Stand by.",
        simulated: false,
      });
      return;
    } catch (err) {
      console.error("Gemini Chat Error, switching to mock:", err);
    }
  }

  // Fallback Simulation (very high quality!)
  let fallbackReply = "";
  const randomSuffix = ` [SECURE SUBNET SIGNAL]`;
  if (char === "johnny") {
    const replies = [
      "Listen, kid. The Megacorps are sucking Night City dry while you're standing around drinking synth-ale. If you aren't pointing a gun at a suit's forehead, you're wasting my code.",
      "V? No, you don't look like V. But you've got that look in your eyes—like you want to set Arasaka Tower on fire. I like it. Keep talking.",
      "Samurai isn't just a band, it's a statement. A statement that we won't bend. Now grab a Silverhand Sour and let's make some real noise.",
    ];
    fallbackReply = replies[Math.floor(Math.random() * replies.length)] + randomSuffix;
  } else if (char === "rogue") {
    const replies = [
      "I've got three gigs on my desk right now that would freeze your cerebral nodes. If you're here to talk, find another booth. If you're here for eddies, show me your cyberware specs.",
      "The Afterlife has one rule: you don't talk specs in the open. Sit down, keep your voice low, and tell me if you can handle Arasaka firewall ICE.",
      "Night City doesn't remember the dead because they were nice. It remembers them because they left a giant crater in some Corp's profit margin.",
    ];
    fallbackReply = replies[Math.floor(Math.random() * replies.length)] + randomSuffix;
  } else {
    const replies = [
      "Need a drink to steady your cybernetic shakes? I can mix you a Johnny Silverhand, but only if you plan on surviving the weekend.",
      "You see that corner booth? That's where Jackie Welles sat. In this bar, we don't name drinks after you until you flatline in a spectacular blaze of glory.",
      "Welcome to the Afterlife. Keep your weapons locked and your internal ICE active. What can I pour for you, merc?",
    ];
    fallbackReply = replies[Math.floor(Math.random() * replies.length)] + randomSuffix;
  }

  res.json({
    author: botName,
    text: fallbackReply,
    simulated: true,
  });
});

// API Endpoint 2: Generate Customized Cyberpunk Cocktail (Liquid Legends custom mixer)
app.post("/api/cocktail-mixer", async (req, res) => {
  const { ingredient, themeVibe } = req.body;
  const prompt = `
    Create a unique, super-cool cyberpunk cocktail named after a legendary theme or character, utilizing the key ingredient "${ingredient || "synth-gin"}" and carrying the vibe "${themeVibe || "neon dystopia"}".
    Return the output in a strict JSON format with exactly these properties:
    - name: uppercase name of the cocktail (e.g., 'ARASAKA FIREWALL CORRUPTOR')
    - price: a realistic price in Eurodollars (EB) between 350 and 800
    - description: a 1-2 sentence cheeky description containing immersive cyberpunk, Night City slang or references
    - category: either 'legend' or 'hazard'
    - tag: a short uppercase badge (e.g., 'HIGH VOLTAGE', 'NETRUNNER SPECIAL')
    - synthSpikeLevel: an integer from 30 to 100 representing toxicity/synth-spike percentage.
  `;

  const ai = getGemini();

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              price: { type: Type.NUMBER },
              description: { type: Type.STRING },
              category: { type: Type.STRING },
              tag: { type: Type.STRING },
              synthSpikeLevel: { type: Type.INTEGER },
            },
            required: ["name", "price", "description", "category", "tag", "synthSpikeLevel"],
          },
        },
      });

      if (response.text) {
        const result = JSON.parse(response.text.trim());
        res.json({ ...result, simulated: false });
        return;
      }
    } catch (err) {
      console.error("Gemini Cocktail Error, using mock:", err);
    }
  }

  // Realistic fallback cocktail generators
  const fallbackDrinks = [
    {
      name: `${(ingredient || "CHROME").toUpperCase()} INJECTOR V4`,
      price: 520,
      description: `Infused with carbonated nitrous and sour apple extract. Grants instant neural overdrive and a radioactive purple mouth-glow.`,
      category: "hazard",
      tag: "OVERDRIVE COCKTAIL",
      synthSpikeLevel: 94,
      simulated: true,
    },
    {
      name: `GLITCH ON THE BEACH`,
      price: 480,
      description: `A heavy mix of synthetic pineapple pulp, ghost pepper tequila, and high-latency orange essence under the vibe of "${themeVibe || "cyberpunk"}".`,
      category: "legend",
      tag: "GRID DECRYPTOR",
      synthSpikeLevel: 72,
      simulated: true,
    },
  ];

  res.json(fallbackDrinks[Math.floor(Math.random() * fallbackDrinks.length)]);
});

// API Endpoint 3: Interactive Mercenary Contract Generator
app.post("/api/contract-generator", async (req, res) => {
  const { corporation, difficulty } = req.body;
  const corpName = corporation || "Arasaka";
  const diffLevel = difficulty || "Medium";

  const prompt = `
    Draft a highly detailed and immersive Cyberpunk Mercenary Contract targeting the corporation "${corpName}" at a difficulty level of "${diffLevel}".
    Return the response as a strict JSON object with these exact properties:
    - title: uppercase punchy contract title (e.g. 'SABOTAGE PROTOCOL ZERO')
    - reward: numeric reward amount in EB (usually between 5000 and 25000 depending on difficulty)
    - description: 2 sentences outlining the background lore and objectives of the mission
    - tasks: an array of exactly 3-4 specific, tech-slang objectives to complete (e.g. ['Hack sector terminal', 'Purge carbon cells'])
    - riskFactor: integer between 10 and 100 representing mission hazard level.
  `;

  const ai = getGemini();

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              reward: { type: Type.NUMBER },
              description: { type: Type.STRING },
              tasks: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              riskFactor: { type: Type.INTEGER },
            },
            required: ["title", "reward", "description", "tasks", "riskFactor"],
          },
        },
      });

      if (response.text) {
        const result = JSON.parse(response.text.trim());
        res.json({
          ...result,
          corporation: corpName,
          difficulty: diffLevel,
          status: "available",
          id: `contract-gen-${Date.now()}`,
          simulated: false,
        });
        return;
      }
    } catch (err) {
      console.error("Gemini Contract Error, using mock:", err);
    }
  }

  // Realistic fallback contract template
  const defaultRewards: Record<string, number> = {
    Low: 4500,
    Medium: 9200,
    High: 15000,
    Psycho: 24500,
  };
  const defaultRisks: Record<string, number> = {
    Low: 25,
    Medium: 50,
    High: 78,
    Psycho: 99,
  };

  const fallbackContracts = [
    {
      title: `${corpName.toUpperCase()} DATA RECOVERY`,
      reward: defaultRewards[diffLevel] || 8000,
      description: `Rumor has it ${corpName} is storing top secret bio-implants under sector 4 vaults. Extract files and vaporize the backups.`,
      tasks: [
        `Distract patrolling corporate drones`,
        `Crack the local ICE encrypted mainframe`,
        `Copy raw databanks to a portable neural shard`,
        `Clean up security log footprints`
      ],
      riskFactor: defaultRisks[diffLevel] || 60,
      corporation: corpName,
      difficulty: diffLevel,
      status: "available",
      id: `contract-gen-${Date.now()}`,
      simulated: true,
    },
  ];

  res.json(fallbackContracts[0]);
});

// Vite Middleware & Static Serves
const startServer = async () => {
  // If in development mode and file-watching is disabled (AI Studio)
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log(">> Vite dev server middleware mounted.");
  } else {
    // In production, serve the statically built files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log(">> Production mode: serving static web bundles.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`>> Afterlife Cyberpunk Server active on http://0.0.0.0:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Critical server boot crash:", error);
});
