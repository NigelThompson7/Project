
import bodyParser from "body-parser";
import 'dotenv/config'
import express from 'express';


import OpenAIApi from "openai";
import 'dotenv/config'

const app = express();
app.use(bodyParser.json());

const openai = new OpenAIApi({
  api_key: process.env.OPENAI_API_KEY // Load API key from environment variable
});

app.post('/processInput', async (req, res) => {
  const userInput = req.body.input;
  const promptAddition = ": give me 10 different options/tips that can help lead me to this goal";
  let concatenatedWord = userInput.concat(promptAddition);

  // Send user input to OpenAI's API for processing
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: concatenatedWord }],
    model: "gpt-3.5-turbo",
  });

  // Extract the processed output from the response
  const processedOutput = completion.choices[0].message.content;

  // Send back the processed output to the client
  res.json({ output: processedOutput });
});

const port = 3000; // Or any port you prefer
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


