const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: false }, // e.g., 3 eggs
  unit: { type: String, required: false },     // e.g., grams, cups
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
