const dataMapper = require('../model/dataMapper.js');
const APIError = require('../handlers/APIError');
const fetch = require("node-fetch");

const jwt = require('jsonwebtoken');

const controller = {
    async getByCategory(req,res,next) {
        const categories = req.params.params;
        console.log(categories);
        const result = await dataMapper.getByCategory(categories);
        res.json(result);
    },

    async getByArtist(req,res,next) {
        const categories = req.params.params;
        console.log(categories);
        const result = await dataMapper.getByArtist();
        res.json(result);
    },

    
    async getByCharacter(req,res,next) {
        const categories = req.params.params;
        console.log(categories);
        const result = await dataMapper.getByCharacter();
        res.json(result);
    },

    
    


    // ----------- TEST DEV ------------- //

    async getArtistByName(req,res,next) {
        const name = req.params.name
        const result = await dataMapper.getArtistByName(name);
        res.json(result);
    },
    async getCharacterByName(req,res,next) {
        const name = req.params.name
        const result = await dataMapper.getCharacterByName(name);
        res.json(result);
    },

    async checkArtist (req,res, next) {
        const ref = req.body;
        const checkArtist = await dataMapper.checkArtistExist(ref)
        console.log(Object.keys(checkArtist));
        const checked = Object.keys(checkArtist)
        if(checked != '0'){
            console.log("Adding Artist");
          const createArtist = await dataMapper.createArtist(ref)
          
        } 
        artistId = await dataMapper.checkArtistExist(ref)
        console.log("Just checking you can reach me");
        res.json(artistId)
    },
};

module.exports = controller;