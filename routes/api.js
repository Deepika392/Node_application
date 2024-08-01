const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const categoryController = require('./../controllers/categoryController');
const productController = require('./../controllers/productController');
const loginController = require('./../controllers/loginController');
const roleController = require('./../controllers/roleController');
const permissionController = require('./../controllers/permissionController');
const moduleController = require('./../controllers/moduleController');
const masterRouteController = require('./../controllers/masterRouteController');

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

router.post('/role', roleController.createRole);
router.get('/role', roleController.getRole);
router.get('/role/:id', roleController.getRoleById);
router.put('/role/:id', roleController.updateRole);

router.post('/permission', permissionController.createPermission);
router.get('/permission', permissionController.getPermission);
router.post('/permissionByRole', permissionController.getPermissionByRole);
router.delete('/permission/:id', permissionController.deletePermission);
router.get('/permission/:id', permissionController.getPermissionById);
router.put('/permission/:id', permissionController.updatePermission);
router.post('/checkModulePermission', permissionController.checkModulePermission);
router.post('/checkDashboardPermission', permissionController.checkDashboardPermission);


router.get('/module', moduleController.getModule);

router.get('/route',masterRouteController.getRoutes);



module.exports = router;