const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const adminLevelController = require("../controller/admin/adminLevelController");
const adminUserController = require("../controller/admin/adminUserController");
const adminCategoryController = require("../controller/admin/adminCategoryController");
const auth = require('../config/auth');

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/me", auth, userController.getUserDetails);


router.post('/getLevel', auth, adminLevelController.getLevel);
router.post('/addLevel', auth, adminLevelController.addLevel);
router.post('/removeLevel', auth, adminLevelController.removeLevel);
router.post('/changeStatusLevel', auth, adminLevelController.changeStatusLevel);
router.get('/getLevelById/:id', auth, adminLevelController.getLevelById);
router.post('/updateLevelById', auth, adminLevelController.updateLevelById);
router.post('/multipleDeleteLevel', auth, adminLevelController.multipleDeleteLevel);

router.get('/getAllUser', auth, adminUserController.getAllUser);
router.post('/changeStatusUser', auth, adminUserController.changeStatusUser);
router.post('/removeUser', auth, adminUserController.removeUser);
router.post('/multipleDeleteUser', auth, adminUserController.multipleDeleteUser);
router.get('/getUserById/:id', auth, adminUserController.getUserById);
router.post('/updateUser', auth, adminUserController.updateUser);

router.post('/addCategory', auth, adminCategoryController.addCategory);
router.get('/getCategory', auth, adminCategoryController.getCategory);
module.exports = router;