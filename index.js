require('dotenv').config();
const express = require('express');
const router = require('./app/routers/router.js');
const PORT = process.env.PORT || 3333;
const app = express();

const session = require('express-session')
app.use(session({
    secret: 'random',
    resave: true,
    saveUninitialized: true,
    cookie: {}
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessions = []

app.use(router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}  `);
});
