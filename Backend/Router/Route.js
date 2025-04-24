const express = require('express');
const router = express.Router();
const { AdminSignUp ,AdminLogin} = require('../Controller/AdminController.js')
const { postData, postBulkData, getProducts, deleteProduct, updateProduct, getProductById } = require('../Controller/ProductsController.js');
const { UserSignUp, UserLogin } = require('../Controller/UserController.js')
const {saveAddress} =require('../Controller/AddressController.js')

// ✅ User Routes

// ✅ Product Routes
router.post('/products', postData); // Create a Product
router.get('/products', getProducts); // Get All Products
router.put('/products/:id', updateProduct); // Update a Product
router.delete('/products/:id', deleteProduct); // Delete a Product
router.get('/products/:id', getProductById)
router.post('/products/bulk', postBulkData);
router.post('/admin/signup', AdminSignUp)
router.post('/admin/login', AdminLogin)
router.post('/user/login', UserLogin)
router.post('/user/signup', UserSignUp)
router.post('/user/address',saveAddress)

module.exports = router;
