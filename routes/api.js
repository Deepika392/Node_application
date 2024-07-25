const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const categoryController = require('./../controllers/categoryController');
const productController = require('./../controllers/productController');
const loginController = require('./../controllers/loginController');
// Define routes

router.post('/user', userController.createUser);
router.get('/user', userController.getUser);
router.delete('/user/:id', userController.deleteUser);
router.put('/user/:id', userController.updateUser);
router.get('/user/:id', userController.getUserById);

router.post('/category', categoryController.createCategory);
router.get('/category', categoryController.getCategory);
router.delete('/category/:id', categoryController.deleteCategory);
router.put('/category/:id', categoryController.updateCategory);
router.get('/category/:id', categoryController.getcategoryById);

router.post('/product', productController.createProduct);
router.get('/product', productController.getProduct);
router.delete('/product/:id', productController.deleteProduct);
router.put('/product/:id', productController.updateProduct);
router.get('/product/:id', productController.getproductById);
router.get('/product/category/:categoryId', productController.getproductByCatId);

router.post('/login', loginController.login);
router.get('/records', categoryController.recordCount);





module.exports = router;