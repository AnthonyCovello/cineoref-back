const dataMapper = require('../model/dataMapper.js');
const APIError = require('../handlers/APIError');
const fetch = require("node-fetch");

const jwt = require('jsonwebtoken');

const controller = {

    async getAdminDashboard(req, res, next) {
        const request = await dataMapper.getRequest();
        const profils = await dataMapper.getUsers();
        res.json({request, profils})
    }

};

module.exports = controller;