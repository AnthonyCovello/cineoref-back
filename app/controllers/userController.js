const dataMapper = require('../model/dataMapper.js');
const APIError = require('../handlers/APIError');
const fetch = require("node-fetch");

const jwt = require('jsonwebtoken');

const controller = {


    async createUser(req,res, next) {
        // User contient email / username / password
        const user = req.body;
        const result = await dataMapper.createUser(user);
        if(!result.rowCount){
          throw new APIError ("Impossible d'enregistrer l'utilisateur en base");
        };
        res.redirect("/")
      },

};

module.exports = controller;