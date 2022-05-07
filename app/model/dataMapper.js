const client = require('./dbClient.js');

const datamapper = {
    
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
    
  

    async createCharacter(character) {
      console.log(character);
      const query = {
        text: `INSERT INTO "character" (name) VALUES ($1);`,
        values: [character.name]
       };
       const newCharacter = await client.query(query);
        return newCharacter;
    },

    async createArtist(artist) {
      console.log(artist);
      const query = {
        text: `INSERT INTO "artist" (name) VALUES ($1);`,
        values: [artist.name]
       };
       const newArtist = await client.query(query);
        return newArtist;
    },

  
   async createShow(show) {
      console.log(show);
      const query = {
        text: `INSERT INTO "show" (name, category) VALUES ($1, $2);`,
        values: [show.name, show.category]
       };
       const newShow = await client.query(query);
        return newShow;
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

  async getByArtist() {
    const query = {
      text: `SELECT * 
      FROM "artist"
                       `
    }
  const result = await client.query(query);
  console.log(result.rows);
  return result.rows
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

async getRequest(){
  const query = {
    text : `SELECT * FROM reference WHERE status = 'false'`
  }
  const result = await client.query(query);
  console.log(result.rows);
  return result.rows
},

}

module.exports = datamapper;
