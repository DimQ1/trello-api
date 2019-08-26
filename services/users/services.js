const users = require('../../dataAccess/users');

class UserService {
    _getUserWithoutPassword(user) {
        // eslint-disable-next-line no-unused-vars
        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
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
