
const openai = require("../Config/openAi")
const elevenlabs = require("../Config/Elevenlab")
const AIHistory = require("../Model/Generatemodel")
const fs = require("fs");
const path = require("path");





const generateImage = async (req, res) => {
  const { prompt} = req.body;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: "prompt  are required",
    });
  }

  try {
    const response = await openai.responses.create({
      model: "gpt-4.1",
      input: prompt,
      tools: [{ type: "image_generation" }],
    });


    const imageData = response.output
      .filter((out) => out.type === "image_generation_call")
      .map((out) => out.result);

    if (!imageData.length) {
      return res.status(404).json({
        success: false,
        message: "Failed to generate image",
      });
    }

    const base64Image = imageData[0];


    const saveImage = await AIHistory.create({
  
      type: "image",
      input: prompt,
      outputBase64: base64Image,
    });

    return res.status(201).json({
      success: true,
      message: "Image generated successfully",
      data: saveImage,
    });

  } catch (error) {
    console.error("Image generation error:", error);
    return res.status(500).json({
      success: false,
      message: "Image generation failed",
      error: error.message,
    });
  }
};






const uploadDir = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}











const generateSpeech = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: "Text is required" });
    }

  
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

    const fileName = `tts_${Date.now()}.mp3`;
    const filePath = path.join(uploadDir, fileName);

   
    const mp3 = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: text,
      format: "mp3"
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    return res.json({
      success: true,
      message: "Speech generated successfully",
      file: `/uploads/${fileName}`,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to generate speech",
      error: err.message,
    });
  }
};




const generateVideo = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required"
      });
    }

  
    const response = await fetch(
      "https://fal.run/fal-ai/wan/v2.2-a14b/text-to-video", 
      {
        method: "POST",
        headers: {
          "Authorization": `Key ${process.env.FAL_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
          
          resolution: "720p",        
          aspect_ratio: "16:9",      
          seed: Math.floor(Math.random() * 1000000),
        
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Fal video API error:", data);
      return res.status(response.status).json({
        success: false,
        message: data?.message || "Fal video request failed",
        error: data
      });
    }

 
    const videoUrl = data?.video?.url || null;

    return res.status(200).json({
      success: Boolean(videoUrl),
      videoUrl,
      raw: data
    });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err?.message
    });
  }
};










module.exports = { generateImage,  generateSpeech,  generateVideo, 
}
