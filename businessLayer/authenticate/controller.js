const service = require('./service');

class LoginController {
    authenticate(req, res, next) {
        const user = service.authenticate(req.body);
        if (user) {
            return res.json(user);
        }

        return res.status(400)
            .json({ message: 'Username or password is incorrect' });
    }
}

module.exports = new LoginController();
