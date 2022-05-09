const dataMapper = require('../model/dataMapper.js');
const APIError = require('../handlers/APIError');
const fetch = require("node-fetch");

const jwt = require('jsonwebtoken');
const secretKey = "clef pour déchiffrer le message";
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
        const result = await dataMapper.createUser(user);
        if(!result.rowCount){
          throw new APIError ("Impossible d'enregistrer l'utilisateur en base");
        };
        res.redirect("/")
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
      const data = jwt.sign(user, secretKey);
      console.log(data);
      // const result = await fetch("https://cinoref-api.herokuapp.com/login/secure",{
      //   method:"POST",
      //   body:JSON.stringify({data}),
      //   headers: {'Content-Type': 'application/json'}
      // });
      const decoded = jwt.verify(data, secretKey);
      console.log(decoded);
      if(!result.rowCount){
        throw new APIError ("Les credentials sont erronés.");
      };
      req.session.user = result.rows[0];
            console.log("session",req.session.user)
      res.json('Logged in');
    },

    async getUserById(req,res) {
        const id = req.params.id;
        const result = await datamapper.getUserById(id);
        res.json(result);
    },






};



module.exports = controller;