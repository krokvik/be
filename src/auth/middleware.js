const GoogleApiClient = require("../gapi/client");
const User = require("../models/user");

module.exports = function(options) {
    return function(req, res, next) {
        var authHeader = req.headers['authorization'];

        if (!authHeader) {
            res.status(401).json({message: 'Authorization token is missing'});
            return;
        }

        req.googleApiClient = new GoogleApiClient(authHeader);

        req.googleApiClient.getProfile(response => {
            if (response.error) {
                res.status(response.error.code).json(response.error);
                return;
            }

            User.findOrCreateUser(response.id, response.name).then(user => {
                req.user = user;
                next();
            });
        })
    }
}
