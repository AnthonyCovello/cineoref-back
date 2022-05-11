require('dotenv').config();

const { Pool } = require('pg');

const client = new Pool({
    host: ENV['DB_HOST'],
    user: ENV['DB_USER'],
    password: ENV['DB_PASSWORD'],
    database: ENV['DB_DATABASE'],
    ssl: {
        rejectUnauthorized: false,
      },
});
client.connect();

module.exports = client;