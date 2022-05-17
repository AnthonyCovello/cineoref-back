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
        const refId = form.id
        const editRef = await dataMapper.editRef(ref)

        const checkShow = await dataMapper.checkShowExist(form)
        const checkedShow = Object.keys(checkShow)
        if(checkedShow != '0'){
            console.log("Adding Show");
          const createShow = await dataMapper.createShow(form)
          }


          const showId = await dataMapper.checkShowExist(form)
          const show_id = {};
          for(let i = 0; i<showId.length; i++){
              show_id['show_id_'+i] = showId[i];
          }
          const filtered_showId = show_id.show_id_0
          const param_showId = filtered_showId.id
        const editShow = await dataMapper.editShow_id({param_showId, refId})

        

          res.json({editRef})
    },



};

module.exports = controller;