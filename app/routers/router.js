const { Router } = require('express');
const router = Router();
const categoryController = require('../controllers/categoryController.js');
const userController = require('../controllers/userController.js');
const bookmarksController = require('../controllers/bookmarksController.js');
const referenceController = require('../controllers/referenceController.js');
const adminController = require('../controllers/adminController.js');
const showController = require('../controllers/showController');
const routerWrapper = require("../handlers/routerWrapper");
const handleError = require('../handlers/errorHandler.js');
const security = require("../handlers/security");
const jwt = require('jsonwebtoken');
const secretKey = "clef pour déchiffrer le message";

router 
    .post('/signup', routerWrapper(userController.createUser))
    .post('/login', routerWrapper(userController.logUser))
    .post('/show', routerWrapper(showController.createShow) )
    .post('/devonly/createArtist', routerWrapper(showController.createArtist))
    .post('/devonly/createCharacter', routerWrapper(showController.createCharacter))
    .get('/listcategory/:params', routerWrapper(showController.getByCategory))
    .get('/listpeople/:params', routerWrapper(showController.getByArtistChar))
    .use(handleError);
    

module.exports = router;
