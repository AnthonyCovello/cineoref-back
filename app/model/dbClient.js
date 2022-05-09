require('dotenv').config();

const { Pool } = require('pg');

const client = new Pool({
    host: 'ec2-63-35-156-160.eu-west-1.compute.amazonaws.com',
    user: 'tjifvrwyojabeo',
    password: '90bdfe3501a52c52bf47f0fe29e0aafa3c45a87ac31a4f46b8ae6b0af2ee6cb2',
    database: 'd4233tl1bkvod2',
    ssl: {
        rejectUnauthorized: false,
      },
});
console.log(client);
client.connect();

module.exports = client;