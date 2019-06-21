const users = require('../assets/users.json');

class UserRepository {
    getAll() {
        return new Promise((resolve, reject) => {
            try {
                resolve(users);
            } catch (error) {
                reject(error);
            }
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            try {
                const user = users.find(userItem => userItem.id === parseInt(id, 10));
                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    }

    getByName(userName) {
        return new Promise((resolve, reject) => {
            try {
                const user = users.find(userItem => userItem.username === userName);
                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    }
}
exports.UserRepository = UserRepository;
