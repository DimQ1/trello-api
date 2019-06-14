const jwt = require('jsonwebtoken');
const config = require('../config.json');
const users = require('../assets/users');

function getUserWithoutPassword(user) {
    if (!user) return null;

    return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        Frole: user.role
    };
}

function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const userWithoutPassword = getUserWithoutPassword(user);

        return {
            ...userWithoutPassword,
            token
        };
    }

    return null;
}

function getAll() {
    return new Promise((resolve, reject) => {
        try {
            const allUsers = users.map(user => getUserWithoutPassword(user));
            resolve(allUsers);
        } catch (error) {
            reject(error);
        }
    });
}

function getById(id) {
    return new Promise((resolve, reject) => {
        try {
            const user = getUserWithoutPassword(users.find(u => u.id === parseInt(id, 10)));
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    authenticate,
    getAll,
    getById
};
