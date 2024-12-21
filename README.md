# Recipe Management System API Documentation

## Ingredients API

### `GET /api/ingredients`
**Description:** Fetch all ingredients from the database.  
**Sample Response:**
```json
[
  {
    "_id": "63fdfc77e7b4f98e7a6b3c4e",
    "name": "sugar",
    "quantity": 500,
    "unit": "grams"
  },
  {
    "_id": "63fdfc88e7b4f98e7a6b3c4f",
    "name": "flour",
    "quantity": 1000,
    "unit": "grams"
  }
]
POST /api/ingredients
Description: Add a new ingredient to the database.
Sample Payload:

json
Copy code
{
  "name": "milk",
  "quantity": 2,
  "unit": "liters"
}
Sample Response:

json
Copy code
{
  "_id": "63fdfc99e7b4f98e7a6b3c50",
  "name": "milk",
  "quantity": 2,
  "unit": "liters"
}
PUT /api/ingredients/:id
Description: Update an existing ingredient by its ID.
Sample Payload:

json
Copy code
{
  "quantity": 3
}
Sample Response:

json
Copy code
{
  "_id": "63fdfc99e7b4f98e7a6b3c50",
  "name": "milk",
  "quantity": 3,
  "unit": "liters"
}
DELETE /api/ingredients/:id
Description: Delete an ingredient by its ID.
Sample Response:

json
Copy code
{
  "message": "Ingredient deleted successfully."
}
Recipes API
GET /api/recipes
Description: Fetch all recipes from the database.
Sample Response:

json
Copy code
[
  {
    "_id": "63fdfd55e7b4f98e7a6b3c51",
    "title": "Chocolate Cake",
    "ingredients": [
      { "name": "sugar", "quantity": 200, "unit": "grams" },
      { "name": "flour", "quantity": 300, "unit": "grams" }
    ],
    "instructions": "Mix all ingredients and bake at 180°C for 30 minutes."
  }
]
POST /api/recipes
Description: Add a new recipe to the database.
Sample Payload:

json
Copy code
{
  "title": "Pancakes",
  "ingredients": [
    { "name": "flour", "quantity": 200, "unit": "grams" },
    { "name": "milk", "quantity": 500, "unit": "ml" }
  ],
  "instructions": "Mix ingredients and cook on a pan for 5 minutes."
}
Sample Response:

json
Copy code
{
  "_id": "63fdfd66e7b4f98e7a6b3c52",
  "title": "Pancakes",
  "ingredients": [
    { "name": "flour", "quantity": 200, "unit": "grams" },
    { "name": "milk", "quantity": 500, "unit": "ml" }
  ],
  "instructions": "Mix ingredients and cook on a pan for 5 minutes."
}
POST /api/recipes/suggest
Description: Suggest recipes based on available ingredients.
Sample Payload:

json
Copy code
{
  "ingredients": ["sugar", "flour"]
}
Sample Response:

json
Copy code
[
  {
    "_id": "63fdfd55e7b4f98e7a6b3c51",
    "title": "Chocolate Cake",
    "ingredients": [
      { "name": "sugar", "quantity": 200, "unit": "grams" },
      { "name": "flour", "quantity": 300, "unit": "grams" }
    ],
    "instructions": "Mix all ingredients and bake at 180°C for 30 minutes."
  }
]
Chatbot API
POST /chat
Description: Extract dish category and required ingredients from user input, and suggest recipes based on availability.
Sample Payload:

json
Copy code
{
  "userMessage": "I want to make a sweet dish with sugar and milk."
}
Sample Response:

json
Copy code
{
  "response": "You can make Chocolate Cake!\nIngredients:\n- sugar: 200 grams\n- milk: 500 ml\nInstructions:\nMix all ingredients and bake at 180°C for 30 minutes."
}
vbnet
Copy code

You can now copy and paste this into your GitHub repository's README file. It includes clear routes, met
