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
    .post('/form/submit', jwToken, routerWrapper(referenceController.submitRef))
    // .get('/devonly/checkshow', routerWrapper(showController.checkShow))
    // .get('/devonly/checkartist', routerWrapper(listController.checkArtist))
    .get('/listcategory/:params', routerWrapper(listController.getByCategory))
    .get('/listcategory/:params/:id/ref', routerWrapper(referenceController.getByCategory))
    .get('/listartist', routerWrapper(listController.getByArtist))
    .get('/listartist/:id/ref', routerWrapper(referenceController.getByArtist))
    .get('/listcharacter', routerWrapper(listController.getByCharacter))
    .get('/listcharacter/:id/ref', routerWrapper(referenceController.getByCharacter))
    .get('/ref/:id', routerWrapper(referenceController.getById))
    .delete('/ref/:id', jwToken, security.check, routerWrapper(referenceController.deleteById)) //jwToken, security.check,
    .get('/mostrecent', routerWrapper(referenceController.getByRecent))
    .get('/usertopfive', routerWrapper(userController.getTopFive))
    .get('/search/:params', routerWrapper(referenceController.getBySearchBar))
    .get('/user/profil/:id', routerWrapper(userController.getUserById))
    .patch('/user/edit/', jwToken, routerWrapper(userController.editProfil))
    .delete('/user/delete/:id', jwToken, routerWrapper(userController.deleteProfil))
    .get('/random', routerWrapper(referenceController.getByRandom))
    .get('/admin/dashboard', jwToken, security.check, routerWrapper(adminController.getAdminDashboard)) //jwToken, security.check,
    .patch('/admin/dashboard/validating/:id', jwToken, security.check, routerWrapper(adminController.validateRequest)) //jwToken, security.check,
    .get('/admin/dashboard/editing/:id', jwToken, security.check, routerWrapper(adminController.getEditForm)) //jwToken, security.check,
    .patch('/admin/dashboard/editing/:id', jwToken, security.check, routerWrapper(adminController.editFormRef))
    //route Put  to validate reference request
    .use(handleError);
    

module.exports = router;
