const userService = require('../users/service');

module.exports = (req, res, next) => {
    const user = userService.authenticate(req.body);
    if (user) {
        return res.json(user);
    }

    return res.status(400)
        .json({ message: 'Username or password is incorrect' });
};
