const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');
const users = require('../../dataLayer/users');

class Authenticate {
    constructor() {
        this._getUserWithoutPassword = user => user ? {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            Frole: user.role
        } : null;
    }

    authenticate({ username, password }) {
        const user = users.getByName(username);
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (isPasswordCorrect) {
            const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);

            return { ...this._getUserWithoutPassword(user), token };
        }

        return null;
    }
}

module.exports = new Authenticate();
