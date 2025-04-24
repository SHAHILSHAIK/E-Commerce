const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const route = require('./Router/Route.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// API Routes
app.use('/api', route);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch((error) => {
    console.error("❌ Database Connection Error:", error.message);
  });


app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
