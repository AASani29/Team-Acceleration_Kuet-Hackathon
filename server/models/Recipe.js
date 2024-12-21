const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ name: String, quantity: Number, unit: String }],
  taste: { type: String, required: false }, // e.g., sweet, spicy
  cuisine: { type: String, required: false },
  preparationTime: { type: Number, required: false }, // minutes
  instructions: { type: String, required: true },
  reviews: { type: Number, default: 0 },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
