'use strict';

const express = require('express');
const router = express.Router();
const stats = require('../services/stats');
const Timestamps = require('../services/timestamps');
const chain = require("../services/chain");

router.get('/get-stats', function(req, res, next) {
    stats(req.googleApiClient, Timestamps.today(), Timestamps.now()).then(todaysResult => {
        stats(req.googleApiClient, Timestamps.yesterday(), Timestamps.today()).then(yesterdaysResult => {
            res.json({
                yesterday: yesterdaysResult,
                today: todaysResult,
            })
        }, () => {
          res.status(500).json({error: 'failed to get stats'});
        });
    }, () => {
      res.status(500).json({error: 'failed to get stats'});
    });
});

router.get('/mybalance/', function(req, res, next) {
  chain.getAddressBalance(req.user.wallet).then((balance) => {
    res.json({balance: balance});
  }, () => {
    res.status(500).json({error: 'failed to get my balance'});
  })
});


module.exports = router;
