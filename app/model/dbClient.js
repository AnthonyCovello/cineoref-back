require('dotenv').config();

const { Pool } = require('pg');

const client = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
      },
});
client.connect();

module.exports = client;