const logger = require('../common/logger');

module.exports = (error, request, responce, next) => {
    const data = `${request.method} ${request.url} ${error.stack} `;
    logger.error(data);
    next(error);
};
