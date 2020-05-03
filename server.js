const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const errorHandler = require('./middlewares/errorHandler');
const errorLogger = require('./middlewares/errorLogger');
const loggerMiddelware = require('./middlewares/logger');
const logger = require('./common/logger');
const routes = require('./routes');
const notFound = require('./middlewares/notFound');

const app = express();
const { port } = require('./config');
const { secret } = require('./config');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwt({ secret })
    .unless({ path: ['/login'] }));
app.use(loggerMiddelware(logger));
app.use('/', routes);
app.use(notFound);
app.use(errorLogger);
app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});
