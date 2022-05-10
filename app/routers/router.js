const { Router } = require('express');
const router = Router();
const listController = require('../controllers/listController.js');
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
const jwToken = require ('../handlers/jwtToken');


router 
    .post('/signup', routerWrapper(userController.createUser))
    .post('/login', routerWrapper(userController.logUser))
    // .post('/devonly/show', routerWrapper(showController.createShow) )
    // .post('/devonly/createArtist', routerWrapper(showController.createArtist))
    // .post('/devonly/createCharacter', routerWrapper(showController.createCharacter))
    .post('/form/submit', routerWrapper(referenceController.submitRef))
    // .get('/devonly/checkshow', routerWrapper(showController.checkShow))
    // .get('/devonly/checkartist', routerWrapper(listController.checkArtist))
    .get('/listcategory/:params', routerWrapper(listController.getByCategory))
    .get('/listcategory/:params/ref', routerWrapper(referenceController.getByCategory))
    .get('/listartist', routerWrapper(listController.getByArtist))
    .get('/listartist/:params', routerWrapper(referenceController.getByArtist))
    .get('/listcharacter', routerWrapper(listController.getByCharacter))
    .get('/listcharacter/:params', routerWrapper(referenceController.getByCharacter))
    .get('/user/profil/:id', routerWrapper(userController.getUserById))
    .get('/random', routerWrapper(referenceController.getByRandom))
    .get('/admin/dashboard', jwToken, security.check, routerWrapper(adminController.getAdminDashboard))
    //route Put  to validate reference request
    .use(handleError);
    

module.exports = router;
