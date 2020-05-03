class Authorize {
    userRoleCheck(roles = []) {
        return function (req, res, next) {
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(401)
                    .json({ message: 'Unauthorized' });
            }

            return next();
        };
    }
}
exports.Authorize = Authorize;
