const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); 

const ingredientRoutes = require("./routes/ingredients");
const recipeRoutes = require("./routes/recipes");
const chatbotRoutes = require("./routes/chatbot");

const app = express();


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected to the database.");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err.message);
});

console.log(`MONGO_URI: ${process.env.MONGO_URI}`); 

app.use(express.json());
app.use(cors());


app.use("/api/ingredients", ingredientRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/chat", chatbotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
