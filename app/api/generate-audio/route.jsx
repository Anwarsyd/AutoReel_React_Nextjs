import textToSpeech from "@google-cloud/text-to-speech"
import { NextResponse } from "next/server";
import { Result } from "postcss";
// Import other required libraries
const fs = require('fs');
const util = require('util');

const client = new textToSpeech.TextToSpeechClient({
    apiKey:process.env.NEXT_GOOGLE_AUDIO_API_KEY
});

export async function POST(req) {
    const {text,id} = await req.json();

//request    
    const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    // voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'}, // FemaleVoice and english language
    voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

//convert into mp3 file
  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');

  return NextResponse.json({Result:"Success"});
}