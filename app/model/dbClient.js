require('dotenv').config();

const { Pool } = require('pg');

const client = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
      },
});
client.connect();

module.exports = client;