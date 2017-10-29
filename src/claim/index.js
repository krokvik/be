'use strict';

const express = require('express');
const router = express.Router();
const chain = require("../services/chain");
const stats = require('../services/stats');
const tryToClaim = require("../models/claims");
const Timestamps = require('../services/timestamps');

router.post('/', function(req, res, next) {
  stats(req.googleApiClient, Timestamps.yesterday(), Timestamps.today()).then(yesterdaysResult => {
    tryToClaim(req.user.id, yesterdaysResult.reward).then((claim) => {
        console.log('User', req.user);
        console.log('Claim', claim);
        res.json(chain.claimCoinsForAddress(req.user.wallet, yesterdaysResult.reward, claim.id));
    }, (error) => {
      res.status(500).json({error: error});
    })
  }, () => {
    res.status(500).json({error: 'failed to get stats'});
  });
});

module.exports = router;
