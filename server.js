const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const errorHandler = require('./middlewares/errorHandler');
const eventLogger = require('./middlewares/eventLogger');
const logger = require('./tools/logger');
const { secret } = require('./config.json');
const routes = require('./routes');

const notFound = require('./middlewares/notFound');

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwt({ secret })
    .unless({ path: ['/login'] }));
app.use(eventLogger(logger));
app.use('/', routes);
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});
