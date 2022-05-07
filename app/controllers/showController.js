const dataMapper = require('../model/dataMapper.js');
const APIError = require('../handlers/APIError');
const fetch = require("node-fetch");

const jwt = require('jsonwebtoken');
const { getByCategory } = require('../model/dataMapper.js');

const controller = {

    async createShow(req,res, next) {
        const show = req.body;
        const result = await dataMapper.createShow(show);
        if(!result.rowCount){
          throw new APIError ("Impossible d'enregistrer en base");
        };
        res.send(result)
    },

    async createArtist(req,res, next) {
        const artist = req.body;
        const result = await dataMapper.createArtist(artist);
        if(!result.rowCount){
          throw new APIError ("Impossible d'enregistrer en base");
        };
        res.send(result)
    },

    async createCharacter(req,res, next) {
        const character = req.body;
        const result = await dataMapper.createCharacter(character);
        if(!result.rowCount){
          throw new APIError ("Impossible d'enregistrer en base");
        };
        res.send(result)
    },

      // ----------- TEST DEV ------------- //

    async checkShow (req,res, next) {
      const ref = req.body;
      const checkShow = await dataMapper.checkShowExist(ref)
      console.log(Object.keys(checkShow));
      const checked = Object.keys(checkShow)
      if(checked != '0'){
        const createShow = await dataMapper.createShow(ref)
        return createShow;
      } 
      console.log(checkShow)
      res.send("Done")
  },
    
    
};

module.exports = controller;