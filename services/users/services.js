const users = require('../../dataAccess/users');

class UserService {
    constructor() {
        this._getUserWithoutPassword = user => user ? {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            Frole: user.role
        } : null;
    }

    getAll() {
        const allUsers = users.getAll()
            .map(user => this._getUserWithoutPassword(user));

        return allUsers;
    }

    getById(id) {
        return this._getUserWithoutPassword(users.getById(id));
    }
}

module.exports = new UserService();
