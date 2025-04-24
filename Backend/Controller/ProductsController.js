const Product = require('../Model/Product'); // ✅ Use correct model name

// Create a New Product
const postData = async (req, res) => {
    try {
        const { name, description, price, category, image } = req.body;

        // Check if a product with the same name already exists
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ message: "Product already exists!" });
        }

        // Create a new product
        const newProduct = new Product({ name, description, price, category, image });

        await newProduct.save();

        res.status(201).json({ message: "Product created successfully!", product: newProduct });
        console.log("✅ Product Added!");
    } catch (error) {
        res.status(500).json({ message: "Error saving product", error: error.message });
        console.error("❌ Error:", error.message);
    }
};

const postBulkData = async (req, res) => {
    try {
        const products = req.body;

        // Check if the request contains an array
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Invalid input, expected an array of products." });
        }

        // Insert multiple products at once
        const newProducts = await Product.insertMany(products);

        res.status(201).json({ message: "Bulk products added successfully!", products: newProducts });
        console.log("✅ Bulk Products Added!");
    } catch (error) {
        res.status(500).json({ message: "Error saving products", error: error.message });
        console.error("❌ Error:", error.message);
    }
};


// Get All Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

// Delete a Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};



// Update a Product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

// Get Single Product
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};


// Export Correct Function Names
module.exports = { postData,postBulkData, getProducts, deleteProduct, updateProduct,getProductById };
