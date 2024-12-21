const express = require("express");
const router = express.Router();
const multer = require("multer");
const Tesseract = require("tesseract.js");
const fs = require("fs");
const path = require("path");
const Recipe = require("../models/Recipe");

// Set up file storage for images
const upload = multer({ dest: "uploads/" });

// Path to the combined recipe text file
const recipeFilePath = path.join(__dirname, "../data/my_fav_recipes.txt");

// Helper function to save recipes to the text file
function saveRecipeToFile(recipe) {
  try {
    const formattedRecipe = `
Recipe: ${recipe.title}
Ingredients:
${recipe.ingredients.map((ing) => `- ${ing.name}: ${ing.quantity} ${ing.unit}`).join("\n")}
Instructions:
${recipe.instructions}

`;
    fs.appendFileSync(recipeFilePath, formattedRecipe, "utf8");
  } catch (error) {
    console.error("Error saving recipe to file:", error.message);
  }
}

// Save recipe to MongoDB and the text file
router.post("/", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();

    // Save recipe to the text file
    saveRecipeToFile({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    });

    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Suggest recipes based on available ingredients
router.post("/suggest", async (req, res) => {
  try {
    const availableIngredients = req.body.ingredients;
    const recipes = await Recipe.find({
      "ingredients.name": { $in: availableIngredients },
    });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new recipe via text API
router.post("/text", (req, res) => {
  const { title, ingredients, instructions } = req.body;

  // Validate input
  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ error: "Title, ingredients, and instructions are required." });
  }

  // Save the recipe to the text file
  saveRecipeToFile({ title, ingredients, instructions });
  res.status(200).json({ message: "Recipe saved successfully." });
});

// Add new recipe via image API
router.post("/image", upload.single("image"), async (req, res) => {
  const imagePath = req.file.path;

  try {
    // Perform OCR on the uploaded image
    const { data: { text } } = await Tesseract.recognize(imagePath, "eng");

    // Parse the extracted text into a recipe format (simple parsing example)
    const lines = text.split("\n").map((line) => line.trim()).filter((line) => line);
    const title = lines[0] || "Untitled Recipe";
    const ingredients = lines.slice(1, lines.indexOf("Instructions:") || lines.length).map((item) => {
      const parts = item.split(":");
      return { name: parts[0].trim(), quantity: parts[1]?.trim() || "" };
    });
    const instructions = lines.slice(lines.indexOf("Instructions:") + 1).join(" ");

    // Save recipe to MongoDB
    const recipe = new Recipe({
      title,
      ingredients,
      instructions,
    });
    await recipe.save();

    // Save the recipe to the text file
    saveRecipeToFile({
      title,
      ingredients,
      instructions,
    });

    // Delete the uploaded image file
    fs.unlinkSync(imagePath);

    res.status(200).json({ message: "Recipe saved successfully from image.", recipe });
  } catch (error) {
    console.error("Error processing image:", error.message);
    res.status(500).json({ error: "Failed to process image." });
  }
});

module.exports = router;
