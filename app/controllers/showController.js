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
    
    async getByCategory(req,res,next) {
        const categories = req.params.params;
        console.log(categories);
        const result = await dataMapper.getByCategory(categories);
        res.json(result);
    }

};

module.exports = controller;