/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const errorHandler = require('./helpers/errorHandler');
const { secret } = require('./config.json');
const users = require('./users');
const board = require('./board');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwt({ secret })
    .unless({ path: ['/api/users/authenticate'] }));

// api routes
app.use('/api/users', users.controller);
app.use('/api/board', board.controller);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
