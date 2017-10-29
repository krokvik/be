'use strict';

const express = require('express');
const router = express.Router();
const chain = require("../services/chain");
const tryToClaim = require("../models/claims");

router.get('/', function(req, res, next) {
  tryToClaim().then((claim) => {
      res.send(chain.claimCoinsForAddress(req.body.address, 200, claim.id));
  })
});

module.exports = router;
