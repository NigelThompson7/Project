
import bodyParser from "body-parser";
import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import OpenAIApi from "openai";
import 'dotenv/config'

const app = express();
const port = 3000; // Or any port you prefer

app.use(bodyParser.json());
app.use(cors());

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

// mongoose added

mongoose.connect("mongodb+srv://bhatiawaris:6dmMO9dYQn5PRTq3@bcshacks.5q80r3g.mongodb.net/yourDatabaseNameHere?retryWrites=true&w=majority&appName=bcsHacks")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

  // cannot insert users yet for some reason
  async function insert()
  {
    await User.create({
      name: "Lebron",
      email: "lebronjamesthegoat@gmail.com"
    });
  }

  const User = import('./userModel.js').default;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


