const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const errorHandler = require('./middlewares/errorHandler');
const middlewareLogger = require('./middlewares/middlewareLogger');
const logger = require('./logs/logger');
const { secret } = require('./config.json');
const routes = require('./routes');

const page404 = require('./middlewares/page404');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwt({ secret })
    .unless({ path: ['/login'] }));
app.use(middlewareLogger);
app.use('/', routes);
app.use(page404);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});
