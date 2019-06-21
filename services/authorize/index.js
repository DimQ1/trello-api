const { Authorize } = require('./authorize');
const role = require('./role');

module.exports = {
    authorize: new Authorize(),
    role
}
