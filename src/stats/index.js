'use strict';

var express = require('express');
var router = express.Router();
const stats = require('../services/stats');

router.get('/get-stats', function(req, res, next) {
    stats(req.googleApiClient)
        .then(result => res.json(result));
});

module.exports = router;