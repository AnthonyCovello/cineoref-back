const dataMapper = require('../model/dataMapper.js');
const APIError = require('../handlers/APIError');
const fetch = require("node-fetch");

const jwt = require('jsonwebtoken');

const controller = {

    async getAdminDashboard(req, res, next) {
        const request = await dataMapper.getRequest();
        const profils = await dataMapper.getUsers();
        res.json({request, profils})
    },

    async validateRequest(req,res,next){
        const id = req.params.id
        const validate = await dataMapper.validateRequest(id)
        res.status(200).json({validate, message: "Requête validée."})
    },

    async getEditForm(req,res,next) {
        const id = req.params.id
        const form = await dataMapper.getEditForm(id)
        res.json(form)
    },

    async editFormRef(req,res,next){
        const form = req.body
        console.log(form);
        const ref = form.ref
        const editRef = zae
    },



};

module.exports = controller;