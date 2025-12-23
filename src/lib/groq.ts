import Groq from "groq-sdk";

// Initialize Groq client
function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GROQ_API_KEY environment variable");
  }

  return new Groq({ apiKey });
}

// Niche type
type Niche = "writing" | "video" | "dev" | "none";

// Categorize a post for buying intent and niche
export async function categorizePost(content: string): Promise<{
  hasIntent: boolean;
  niche: Niche;
  isHighSignal: boolean;
}> {
  const groq = getGroqClient();

  const prompt = `Analyze this social media post for buying intent. Determine if the author wants to HIRE someone for:
- Ghostwriting, content writing, newsletter writing, copywriting -> "writing"
- Video editing, video production, YouTube editing, shorts editing -> "video"
- Web development, Webflow, coding, React, frontend, backend -> "dev"

If there's no clear hiring/buying intent, return "none".

Also determine if this is a "high signal" lead - meaning the person has clear budget, timeline, or serious intent.

Post: "${content}"

Respond in JSON format only:
{
  "niche": "writing" | "video" | "dev" | "none",
  "isHighSignal": true | false
}`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.1,
      max_tokens: 100,
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      return { hasIntent: false, niche: "none", isHighSignal: false };
    }

    const parsed = JSON.parse(response);
    const niche = parsed.niche as Niche;

    return {
      hasIntent: niche !== "none",
      niche,
      isHighSignal: parsed.isHighSignal || false,
    };
  } catch (error) {
    console.error("Error categorizing post:", error);
    return { hasIntent: false, niche: "none", isHighSignal: false };
  }
}

// Generate icebreakers for a lead
export async function generateIcebreakers(
  content: string,
  niche: string
): Promise<string[]> {
  const groq = getGroqClient();

  const nicheLabels: Record<string, string> = {
    writing: "ghostwriter/content writer",
    video: "video editor",
    dev: "web developer",
  };

  const nicheLabel = nicheLabels[niche] || "freelancer";

  const prompt = `Act as a world-class ${nicheLabel} salesperson.

Write 3 short, punchy opening DMs for this post. Keep each under 280 characters.
Be casual but professional. Reference something specific from their post.
Don't be too salesy or use clichés. Sound like a real person.

Post: "${content}"

Respond in JSON format only:
{
  "icebreakers": ["message1", "message2", "message3"]
}`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      return ["Hey! Saw your post and would love to help. Let me know if you'd like to chat."];
    }

    const parsed = JSON.parse(response);
    return parsed.icebreakers || [];
  } catch (error) {
    console.error("Error generating icebreakers:", error);
    return ["Hey! Saw your post and would love to help. Let me know if you'd like to chat."];
  }
}

