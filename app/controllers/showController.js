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
    
    async getByCategory(req,res,next) {
        const categories = req.params.params;
        console.log(categories);
        const result = await dataMapper.getByCategory(categories);
        res.json(result);
    },

    async getByArtistChar(req,res,next) {
        const categories = req.params.params;
        console.log(categories);
        const result = await dataMapper.getByArtistChar(categories);
        res.json(result);
    }
};

module.exports = controller;