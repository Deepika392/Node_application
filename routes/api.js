const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const authenticateToken = require('./../middleware/is-auth'); 
const userController = require('./../controllers/userController');
const categoryController = require('./../controllers/categoryController');
const productController = require('./../controllers/productController');
const loginController = require('./../controllers/loginController');
const roleController = require('./../controllers/roleController');
const permissionController = require('./../controllers/permissionController');
const moduleController = require('./../controllers/moduleController');
const masterRouteController = require('./../controllers/masterRouteController');
const tokenController = require('./../controllers/tokenController');

dotenv.config();

router.post('/user', authenticateToken,userController.createUser);
router.get('/user',  authenticateToken, userController.getUser);
router.delete('/user/:id', authenticateToken, userController.deleteUser);
router.put('/user/:id', authenticateToken,userController.updateUser);
router.get('/user/:id', authenticateToken,userController.getUserById);
router.get('/user/role/:roleId', authenticateToken,userController.getUseByRole);


router.post('/category', authenticateToken,categoryController.createCategory);
router.get('/category', authenticateToken,categoryController.getCategory);
router.delete('/category/:id', authenticateToken,categoryController.deleteCategory);
router.put('/category/:id', authenticateToken,categoryController.updateCategory);
router.get('/category/:id',authenticateToken, categoryController.getcategoryById);

router.post('/product', authenticateToken, productController.createProduct);
router.get('/product',authenticateToken,  productController.getProduct);
router.delete('/product/:id', authenticateToken, productController.deleteProduct);
router.put('/product/:id',authenticateToken,  productController.updateProduct);
router.get('/product/:id', authenticateToken, productController.getproductById);
router.get('/product/category/:categoryId', authenticateToken, productController.getproductByCatId);

router.post('/login', loginController.login);
router.post('/refresh-token', loginController.refreshToken);
router.get('/records', authenticateToken,categoryController.recordCount);

router.post('/role',authenticateToken, roleController.createRole);
router.get('/role', authenticateToken,roleController.getRole);
router.get('/role/:id', authenticateToken,roleController.getRoleById);
router.put('/role/:id', authenticateToken,roleController.updateRole);
router.delete('/role/:id', authenticateToken,roleController.deleteRole);


router.post('/permission', authenticateToken,permissionController.createPermission);
router.get('/permission', authenticateToken,permissionController.getPermission);
router.post('/permissionByRole',permissionController.getPermissionByRole);
router.delete('/permission/:id', authenticateToken,permissionController.deletePermission);
router.get('/permission/:id',authenticateToken, permissionController.getPermissionById);
router.put('/permission/:id', authenticateToken,permissionController.updatePermission);
router.get('/permission/role/:roleId', authenticateToken,permissionController.getPermissionByRoleId);


router.post('/checkModulePermission', permissionController.checkModulePermission);
router.post('/checkDashboardPermission', permissionController.checkDashboardPermission);

router.get('/module', authenticateToken,moduleController.getModule);

router.get('/route',authenticateToken,masterRouteController.getRoutes);



module.exports = router;