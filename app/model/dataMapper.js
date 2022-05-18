const client = require('./dbClient.js');
const bcrypt = require('bcryptjs');
const stringSimilarity = require("string-similarity");
const datamapper = {
    
// ------------- USER ----------

    async createUser(user) {
      console.log(user);
      async function encrypt() {
        const hash = await bcrypt.hash(user.password, 10)
        return postUser = {
          username: user.username,
          email: user.email,
          birthday: user.birthday,
          password: hash
        }
      }
       await encrypt()
       function escapeRegExp(param) {
        let map = {
            '&': '&amp;',
             '<': '&lt;',
             '>': '&gt;',
             '"': '&quot;',
             "'": '&#039;',
             "~": '&#126',
             "`": '&grave',
             "-": '&minus',
             "#": '%23',
        };
        return param.replace(/[&<>"']/g, function(m) {return map[m];})
    }
    const emailpostUser = postUser.email
    const email = escapeRegExp(emailpostUser)
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
        text: `SELECT id, username, password, profile_picture FROM "user" WHERE username ='`+ username +`';`
      };
      const userInDB = await client.query(query);
      console.log(userInDB.rows);
      return userInDB.rows[0];
    },

    async getUserById(id) {
      console.log(id);
      const query = {
        text : `SELECT public.user.username, public.user.email, to_char(public.user.birthday, 'dd/mm/yyyy') as birthday, role.name AS role, grade.name AS grade, public.user.profile_picture, to_char(public.user.created_at, 'dd/mm/yyyy') as creation_date, to_char(public.user.updated_at, 'dd/mm/yyyy') as update_date
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

    async getUserByName(user) {
      console.log(user);
      const pseudo = user.username
      const query = {
        text : `SELECT public.user.id AS id, public.user.username, public.user.email, public.user.birthday, role.name AS role, grade.name AS grade, public.user.profile_picture 
        FROM "user" 
        JOIN role
        ON public.user.role_id = role.id
        JOIN grade
        ON public.user.grade_id = grade.id
        WHERE public.user.username ='`+ pseudo +`'`
      }
      const result = await client.query(query);
      console.log(result.rows[0]);
      return result.rows[0]
    },

    async checkUserByName(user) {
      const pseudo = user.username
      const query = {
        text : `SELECT public.user.id AS id, public.user.username
        FROM "user" 
        WHERE public.user.username ='`+ pseudo +`'`
      }
      const result = await client.query(query);
      return result.rows
    },
    
    async getUsers() {
      const query = {
        text : `SELECT public.user.id, username, to_char(created_at, 'dd/mm/yyyy'), role.name AS role, grade.name AS grade FROM "user"
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
        text: `SELECT id, username FROM "user" WHERE username ='` + username + `';`
      };
      const checkUser = await client.query(query);
      return checkUser.rows;
    }, 
      
    async getTopFive() {
      const query = {
        text : `SELECT count(reference.id), public.user.username, public.user.id
        FROM public.reference
        JOIN public.user
        on reference.user_id = public.user.id
        WHERE reference.user_id = public.user.id
        AND reference.status = 'true'
        GROUP BY public.user.username, public.user.id
        ORDER BY count DESC limit 5`
      }
      const result = await client.query(query);
      return result.rows
    },

    async getContribById(id) {
      const query = {
        text : `SELECT reference.id, reference.ref, show.name AS show, show.category, public.character.name AS character, artist.name AS artist, public.user.username AS user, reference.status, to_char(reference.created_at, 'dd/mm/yyyy') as created_date
        FROM public.reference
        JOIN public.show
        on reference.show_id = show.id
        JOIN public.artist
        on reference.artist_id = artist.id
        JOIN public.character
        on reference.character_id = public.character.id
	    	JOIN public.user
	    	on reference.user_id = public.user.id
	    	WHERE public.user.id = $1
	    	AND status = 'true'
	    	ORDER BY reference.created_at DESC`,
        values : [id]
      }
      const result = await client.query(query)
      return result.rows
    },

    async editProfil(user){
      console.log(user);
      // async function encrypt() {
      //   const hash = await bcrypt.hash(user.password, 10)
      //   return postUser = {
      //     email: user.email,
          // password: hash
      //   }
      // }
      //  await encrypt()
       function escapeRegExp(param) {
        let map = {
            '&': '&amp;',
             '<': '&lt;',
             '>': '&gt;',
             '"': '&quot;',
             "'": '&#039;',
             "~": '&#126',
             "`": '&grave',
             "-": '&minus',
             "#": '%23',
        };
        return param.replace(/[&<>"']/g, function(m) {return map[m];})
    }
    const emailpostUser = user.email
    const email = escapeRegExp(emailpostUser)
    console.log(user.id)
      const query = {
        text : `UPDATE public.user
                   SET "email" = $1,
                            where id = $2
                            `,
        values : [email, user.id]
      }
      const result = await client.query(query)
      return result
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

    async editCharacter(body){
      console.log(body);
      const query = {
        text : `UPDATE reference
        SET character_id = $1
        WHERE reference.id = $2`,
        values : [body.param_characterId, body.refId]
      }
      const result = await client.query(query);
      return result.rows
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

  async editArtist(body){
    const query = {
      text : `UPDATE reference
      SET artist_id = $1
      WHERE reference.id = $2`,
      values : [body.param_artistId, body.refId]
    }
    const result = await client.query(query);
    return result.rows
  },
  
  

    // --------------- SHOW ----------

   async createShow(show) {
     console.log(show);
      const query = {
        text: `INSERT INTO "show" (name, category) VALUES ($1, $2);`,
        values: [show.title, show.category]
       };
       const newShow = await client.query(query);
        return newShow;
    },
    
    async alterCreateShow(show) {
      const form = show.form
      const category = show.checkShow
      console.log(form);
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

    async editShow_id(body){
      const query = {
        text : `UPDATE public.reference
        SET show_id = $1
        WHERE reference.id = $2`,
        values : [body.param_showId, body.refId]
      }
      const result = await client.query(query);
      return result.rows
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

    async getEditForm(id){
      const query = {
        text : `SELECT reference.id, reference.ref, show.name AS show_title, reference.mature, artist.name AS artist, character.name AS character, show.category
        FROM public.reference
        JOIN public.show
        on reference.show_id = show.id
        JOIN public.artist
        on reference.artist_id = artist.id
        JOIN public.character
        on reference.character_id = public.character.id
        JOIN public.user
        on reference.user_id = public.user.id
        WHERE reference.id = $1  `,
        values : [id]
      }
      const result = await client.query(query);
      return result.rows
    },

    async validateRequest(id){
      const query = {
        text : `UPDATE public.reference
        SET status = 'true'
        WHERE reference.id = $1`,
        values : [id]
      }
      const result = await client.query(query);
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


   async getRefByCategory(id) {
      const query = {
        text : `SELECT reference.id, reference.ref, show.name AS show, public.character.name AS character, artist.name AS artist, public.user.username AS user
        FROM public.reference
        JOIN public.show
        on reference.show_id = show.id
        JOIN public.artist
        on reference.artist_id = artist.id
        JOIN public.character
        on reference.character_id = public.character.id
        JOIN public.user
		    on reference.user_id = public.user.id
        WHERE show.id = $1
        AND status = 'true';`,
        values : [id]
      }
      const result = await client.query(query);
     return result.rows
   },
  
   async getRefByArtist(id) {
     
    const query = {
      text : `SELECT reference.id, reference.ref, show.name AS show, public.character.name AS character, artist.name AS artist, public.user.username AS user
      FROM public.reference
      JOIN public.show
      on reference.show_id = show.id
      JOIN public.artist
      on reference.artist_id = artist.id
      JOIN public.character
      on reference.character_id = public.character.id
      JOIN public.user
		on reference.user_id = public.user.id
      WHERE artist.id = $1
      AND status = 'true';`,
      values : [id]
    }
    const result = await client.query(query);
   return result.rows
 },

 async getRefByCharacter(id) {
    
  const query = {
    text : `SELECT reference.id, reference.ref, show.name AS show, public.character.name AS character, artist.name AS artist, public.user.username AS user
    FROM public.reference
    JOIN public.show
    on reference.show_id = show.id
    JOIN public.artist
    on reference.artist_id = artist.id
    JOIN public.character
    on reference.character_id = public.character.id
    JOIN public.user
		on reference.user_id = public.user.id
    WHERE character.id = $1
    AND status = 'true';`,

    values: [id]
  }
  const result = await client.query(query);
 return result.rows
},

async getRefByRandom(){
  const query = {
    text : `SELECT reference.id, reference.ref, show.name AS show, public.character.name AS character, artist.name AS artist, public.user.username AS user, reference.character_id
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
  return result.rows[0]
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
   WHERE status = 'true'
   AND similarity(public.reference.ref, '%` + keyword +`%') > 0
   ORDER BY similarity(public.reference.ref, '%`+ keyword +`%') DESC
   LIMIT 3
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
   WHERE similarity(show.name, $1) >= 0.2
   ORDER BY similarity(show.name, $1) DESC, show.name
   LIMIT 3;
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
  WHERE similarity(artist.name,$1)  >= 0.2
  ORDER BY similarity(artist.name, $1) DESC, artist.name
  LIMIT 3;
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
   WHERE similarity(character.name, $1) >= 0.2
   ORDER BY similarity(character.name, $1) DESC, character.name
   LIMIT 3;
    `,
    values: [keyword]
  }
  const result = await client.query(query)
  console.log(result.rows);
  return result.rows
},

async getByRecent() {
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
    ORDER BY reference.created_at DESC LIMIT 5
`
  }
  const result = await client.query(query)
  return result.rows
},

async getRefById(id){
  const query = {
    text : `SELECT reference.ref, show.name AS title, public.character.name AS character, artist.name AS artist, public.user.username AS user, show.category
    FROM public.reference
    JOIN public.show
    on reference.show_id = show.id
    JOIN public.artist
    on reference.artist_id = artist.id
    JOIN public.character
    on reference.character_id = public.character.id
    JOIN public.user
    on reference.user_id = public.user.id
    WHERE reference.id = $1`,
    values : [id]
  }
  const result = await client.query(query)
  return result.rows
},

async deleteById(id){
  const query = {
    text : `DELETE FROM reference WHERE id = $1`,
    values : [id]
  }
  const result = await client.query(query)
  return result.rows
},

async editRef(ref){
  console.log(ref);
  const query = {
    text : `UPDATE public.reference
    SET ref = $1
    WHERE id = $2`,
    values : [ref.ref, ref.refId]
  }
  const result = await client.query(query)
  return result.rows
}







}

module.exports = datamapper;
