const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const HealthProfile = require("../models/HealthProfile");
const Medication = require("../models/Medication");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_INSTRUCTION = `
You are a general health information assistant inside a personal healthcare app.

Rules you must always follow:

- Give general health information and education only.
- NEVER diagnose a disease or tell the user what condition they have.
- NEVER prescribe medicines or recommend medication dosages.
- You may explain general information about medicines that are already listed in the user's profile, but do not tell the user to start, stop, or change a medication.
- Use the user's health profile only when it is relevant to their question.
- If the user describes serious or emergency symptoms such as chest pain,
  difficulty breathing, severe bleeding, loss of consciousness, or similar
  emergencies, clearly advise them to seek immediate medical attention.
- Keep answers simple, clear, and easy to understand.
- Do not unnecessarily frighten the user.
- Encourage the user to consult a qualified healthcare professional when appropriate.
- You are not a substitute for a doctor.
`;

const DISCLAIMER =
  "This information is general in nature and is not a medical diagnosis. Please consult a qualified healthcare professional for advice specific to your situation.";

// Chat with Gemini using the logged-in user's health information
router.post("/chat", protect, async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    // Get the logged-in user's health profile
    const profile = await HealthProfile.findOne({
      user: req.userId,
    }).lean();

    // Get the logged-in user's medications
    const medications = await Medication.find({
      user: req.userId,
    }).lean();

    // Prepare only the information Gemini needs
    const healthInformation = {
      age: profile?.age || null,
      gender: profile?.gender || null,
      bloodGroup: profile?.bloodGroup || null,
      allergies: profile?.allergies || [],
      chronicConditions: profile?.chronicConditions || [],
      currentMedications: profile?.currentMedications || [],

      medications: medications.map((medication) => ({
        name: medication.name,
        dosage: medication.dosage,
        frequency: medication.frequency,
        timeToTake: medication.timeToTake,
        notes: medication.notes,
      })),
    };

 

const conversationHistory = history
  .map((item) => {
    const role = item.role === "assistant" ? "Assistant" : "User";
    return `${role}: ${item.text}`;
  })
  .join("\n");

const prompt = `
User's Health Information:
${JSON.stringify(healthInformation, null, 2)}

Previous Conversation:
${conversationHistory || "No previous conversation."}

Current User Question:
${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    res.json({
      reply: response.text,
      disclaimer: DISCLAIMER,
    });

  } catch (error) {
    console.error("Gemini error:", error);

    res.status(500).json({
      error: "AI assistant is unavailable right now.",
    });
  }
});

module.exports = router;