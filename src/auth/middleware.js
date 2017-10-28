var GoogleApiClient = require('../gapi/client');

module.exports = function(options) {
    return function(req, res, next) {
        var authToken = req.headers['x-authorization'];

        if (!authToken) {
            res.status(401).json({message: 'Authorization token is missing'});
            return;
        }

        req.googleApiClient = new GoogleApiClient(authToken);

        req.googleApiClient.getProfile(response => {
            if (response.error) {
                res.status(response.error.code).json(response.error);
                return;
            }

            req.user = response;
            next()
        })
    }
}
