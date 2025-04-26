// server.js
const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require('cors');
const { buffer } = require('stream/consumers');
const { ElevenLabsClient } = require('elevenlabs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVEN_LABS_API_KEY
});

app.post('/tts', async (req, res) => {
  try {
    const { text } = req.body;

    const audioStream = await client.textToSpeech.convert("JBFqnCBsd6RMkjVDRZzb", {
      text,
      model_id: "eleven_multilingual_v2",
      output_format: "mp3_44100_128",
    });

    const audioBuffer = await buffer(audioStream);

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.length,
    });

    res.send(audioBuffer);
  } catch (err) {
    console.error("TTS Error:", err);
    res.status(500).send("TTS generation failed.");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
