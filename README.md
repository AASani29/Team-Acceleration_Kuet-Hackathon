<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Documentation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 20px;
    }
    h1, h2 {
      color: #333;
    }
    pre {
      background-color: #f4f4f4;
      padding: 10px;
      border-radius: 5px;
    }
    code {
      color: #d6336c;
    }
    .api-section {
      margin-bottom: 20px;
    }
    .api-section h2 {
      color: #0069d9;
    }
    .api-section ul {
      list-style-type: none;
      padding-left: 0;
    }
    .api-section li {
      padding: 10px 0;
    }
    .api-section .request, .api-section .response {
      background-color: #f7f7f7;
      padding: 10px;
      margin: 5px 0;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <h1>API Documentation</h1>

  <div class="api-section">
    <h2>Ingredients API</h2>
    <ul>
      <li>
        <h3>GET /api/ingredients</h3>
        <p><strong>Description:</strong> Fetch all ingredients from the database.</p>
        <div class="request"><strong>Sample Response:</strong></div>
        <pre>
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
        </pre>
      </li>
      <li>
        <h3>POST /api/ingredients</h3>
        <p><strong>Description:</strong> Add a new ingredient to the database.</p>
        <div class="request"><strong>Sample Payload:</strong></div>
        <pre>
{
  "name": "milk",
  "quantity": 2,
  "unit": "liters"
}
        </pre>
        <div class="response"><strong>Sample Response:</strong></div>
        <pre>
{
  "_id": "63fdfc99e7b4f98e7a6b3c50",
  "name": "milk",
  "quantity": 2,
  "unit": "liters"
}
        </pre>
      </li>
      <li>
        <h3>PUT /api/ingredients/:id</h3>
        <p><strong>Description:</strong> Update an existing ingredient by its ID.</p>
        <div class="request"><strong>Sample Payload:</strong></div>
        <pre>
{
  "quantity": 3
}
        </pre>
        <div class="response"><strong>Sample Response:</strong></div>
        <pre>
{
  "_id": "63fdfc99e7b4f98e7a6b3c50",
  "name": "milk",
  "quantity": 3,
  "unit": "liters"
}
        </pre>
      </li>
      <li>
        <h3>DELETE /api/ingredients/:id</h3>
        <p><strong>Description:</strong> Delete an ingredient by its ID.</p>
        <div class="response"><strong>Sample Response:</strong></div>
        <pre>
{
  "message": "Ingredient deleted successfully."
}
        </pre>
      </li>
    </ul>
  </div>

  <div class="api-section">
    <h2>Recipes API</h2>
    <ul>
      <li>
        <h3>GET /api/recipes</h3>
        <p><strong>Description:</strong> Fetch all recipes from the database.</p>
        <div class="request"><strong>Sample Response:</strong></div>
        <pre>
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
        </pre>
      </li>
      <li>
        <h3>POST /api/recipes</h3>
        <p><strong>Description:</strong> Add a new recipe to the database.</p>
        <div class="request"><strong>Sample Payload:</strong></div>
        <pre>
{
  "title": "Pancakes",
  "ingredients": [
    { "name": "flour", "quantity": 200, "unit": "grams" },
    { "name": "milk", "quantity": 500, "unit": "ml" }
  ],
  "instructions": "Mix ingredients and cook on a pan for 5 minutes."
}
        </pre>
        <div class="response"><strong>Sample Response:</strong></div>
        <pre>
{
  "_id": "63fdfd66e7b4f98e7a6b3c52",
  "title": "Pancakes",
  "ingredients": [
    { "name": "flour", "quantity": 200, "unit": "grams" },
    { "name": "milk", "quantity": 500, "unit": "ml" }
  ],
  "instructions": "Mix ingredients and cook on a pan for 5 minutes."
}
        </pre>
      </li>
      <li>
        <h3>POST /api/recipes/suggest</h3>
        <p><strong>Description:</strong> Suggest recipes based on available ingredients.</p>
        <div class="request"><strong>Sample Payload:</strong></div>
        <pre>
{
  "ingredients": ["sugar", "flour"]
}
        </pre>
        <div class="response"><strong>Sample Response:</strong></div>
        <pre>
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
        </pre>
      </li>
    </ul>
  </div>

  <div class="api-section">
    <h2>Chatbot API</h2>
    <ul>
      <li>
        <h3>POST /chat</h3>
        <p><strong>Description:</strong> Extract dish category and required ingredients from user input, and suggest recipes based on availability.</p>
        <div class="request"><strong>Sample Payload:</strong></div>
        <pre>
{
  "userMessage": "I want to make a sweet dish with sugar and milk."
}
        </pre>
        <div class="response"><strong>Sample Response:</strong></div>
        <pre>
{
  "response": "You can make Chocolate Cake!\nIngredients:\n- sugar: 200 grams\n- milk: 500 ml\nInstructions:\nMix all ingredients and bake at 180°C for 30 minutes."
}
        </pre>
      </li>
    </ul>
  </div>

  <div class="api-section">
    <h2>Contributing</h2>
    <p>Contributions are welcome! Please fork the repository and create a pull request with your changes.</p>
    <ul>
      <li>Fork the repository</li>
      <li>Create your feature branch: <code>git checkout -b feature/YourFeature</code></li>
      <li>Commit your changes: <code>git commit -m "Add some feature"</code></li>
      <li>Push to the branch: <code>git push origin feature/YourFeature</code></li>
      <li>Open a pull request</li>
    </ul>
  </div>

  <div class="api-section">
    <h2>License</h2>
    <p>This project is licensed under the MIT License.</p>
  </div>
</body>
</html>
