
class EventLogger {
    constructor(logger) {
        this._logger = logger;
    }

    get logger() {
        return (request, response, next) => {
            const now = new Date();
            const hour = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get('user-agent')}`;
            // eslint-disable-next-line no-console
            this._logger.info(data);
            next();
        };
    }
}

module.exports = logger => (new EventLogger(logger)).logger;
