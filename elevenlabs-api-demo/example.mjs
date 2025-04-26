// import dotenv from 'dotenv';
// dotenv.config();


// import { ElevenLabsClient, play } from "elevenlabs";

// const client = new ElevenLabsClient({
//   apiKey: "sk_a55e052e791f8187ee970aeac19099e32c09e9f7291f8062"
// });
// const audio = await client.textToSpeech.convert("JBFqnCBsd6RMkjVDRZzb", {
//   text: "The first move is what sets everything in motion.",
//   model_id: "eleven_multilingual_v2",
//   output_format: "mp3_44100_128",
// });

// await play(audio);

import dotenv from 'dotenv';
dotenv.config();

import { ElevenLabsClient } from "elevenlabs";
import fs from 'fs';
import { buffer } from 'stream/consumers';

const client = new ElevenLabsClient({
  apiKey: "sk_a55e052e791f8187ee970aeac19099e32c09e9f7291f8062"
});

const audioStream = await client.textToSpeech.convert("JBFqnCBsd6RMkjVDRZzb", {
  text: ``,
  model_id: "eleven_multilingual_v2",
  output_format: "mp3_44100_128",
});


// Convert stream to buffer
const audioBuffer = await buffer(audioStream);

// Save to file
fs.writeFileSync('output.mp3', audioBuffer);
console.log('✅ Audio saved as output.mp3 — go play it!');

