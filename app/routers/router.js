const { Router } = require('express');
const router = Router();
const categoryController = require('../controllers/categoryController.js');
const userController = require('../controllers/userController.js');
const bookmarksController = require('../controllers/bookmarksController.js');
const referenceController = require('../controllers/referenceController.js');
const adminController = require('../controllers/adminController.js');
const routerWrapper = require("../handlers/routerWrapper");
const handleError = require('../handlers/errorHandler.js');
const security = require("../handlers/security");


router 
    .post('/signup', routerWrapper(userController.createUser))

module.exports = router;
