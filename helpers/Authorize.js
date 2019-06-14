module.exports = class Authorize {
    userRoleCheck(roles = []) {
        return function (req, res, next) {
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401)
                    .json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            return next();
        };
    }
};
