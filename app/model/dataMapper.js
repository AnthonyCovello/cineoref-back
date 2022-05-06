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
    
  

    async createCharacter(char) {
      console.log(char);
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
        text: `INSERT INTO "show" (title, category) VALUES ($1, $2);`,
        values: [show.title, show.category]
       };
       const newShow = await client.query(query);
        return newShow;
    },

    async getByCategory(params) {
        const table = params.substring(1);
        console.log(table);
        const query = {
          text: `SELECT * FROM ${table};`
        }
        console.log(query);
      const result = await client.query(query);
      console.log(result.rows);
      return result.rows
    }

}

module.exports = datamapper;
