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
          text: `SELECT username FROM "user" WHERE email = $1 AND password = $2;`,
          values: [user.email, user.password]
        };
        const userInDB = await client.query(query);
        return userInDB;
      }
    

}

module.exports = datamapper;
