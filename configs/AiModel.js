const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "write a script to generate 30 seconds video on topic : interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and contentText as field.No Plain text",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `\`\`\`json
                        [
                        {
                            "imagePrompt": "Realistic painting of a bustling medieval marketplace, vibrant colors, people in period clothing bartering goods, a castle in the background",
                            "contentText": "The year is 1347. The Black Death is sweeping across Europe, but in the heart of Florence, life, albeit precarious, continues.  Our story centers on a young apprentice, Giovanni..."
                        },
                        ]
                        \`\`\`
                        `,
        },
      ],
    },
  ],
});
