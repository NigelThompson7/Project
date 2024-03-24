import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import OpenAIApi from "openai";

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAIApi({
  api_key: process.env.OPENAI_API_KEY,
});

app.post("/processInput", async (req, res) => {
  const userInput = req.body.input;
  const promptAddition =
    ": give me 10 different options/tips that can help lead me to this goal and send it back with each habit seperated with a \n and a number";
  let concatenatedWord = userInput.concat(promptAddition);

  // Send user input to OpenAI's API for processing
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: concatenatedWord }],
    model: "gpt-3.5-turbo",
  });

  const habitsText = completion.choices[0].message.content;
  // Split the text into individual habit items using the delimiter "\n\n"
  const habitItems = habitsText.split("\n");

  // Create an array to store the parsed habits
  const habits = [];
  habitItems.forEach((item, index) => {
    habits.push({
      description: item.trim(), // Remove leading/trailing whitespace
    });
  });

  const processedOutput = habits;
  res.json({ output: processedOutput });
});

app.post("/processInput/habits", async (req, res) => {
  const selectedHabits = req.body.input;
  const combinedString = selectedHabits.join(', ');


  const firstLaw = "Make it obvious, ";
  const secondLaw = "Make it attractive ";
  const thirdLaw = "Make it easy ";
  const fourthLaw = "Make it satisfying ";
  

  const createGoodHabit = "For each one of these habits:" + combinedString + "can you, can you make them better by including these principles and send it back with each habit seperated with only a single \n ever and a number: "

  let concatenatedWord = createGoodHabit + firstLaw + secondLaw + thirdLaw + fourthLaw;

  // Send user input to OpenAI's API for processing
  const completion2 = await openai.chat.completions.create({
    messages: [{ role: "user", content: concatenatedWord }],
    model: "gpt-3.5-turbo",
  });

  const habitsMoreDetail = completion2.choices[0].message.content;
  // Split the text into individual habit items using the delimiter "\n\n"
  const habitMoreDetailItems = habitsMoreDetail.split("\n");

  // Create an array to store the parsed habits
  const habitsEdited = [];
  habitMoreDetailItems.forEach((item, index) => {
    habitsEdited.push({
      description: item.trim(), // Remove leading/trailing whitespace
    });
  });

  // Example usage:
  const processedOutput = habitsEdited;

  // Send back the processed output to the client
  res.json({ output: processedOutput });
});

// mongoose added

mongoose
  .connect(
    "mongodb+srv://bhatiawaris:6dmMO9dYQn5PRTq3@bcshacks.5q80r3g.mongodb.net/yourDatabaseNameHere?retryWrites=true&w=majority&appName=bcsHacks"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// cannot insert users yet for some reason
async function insert() {
  await User.create({
    name: "Lebron",
    email: "lebronjamesthegoat@gmail.com",
  });
}

const User = import("./userModel.js").default;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
