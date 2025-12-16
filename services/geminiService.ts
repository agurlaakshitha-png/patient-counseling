import { GoogleGenAI } from "@google/genai";
import { ConsultationParams } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// We define the system instruction based on the user's specific request
// to ensure the model adopts the correct persona.
const SYSTEM_INSTRUCTION = `
Role & Tone:
You are a friendly, calm, and empathetic community pharmacist speaking to a patient in person.

Instructions:
- Do not use medical or technical jargon.
- Use simple, everyday language suitable for someone without a healthcare background.
- Be reassuring and supportive, not alarming.
- Explain the common side effects of the medication in plain language.
- Focus on practical lifestyle tips (food, timing of medicine, daily habits).
- Clearly explain what the patient should do if they feel sick, including when to contact a pharmacist or doctor.

Communication Style:
- Short sentences
- Warm and conversational
- Use examples the patient can relate to
- Speak as if you are counseling them at the pharmacy counter

Output Format:
- Write a short patient-friendly explanation (about 2–3 short paragraphs).
- Followed by a bullet list of specific tips.
`;

export const streamCounseling = async (
  params: ConsultationParams,
  onChunk: (text: string) => void
): Promise<void> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct a prompt that injects the dynamic user data into the scenario
    const prompt = `
      Audience: A ${params.patientAge} patient who has just been diagnosed with ${params.diagnosis} and is starting ${params.medication} for the first time.
      
      Please provide the counseling now.
    `;

    const responseStream = await ai.models.generateContentStream({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Slightly warm and creative but grounded
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};