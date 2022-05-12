const client = require('./dbClient.js');
const bcrypt = require('bcryptjs');
const stringSimilarity = require("string-similarity");
const datamapper = {
    
// ------------- USER ----------

    async createUser(user) {
        const encrypt = bcrypt.hash(user.password,10).then((hash) => {
          return postUser = {
            username : user.username,
            email : user.email,
            birthday : user.birthday,
            password : hash
          }
        })
        console.log(postUser);
       const query = {
          text: `INSERT INTO "user" (username, email, birthday, password) VALUES($1, $2, $3, $4);`,
          values: [postUser.username, postUser.email, postUser.birthday, postUser.password]
        };
        const newUser = await client.query(query);
        return newUser;
      },

    async loginUser(user) {
      // const encrypt = bcrypt.hash(user.password,10)
      const username = user.username
      
      const query = {
        text: `SELECT id, username, password FROM "user" WHERE username ='`+ username +`';`
      };
      const userInDB = await client.query(query);
      console.log(userInDB.rows);
      return userInDB.rows[0];
    },

    async getUserById(id) {
      console.log(id);
      const query = {
        text : `SELECT public.user.username, public.user.email, public.user.birthday, role.name AS role, grade.name AS grade, public.user.profile_picture 
        FROM "user" 
        JOIN role
        ON public.user.role_id = role.id
        JOIN grade
        ON public.user.grade_id = grade.id
        WHERE public.user.id = ${id}`
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

    async checkUser(user) {
      const username = user.username
      const email = user.email
      const query = {
        text: `SELECT id FROM "user" WHERE username ='` + username + `';`
      };
      const checkUser = await client.query(query);
      return checkUser.rows;
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
        ORDER BY character.name`
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
        ORDER BY artist.name`
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
        const temp_param = params
        console.log(temp_param);
        const query = {
          text: `SELECT * 
          FROM show
          WHERE show.category ='` + temp_param + `'
          ORDER BY show.name`
        }
      console.log(query);
      const result = await client.query(query);
      console.log(result.rows);
      return result.rows
    },

  
    // --------------- REFERENCE ----------
    
    async getRequest(){
      const query = {
        text : `SELECT reference.ref, show.name AS show, public.character.name AS character, artist.name AS artist, public.user.username AS user
        FROM public.reference
        JOIN public.show
        on reference.show_id = show.id
        JOIN public.artist
        on reference.artist_id = artist.id
        JOIN public.character
        on reference.character_id = public.character.id
		    JOIN public.user
		    on reference.user_id = public.user.id
		    WHERE status = 'false'`
      }
      const result = await client.query(query);
      console.log(result.rows);
      return result.rows
    },

    async createRef(param) {
        console.log([param.reference, param.userId, param.param_showId, param.param_artistId, param.param_characterId]);
        const query = {
          text : `INSERT INTO reference (ref, user_id, show_id, artist_id, character_id) 
          VALUES ($1, $2, $3, $4, $5);`,
          values : [param.reference, param.userId, param.param_showId, param.param_artistId, param.param_characterId]          
        }
        const newRef = await client.query(query)
        return newRef
    },


   async getRefByCategory(param) {
    temp_param = param
    console.log(temp_param);
      const query = {
        text : `SELECT reference.ref, show.name AS show, public.character.name AS character, artist.name AS artist, public.user.username AS user
        FROM public.reference
        JOIN public.show
        on reference.show_id = show.id
        JOIN public.artist
        on reference.artist_id = artist.id
        JOIN public.character
        on reference.character_id = public.character.id
        JOIN public.user
		    on reference.user_id = public.user.id
        WHERE show.category ='` + temp_param + `'
        AND status = 'true';`
      }
      const result = await client.query(query);
     return result.rows
   },
  
   async getRefByArtist(param) {
     
    const temp_param = param
    const query = {
      text : `SELECT reference.ref, show.name AS show, public.character.name AS character, artist.name AS artist, public.user.username AS user
      FROM public.reference
      JOIN public.show
      on reference.show_id = show.id
      JOIN public.artist
      on reference.artist_id = artist.id
      JOIN public.character
      on reference.character_id = public.character.id
      JOIN public.user
		on reference.user_id = public.user.id
      WHERE artist.name ='` + temp_param + `'
      AND status = 'true';`
    }
    const result = await client.query(query);
   return result.rows
 },

 async getRefByCharacter(param) {
    
  const temp_param = param
  console.log(temp_param);
  const query = {
    text : `SELECT reference.ref, show.name AS show, public.character.name AS character, artist.name AS artist, public.user.username AS user
    FROM public.reference
    JOIN public.show
    on reference.show_id = show.id
    JOIN public.artist
    on reference.artist_id = artist.id
    JOIN public.character
    on reference.character_id = public.character.id
    JOIN public.user
		on reference.user_id = public.user.id
    WHERE character.name ='` + temp_param + `'
    AND status = 'true';`
  }
  const result = await client.query(query);
 return result.rows
},

async getRefByRandom(){
  const query = {
    text : `SELECT reference.ref, show.name AS show, public.character.name AS character, artist.name AS artist, public.user.username AS user
    FROM public.reference
    JOIN public.show
    on reference.show_id = show.id
    JOIN public.artist
    on reference.artist_id = artist.id
    JOIN public.character
    on reference.character_id = public.character.id
    JOIN public.user
    on reference.user_id = public.user.id
    WHERE status = 'true'
    ORDER BY random() LIMIT 1;`
  }
  const result = await client.query(query)
  return result.rows
},

async getRefBySearchBar(search) {
  console.log(search);
  const keyword = search
  const query = {
   text : `SELECT public.reference.id, public.reference.ref, show.name AS show, public.character.name AS character, artist.name AS artist, public.user.username AS user
   FROM public.reference
   JOIN public.show
   on reference.show_id = show.id
   JOIN public.artist
   on reference.artist_id = artist.id
   JOIN public.character
   on reference.character_id = public.character.id
   JOIN public.user
   on reference.user_id = public.user.id
   WHERE status = 'false'
   AND similarity(public.reference.ref, '%` + keyword +`%') > 0
   ORDER BY similarity(public.reference.ref, '%`+ keyword +`%') DESC
    `
  }
  const result = await client.query(query)
  console.log(result.rows);
  return result.rows
},

async getShowBySearchBar(search) {
  console.log(search);
  const keyword = search
  const query = {
   text : `SELECT show.id, show.name, show.category
   FROM public.show
   WHERE similarity(show.name, $1) > 0
   ORDER BY similarity(show.name, $1) DESC, show.name;
    `,
    values: [keyword]
  }
  const result = await client.query(query)
  console.log(result.rows);
  return result.rows
},

async getArtistBySearchBar(search) {
  console.log(search);
  const keyword = search
  const query = {
   text : `SELECT artist.id, artist.name
  FROM public.artist
  WHERE similarity(artist.name,$1)  > 0
  ORDER BY similarity(artist.name, $1) DESC, artist.name;
    `,
    values: [keyword]
  }
  const result = await client.query(query)
  console.log(result.rows);
  return result.rows
},

async getCharacterBySearchBar(search) {
  console.log(search);
  const keyword = search
  const query = {
   text : `SELECT character.id, character.name
   FROM public.character
   WHERE similarity(character.name, $1) > 0
   ORDER BY similarity(character.name, $1) DESC, character.name;
    `,
    values: [keyword]
  }
  const result = await client.query(query)
  console.log(result.rows);
  return result.rows
},







}

module.exports = datamapper;
