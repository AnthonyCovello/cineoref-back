const dataMapper = require('../model/dataMapper.js');
const APIError = require('../handlers/APIError');
const fetch = require("node-fetch");
const jwt = require('jsonwebtoken');

const secretKey = "mange tes morts";
const datamapper = require('../model/dataMapper.js');

const controller = {

 /**
   * POST a new user to the database
   * @param {req}
   * @param {res}
   * @returns {HTML Redirection}
   */
    async createUser(req,res, next) {
        // User contient email / username / password
        const user = req.body;
        
       
        const checkUser = await dataMapper.checkUser(user)
            const checkedUser = Object.keys(checkUser)
            if (checkedUser != '0'){
              next()
            } else {
              return res.status(409).send("Pseudo déjà existant")
            }
        const result = await dataMapper.createUser(user);
        if (!(user.username && user.email && user.birthday && user.password)) {
          res.status(400).send("Tout les champs sont nécessaire");
        }
        if(!result.rowCount){
          throw new APIError ("Impossible d'enregistrer l'utilisateur en base")
        } 


          const jwtToken = jwt.sign(user, secretKey)
          console.log(jwtToken);
        
        const jwtContent = {user_id: user.id};
        const jwtOptions = { 
           algorithm: 'HS256', 
           expiresIn: '3h' 
          };
        
        
        res.json({ 
          logged: true, 
          pseudo: user.username,
          token: jwt.sign(jwtContent, secretKey, jwtOptions),
          
        })
        
      },

/**
   * Render the login page, passing all compulsory datas
   * @param {req}
   * @param {res}
   */
    async logUser(req,res) {
      const user = req.body;
      const result = await dataMapper.loginUser(user);
    
      // je prépare mon envoi
      const jwtToken = jwt.sign(user, secretKey);
        console.log(jwtToken);
      const checkedResult = Object.keys(result)
      console.log(checkedResult);
        if (checkedResult != '0') {
          res.sendStatus(401);
        } else {
          const jwtContent = {user_id: user.id};
          const jwtOptions = { 
            algorithm: 'HS256', 
            expiresIn: '3h' 
          };
        console.log('<< 200', user.username);
        res.json({ 
          logged: true, 
          pseudo: user.username,
          token: jwt.sign(jwtContent, secretKey, jwtOptions),
          
        })
      }
    },

    async getUserById(req,res) {
        const id = req.params.id;
        const result = await datamapper.getUserById(id);
        res.json(result);
    },






};



module.exports = controller;