const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true }, // URL or local file path
}, { timestamps: true }); // ✅ Adds createdAt and updatedAt fields

module.exports = mongoose.model("Product", ProductSchema); // ✅ Use singular "Product"
