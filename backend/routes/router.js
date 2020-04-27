const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const adminLevelController = require("../controller/admin/adminLevelController");
const adminUserController = require("../controller/admin/adminUserController");
const adminCategoryController = require("../controller/admin/adminCategoryController");
const adminSubjectController = require("../controller/admin/adminSubjectController");
const adminChapterController = require("../controller/admin/adminChapterController");
const adminQuizController = require("../controller/admin/adminQuizController");
const homeController = require("../controller/client/homeController");
const auth = require('../config/auth');

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/me", auth, userController.getUserDetails);


router.get('/getLevel/:id', auth, adminLevelController.getLevel);
router.post('/addLevel', auth, adminLevelController.addLevel);
router.post('/removeLevel', auth, adminLevelController.removeLevel);
router.post('/changeStatusLevel', auth, adminLevelController.changeStatusLevel);
router.get('/getLevelById/:id', auth, adminLevelController.getLevelById);
router.post('/updateLevelById', auth, adminLevelController.updateLevelById);
router.post('/multipleDeleteLevel', auth, adminLevelController.multipleDeleteLevel);

router.get('/getAllUser/:id', auth, adminUserController.getAllUser);
router.post('/changeStatusUser', auth, adminUserController.changeStatusUser);
router.post('/removeUser', auth, adminUserController.removeUser);
router.post('/multipleDeleteUser', auth, adminUserController.multipleDeleteUser);
router.get('/getUserById/:id', auth, adminUserController.getUserById);
router.post('/updateUser', auth, adminUserController.updateUser);
router.post('/addUser', auth, adminUserController.addUser);

router.post('/addCategory', auth, adminCategoryController.addCategory);
router.get('/getCategory/:id', auth, adminCategoryController.getCategory);
router.post('/changeStatusCatetory', auth, adminCategoryController.changeStatusCatetory);
router.post('/removeCategory', auth, adminCategoryController.removeCategory);
router.post('/multipleCategoryDelete', auth, adminCategoryController.multipleCategoryDelete);
router.get('/getCategoryById/:id', auth, adminCategoryController.getCategoryById);
router.post('/editCategory', auth, adminCategoryController.editCategory);

router.get('/getSubject/:id', auth, adminSubjectController.getSubject);
router.get('/getCategorybySelectedLevel/:id', auth, adminSubjectController.getCategorybySelectedLevel);
router.post('/addSubject', auth, adminSubjectController.addSubject);
router.post('/updateStatusSubject', auth, adminSubjectController.updateStatusSubject);
router.post('/removeSubject', auth, adminSubjectController.removeSubject);
router.get('/getSubjectById/:id', auth, adminSubjectController.getSubjectById);
router.post('/editSubject', auth, adminSubjectController.editSubject);
router.post('/multipleSubjectDelete', auth, adminSubjectController.multipleSubjectDelete);

router.get('/getSubjectbySelectedCategory/:id', auth, adminChapterController.getSubjectbySelectedCategory)
router.post('/addChapter', auth, adminChapterController.addChapter);
router.get('/getChapter/:id', auth, adminChapterController.getChapter);
router.post('/updateStatusChapter', auth, adminChapterController.updateStatusChapter);
router.post('/removeChapter', auth, adminChapterController.removeChapter);
router.post('/multipleChapterDelete', auth, adminChapterController.multipleChapterDelete);
router.get('/getChapterById/:id', auth, adminChapterController.getChapterById);
router.post('/editChapter', auth, adminChapterController.editChapter);

router.get('/getChapterbySelectedSubject/:id', auth ,adminQuizController.getChapterbySelectedSubject);
router.post('/addQuiz', auth, adminQuizController.addQuiz);
router.get('/getQuiz/:id', auth, adminQuizController.getQuiz);
router.get('/getQuizActivated/:id', auth, adminQuizController.getQuizActivated);
router.get('/getQuizDeactivated/:id', auth, adminQuizController.getQuizDeactivated);
router.get('/getQuizUnchecked/:id', auth, adminQuizController.getQuizUnchecked);
router.post('/updateStatusQuiz', auth, adminQuizController.updateStatusQuiz);
router.post('/removeQuiz', auth, adminQuizController.removeQuiz);
router.post('/multipleQuizDelete', auth, adminQuizController.multipleQuizDelete);
router.get('/getQuizById/:id', auth, adminQuizController.getQuizById);
router.get('/checkVerify/:id', auth, adminQuizController.checkVerify);

router.post('/changeName', auth, userController.changeName);
router.post('/changePassword', auth, userController.changePassword);

router.get('/getSearchValue/:id', homeController.getSearchValue);
router.get('/getSearchCategory/:id', homeController.getSearchCategory);
router.get('/getSearchSubject/:id', homeController.getSearchSubject);
router.get('/getSubjects/:id', homeController.getSubjects);
router.get('/getSearchTrakItems/:id', auth, homeController.getSearchTrakItems);
router.get('/updateQuizItem/:id', auth, homeController.updateQuizItem);
router.get('/getTestItem/:id', auth, homeController.getTestItem);


module.exports = router;