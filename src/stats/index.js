'use strict';

var express = require('express');
var router = express.Router();
const stats = require('../services/stats');
const Timestamps = require('../services/timestamps');

router.get('/get-stats', function(req, res, next) {
    stats(req.googleApiClient, Timestamps.today(), Timestamps.now()).then(todaysResult => {
        stats(req.googleApiClient, Timestamps.yesterday(), Timestamps.today()).then(yesterdaysResult => {
            res.json({
                yesterday: yesterdaysResult,
                today: todaysResult,
            })
        });
    });
});

module.exports = router;