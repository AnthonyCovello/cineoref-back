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
        const refId = req.params.id
        const editRef = await dataMapper.editRef({ref, refId})

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
          console.log(refId);
        const editShow = await dataMapper.editShow_id({param_showId, refId})



      const checkCharacter = await dataMapper.checkCharacterExist(form)
      const checkedCharacter = Object.keys(checkCharacter)
      if(checkedCharacter != '0'){
          console.log("Adding Character");
        const createArtist = await dataMapper.createCharacter(form)
      }

      const characterId = await dataMapper.checkCharacterExist(form)
      const character_id = {};
      for(let i = 0; i<characterId.length; i++){
          character_id['character_id_'+i] = characterId[i];
        }
        const filtered_characterId = character_id.character_id_0
        const param_characterId = filtered_characterId.id
     const editCharacter = await dataMapper.editCharacter({param_characterId, refId})


     const checkArtist = await dataMapper.checkArtistExist(form)
     const checkedArtist = Object.keys(checkArtist)
     if(checkedArtist != '0'){
         console.log("Adding Artist");
       const createArtist = await dataMapper.createArtist(form)
     } 

     const artistId = await dataMapper.checkArtistExist(form)
              const artist_id = {};
              for(let i = 0; i<artistId.length; i++){
                  artist_id['artist_id_'+i] = artistId[i];
              }
              const filtered_artistId = artist_id.artist_id_0
              const param_artistId = filtered_artistId.id
     const editArtist = await dataMapper.editArtist({refId, param_artistId})




          res.json({message : "Référence mis a jour !"})
    },



};

module.exports = controller;