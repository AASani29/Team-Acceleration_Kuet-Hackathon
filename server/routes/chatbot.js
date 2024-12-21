const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const Groq = require("groq-sdk");
const Ingredient = require("../models/Ingredient");
const Recipe = require("../models/Recipe");

dotenv.config();


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {
  const { userMessage } = req.body;

  if (!userMessage || userMessage.trim() === "") {
    return res.status(400).json({ error: "User message cannot be empty" });
  }

  try {
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
          You are a helpful assistant named Alif. Your task is to extract the type of dish (e.g., sweet, savory) and the key ingredients needed for the dish based on the user's message.
          Respond with only the category and the ingredients in JSON format, like this:
          {
            "category": "sweet",
            "ingredients": ["sugar", "milk", "butter"]
          }
          `,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 256,
    });

    const llmResponse = JSON.parse(chatCompletion.choices[0]?.message?.content || "{}");

    const { category, ingredients: requiredIngredients } = llmResponse;

    if (!category || !requiredIngredients) {
      return res.status(400).json({ error: "Could not extract dish category or ingredients from the message." });
    }

    
    const availableIngredients = await Ingredient.find({
      name: { $in: requiredIngredients },
    });

    const missingIngredients = requiredIngredients.filter(
      (ingredient) =>
        !availableIngredients.some((available) => available.name === ingredient)
    );

    if (missingIngredients.length > 0) {
      return res.json({
        response: `Sorry, you don't have enough ingredients to make a ${category} dish. Missing ingredients: ${missingIngredients.join(", ")}.`,
      });
    }

    
    const matchingRecipes = await Recipe.find({
      "ingredients.name": { $in: requiredIngredients },
      category: category,
    });

    if (matchingRecipes.length === 0) {
      return res.json({
        response: `No recipes found for a ${category} dish using the available ingredients.`,
      });
    }

    
    const selectedRecipe = matchingRecipes[0]; 
    const formattedRecipe = `
You can make ${selectedRecipe.title}!
Ingredients:
${selectedRecipe.ingredients.map((ing) => `- ${ing.name}: ${ing.quantity} ${ing.unit}`).join("\n")}
Instructions:
${selectedRecipe.instructions}
    `;

    res.json({ response: formattedRecipe });
  } catch (error) {
    console.error("Error processing the request:", error.message);
    res.status(500).json({ error: "Failed to process your request." });
  }
});

module.exports = router;
