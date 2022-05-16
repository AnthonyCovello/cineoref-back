const dataMapper = require('../model/dataMapper.js');
const APIError = require('../handlers/APIError');
const fetch = require("node-fetch");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = "mange tes morts";

const controller = {

 /**
   * POST a new user to the database
   * @param {req}
   * @param {res}
   */
    async createUser(req,res, next) {
        // User contient email / username / password
        const user = req.body;
        if (!(user.username && user.email && user.birthday && user.password)) {
          res.status(400).send("Tout les champs sont nécessaire");
        }
        const checkUser = await dataMapper.checkUser(user)
        const checkedUser = Object.keys(checkUser)
        if (checkedUser != '0'){
          const result = await dataMapper.createUser(user);
          console.log(result);
          if(!result.rowCount){
            throw new APIError ("Impossible d'enregistrer l'utilisateur en base")
          } 
          const getRole = await dataMapper.getUserByName(user)
          const role = getRole.role
          const jwtToken = jwt.sign(user, secretKey)
            console.log(jwtToken);
          
          const jwtContent = {
            user_id: getRole.id,
            role
          };
          const jwtOptions = { 
             algorithm: 'HS256', 
             expiresIn: '3h' 
            };
          
          
          res.status(200).json({ 
            logged: true, 
            pseudo: user.username,
            user_id: getRole.id,
            role,
            token: jwt.sign(jwtContent, secretKey, jwtOptions),
            message: "Compte créé et connecté"
            
          })
        } else {
          return res.status(409).json({message :"Pseudo déjà existant"})
        }
        
      },

/**
   * Render the login page, passing all compulsory datas
   * @param {req}
   * @param {res}
   */
    async logUser(req,res) {
      const user = req.body;
      const checkResult = await dataMapper.loginUser(user);
      const id = checkResult.id
      const getRole = await dataMapper.getUserById(id)
      const role = getRole.role
      console.log(role);
      if (checkResult) {
      bcrypt.compare(user.password, checkResult.password, function(err, match){
        if (err) {
          throw new APIError ("Impossible d'enregistrer l'utilisateur en base")
        } else if (!match) {
          res.status(401).json({
            message :"Pseudo ou mot de passe incorrect"
          })
        } else if (match) {
        const jwtToken = jwt.sign(user, secretKey);
            console.log(jwtToken);
        const jwtContent = {
          user_id: id,
          role,
        };
        const jwtOptions = { 
          algorithm: 'HS256', 
          expiresIn: '3h' 
        }
      console.log('<< 200', user.username);
      res.json({ 
        logged: true, 
        pseudo: user.username,
        user_id: id,
        role,
        token: jwt.sign(jwtContent, secretKey, jwtOptions),
        })
        }
      
    })
  }
  else {
    res.status(401).json({
      message :"Pseudo ou mot de passe incorrect"
    })
  }
  },

    async getUserById(req,res) {
        const id = req.params.id;
        const user = await dataMapper.getUserById(id);
        const contribution = await dataMapper.getContribById(id)
        res.json({user, contribution});
    },

    async getTopFive(req,res) {
      const result = await dataMapper.getTopFive();
      res.json(result)
    },

    async editProfil(req,res,next){
      const user = req.body
      console.log(user);
      const checkPseudo = await dataMapper.checkUserByName(user)
      console.log(checkPseudo);
      const checkedPseudo = Object.keys(checkPseudo)
      console.log(checkedPseudo);
        if(checkedPseudo !='0'){
        console.log('Updating profil');
        const editProfil = await dataMapper.editProfil(user)
        return res.status(200).json({editProfil, message : "Profile mis a jour"})
      } else {
        return res.status(409).json({message :"Pseudo déjà existant"})        
      }
      

    },




};



module.exports = controller;