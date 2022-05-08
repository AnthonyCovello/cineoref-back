const client = require('./dbClient.js');

const datamapper = {
    
// ------------- USER ----------

    async createUser(user) {
        console.log(user);
        const query = {
          text: `INSERT INTO "user" (username, email, birthday, password) VALUES($1, $2, $3, $4);`,
          values: [user.username, user.email, user.birthday, user.password]
        };
        const newUser = await client.query(query);
        return newUser;
      },

    async loginUser(user) {
      const query = {
        text: `SELECT username FROM "user" WHERE username = $1 AND password = $2;`,
        values: [user.username, user.password]
      };
      const userInDB = await client.query(query);
      return userInDB;
    },

    async getUserById(id) {
      const user_id = id.substring(1);
      console.log(id);
      const query = {
        text : `SELECT * FROM "user" WHERE id = ${user_id}`
      }
      const result = await client.query(query);
      console.log(result.rows[0]);
      return result.rows[0]
    },
    
    async getUsers() {
      const query = {
        text : `SELECT public.user.id, username, created_at, role.name AS role, grade.name AS grade FROM "user"
        JOIN "grade"
        ON grade.id = public.user.grade_id
        JOIN "role"
        ON role.id = public.user.role_id
        ;`
      }
      const result = await client.query(query);
      console.log(result.rows);
      return result.rows
    },
    
  // --------------- CHARACTER ----------

    async createCharacter(character) {
      const query = {
        text: `INSERT INTO "character" (name) VALUES ($1);`,
        values: [character.character]
       };
       const newCharacter = await client.query(query);
        return newCharacter;
    },

    async getByCharacter() {
      const query = {
        text: `SELECT * 
        FROM character
                         `
      }
    const result = await client.query(query);
    console.log(result.rows);
    return result.rows
  },

  async checkCharacterExist(ref) {
      const name = ref.character
      const query = {
        text: `SELECT id FROM character WHERE name ='` + name + `';`
      };
      const checkCharacter = await client.query(query);
      return checkCharacter.rows;
    }, 

    async checkCharacterListExist(IDs) {
      const characterId = IDs.param_characterId
      const showId = IDs.param_showId
      const query = {
        text: `SELECT id FROM character_list WHERE character_id ='` + characterId + `' AND show_id ='` + showId + `';`
      }
      const checkCharacterListExist = await client.query(query)
      return checkCharacterListExist.rows;
    },
  
    async createJoinCharacterShow(IDs) {
      const query = {
        text : `INSERT INTO character_list (show_id, character_id) 
                   VALUES ($1, $2);`,
        values : [IDs.param_showId, IDs.param_characterId]
      }
      const createJoinCharacterShow = await client.query(query)
      return createJoinCharacterShow
    },

   // --------------- ARTIST ----------

    async createArtist(artist) {
      const query = {
        text: `INSERT INTO "artist" (name) VALUES ($1);`,
        values: [artist.artist]
       };
       const newArtist = await client.query(query);
        return newArtist;
    },

    async getByArtist() {
      const query = {
        text: `SELECT * 
        FROM "artist"
                         `
      }
    const result = await client.query(query);
    return result.rows
  },

  async checkArtistExist(ref) {
      const name = ref.artist
      const query = {
        text: `SELECT id FROM artist WHERE name ='` + name + `';`
      };
      const checkArtist = await client.query(query);
      return checkArtist.rows;
    }, 
  
  async checkArtistListExist(IDs) {
    const artistId = IDs.param_artistId
    const showId = IDs.param_showId
    const query = {
      text: `SELECT id FROM artist_list WHERE artist_id ='` + artistId + `' AND show_id ='` + showId + `';`
    }
    const checkArtistListExist = await client.query(query)
    return checkArtistListExist.rows;
  },

  async createJoinArtistShow(IDs) {
    const query = {
      text : `INSERT INTO artist_list (show_id, artist_id) 
                 VALUES ($1, $2);`,
      values : [IDs.param_showId, IDs.param_artistId]
    }
    const createJoinArtistShow = await client.query(query)
    return createJoinArtistShow
  },
  

    // --------------- SHOW ----------

   async createShow(show) {
      const query = {
        text: `INSERT INTO "show" (name, category) VALUES ($1, $2);`,
        values: [show.title, show.category]
       };
       const newShow = await client.query(query);
        return newShow;
    },

    async checkShowExist(ref) {
      const name = ref.title
      const category = ref.category
      const query = {
        text: `SELECT id FROM show WHERE name ='` + name + `' AND category ='`+ category +`';`
      };
      const checkShow = await client.query(query);
      return checkShow.rows;
    },

    async getByCategory(params) {
        const temp_param = params.substring(1);
        console.log(temp_param);
        const query = {
          text: `SELECT * 
          FROM show
          WHERE show.category ='` + temp_param + `'
                           `
        }
      console.log(query);
      const result = await client.query(query);
      console.log(result.rows);
      return result.rows
    },

  
    // --------------- REFERENCE ----------
    
    async getRequest(){
      const query = {
        text : `SELECT * FROM reference WHERE status = 'false'`
      }
      const result = await client.query(query);
      console.log(result.rows);
      return result.rows
    },

    async createRef(param) {
        console.log(param);
        console.log([param.reference, param.userId, param.param_showId, param.param_artistId, param.param_characterId]);
        const query = {
          text : `INSERT INTO reference (ref, user_id, show_id, artist_id, character_id) 
          VALUES ($1, $2, $3, $4, $5);`,
          values : [param.reference, param.userId, param.param_showId, param.param_artistId, param.param_characterId]          
        }
        const newRef = await client.query(query)
        console.log(newRef.rows);
        return newRef
    },
  





}

module.exports = datamapper;
