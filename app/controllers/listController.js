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
    }
};

module.exports = controller;