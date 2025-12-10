import { GoogleGenAI } from "@google/genai";
import { User } from "../types";

export const generateJoiningLetterContent = async (user: User): Promise<string> => {
  // 1. Safe access to API Key
  const API_KEY = process.env.API_KEY;

  // Template for fallback or reference
  const dateStr = new Date(user.details.joiningDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  const fallbackText = `Dear ${user.details.fullName},

On behalf of the Bhrashtachar Mukt Bharat Mission, it is with immense pleasure and a deep sense of shared purpose that we officially welcome you to our dedicated team. We are delighted to confirm your appointment as ${user.details.designation} in the ${user.details.department} Department, effective from ${dateStr}.

Your decision to join us signifies your commitment to a noble cause – the mission of fighting corruption and tirelessly serving our beloved nation. We believe that every individual has a crucial role to play in building a truly corruption-free India, a nation where integrity and justice prevail. As you embark on this journey with us, we expect you to uphold the highest standards of honesty, unwavering integrity, and profound dedication in all your endeavors. Your work will directly contribute to strengthening the moral fabric of our society and realizing the dreams of a stronger, more just Bharat.

For administrative purposes, your official ID Number is ${user.edNumber}. We are confident that your skills and passion will be instrumental in achieving our collective goals and making a tangible, positive impact.

We eagerly anticipate your valuable contributions and look forward to working alongside you as we strive towards a brighter future for India.

Sincerely,`;

  if (!API_KEY) {
    console.warn("No API Key found. Returning template text.");
    return fallbackText;
  }

  const prompt = `
    You are an HR system for the 'Bhrashtachar Mukt Bharat Mission' (Corruption Free India Mission).
    Generate the *body content only* for an official Appointment/Joining Letter.
    
    User Details:
    Name: ${user.details.fullName}
    Designation: ${user.details.designation}
    Department: ${user.details.department}
    Joining Date: ${dateStr}
    ID Number: ${user.edNumber}
    
    STRICT INSTRUCTIONS:
    1. Do NOT include a Subject line.
    2. Do NOT include the Organization Name/Address header.
    3. Start immediately with the salutation: "Dear ${user.details.fullName},"
    4. Use the following structure and tone (Patriotic, Formal, Inspiring):
       - Paragraph 1: Welcome the member on behalf of the mission. Confirm appointment as [Designation] in [Department], effective [Date].
       - Paragraph 2: Acknowledge their commitment to fighting corruption and serving the nation. Emphasize expectations of honesty, integrity, and dedication.
       - Paragraph 3: State the official ID Number (${user.edNumber}). Express confidence in their skills.
       - Paragraph 4: Closing statement looking forward to working together.
       - Sign-off: "Sincerely," (Do NOT add the name of the signatory, it is pre-printed).
    
    Maintain professional formatting with clear paragraph breaks.
  `;

  // 2. Retry Logic Function
  const generateWithRetry = async (retries = 3) => {
    // Always create a new instance to ensure fresh config/key usage
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    for (let i = 0; i < retries; i++) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          config: {
             temperature: 0.3, // Lower temperature for more consistent/formal output
          }
        });
        return response;
      } catch (error) {
        console.warn(`Attempt ${i + 1} failed:`, error);
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  };

  try {
    const response = await generateWithRetry();
    return response?.text || fallbackText;
  } catch (error: any) {
    console.error("Gemini API Fatal Error:", error);
    // Return fallback text on error instead of error message to ensure user gets a letter
    return fallbackText;
  }
};