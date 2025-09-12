import "dotenv/config";
import { envs } from "./config/envs";

async function test() {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${envs.openaiApiKey}`,
    },
    body: JSON.stringify({
      model: envs.openaiModel,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Give me a JSON with a summary of a cyber event: malware detected in finance system." }
      ],
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

test().catch(console.error);
