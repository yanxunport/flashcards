import express from "express";
import OpenAI from "openai";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,

      baseURL: "https://openrouter.ai/api/v1",
    });

    const { notes } = req.body;

    const completion =
      await client.chat.completions.create({
        model: "openrouter/auto",

        messages: [
          {
            role: "system",
            content:
                "Return ONLY a valid JSON array using double quotes. No markdown, no explanations, no extra text. Format exactly like: [{\"question\":\"\",\"answer\":\"\"}]",
          },

          {
            role: "user",
            content: notes,
          },
        ],
      });

    const response =
      completion.choices[0].message.content;

    res.json({
      result: response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;