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
          
          const jwtContent = {
            user_id: getRole.id,
            role
          };
          const jwtOptions = { 
            algorithm: 'HS256',
            expiresIn : '3600'
          }
          const token = jwt.sign(jwtContent, secretKey, jwtOptions)
          
          res.status(200).json({ 
            logged: true, 
            pseudo: user.username,
            profile_picture: getRole.profile_picture,
            user_id: getRole.id,
            role,
            token,
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
          const jwtContent = {
            user_id: id,
            role,
          };
          const jwtOptions = { 
            algorithm: 'HS256',
            expiresIn : '3600s'
          }
          const token = jwt.sign(jwtContent, secretKey, jwtOptions)
      console.log('<< 200', user.username);
      res.json({ 
        logged: true, 
        pseudo: user.username,
        profile_picture: checkResult.profile_picture,
        user_id: id,
        role,
        token
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
      if (user.email && user.password) {
        console.log("update email && password");
        const editProfil = await dataMapper.editProfil(user)
      }
      else if (user.email) {
        console.log("update email")
        const editEmail = await dataMapper.editEmail(user)
      } else if (user.password) {
        console.log("update password");
        const editPassword = await dataMapper.editPassword(user)
      }
      return res.status(200).json({ message : "Profile mis a jour"})
      // return res.status(409).json({message :"Pseudo déjà existant"})
    },

    async deleteProfil(req,res,next){
      const id = req.params.id
      const deleteProfil = await dataMapper.deleteProfil(id)
      return res.status(200).json({deleteProfil, message : "Compte supprimé"})
    },




};



module.exports = controller;