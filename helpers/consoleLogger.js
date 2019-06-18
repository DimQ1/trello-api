const winstonLogger = require('../helpers/winstonLogger')();

module.exports = (request, response, next) => {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get('user-agent')}`;
    // eslint-disable-next-line no-console
    winstonLogger.info(data);
    next();
};
