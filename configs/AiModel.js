// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-1.5-pro';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `  write a script to generate 30 seconds video on topic : interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and contentText as field.No Plain text
`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `\`\`\`json
[
  {
    "imagePrompt": "Realistic painting of a bustling marketplace in ancient Rome, with vendors selling various goods and people in togas interacting.",
    "contentText": "In 79 AD, life in Pompeii bustled. Markets overflowed, gladiators trained, and Mount Vesuvius loomed silently." ,
    "duration": 5 
  },
  {
    "imagePrompt": "Realistic depiction of Mount Vesuvius erupting violently, with ash and smoke filling the sky.",
    "contentText": "No one suspected the sleeping giant. Then, Vesuvius awoke with fury, unleashing a catastrophic eruption.",
    "duration": 5
  },
  {
    "imagePrompt": "Realistic image of people in Pompeii fleeing in terror, with ash raining down and buildings crumbling.",
    "contentText": "Panic gripped Pompeii. Citizens scrambled, desperate to escape the volcanic wrath.",
    "duration": 5
  },
  {
    "imagePrompt": "Realistic portrayal of Pompeii buried under a thick layer of ash and volcanic debris, with only the tops of some buildings visible.",
    "contentText": "In hours, Pompeii vanished, buried under a blanket of ash.  A city frozen in time.",
    "duration": 5
  },
  {
    "imagePrompt": "Realistic painting of archaeologists excavating Pompeii, uncovering preserved bodies and artifacts.",
    "contentText": "Centuries passed. Then, rediscovered, Pompeii offers a haunting glimpse into a lost world.",
    "duration": 5
  },
    {
    "imagePrompt": "Realistic image of a plaster cast of a body from Pompeii, showing the victim's final pose.",
    "contentText": "The tragedy preserved, a stark reminder of Vesuvius's power, and the lives it claimed.",
    "duration": 5
  }
]

\`\`\` 

**Explanation and considerations for creating the video:**

* **Software:** You'll need video editing software that supports image sequences and adding text overlays (e.g., DaVinci Resolve, Adobe Premiere Pro, Final Cut Pro, or even some free options like OpenShot).
* **AI Image Generation:** Use an AI art generator (Midjourney, Stable Diffusion, DALL-E 2, etc.) to create realistic images based on the prompts. Ensure a consistent style for the images.
* **Timing:** Each scene is roughly 5 seconds long to fit within the 30-second time limit. Adjust durations as needed based on your content.
* **Music/Sound Effects:** Consider adding background music and sound effects (e.g., rumbling volcano, screams, wind) to enhance the video's impact.
* **Transitions:** Use smooth transitions between scenes (e.g., fades, cross-dissolves).
* **Text Overlay:** Display the \`contentText\` as a subtitle or on-screen text during each scene. Make sure it's legible and timed appropriately.

**Steps to Create the Video:**

1. **Generate Images:** Create the images using the AI prompts.
2. **Import into Editor:** Import the images into your video editing software.
3. **Arrange and Time:** Place the images in the correct order on the timeline, setting each scene's duration to approximately 5 seconds.
4. **Add Text Overlays:** Add the \`contentText\` for each scene as text overlays.  Style and position the text appropriately.
5. **Add Audio:** (Optional) Import and add background music and sound effects.
6. **Add Transitions:** Add transitions between scenes for a smooth flow.
7. **Export:** Export the final video in your desired format (e.g., MP4).


This detailed JSON structure and the step-by-step guide will help you generate your 30-second video effectively.  Remember to choose music and visuals that evoke the appropriate mood and maintain a consistent style.  Good luck! 
`,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();
