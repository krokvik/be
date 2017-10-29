'use strict';

var express = require('express');
var router = express.Router();
var Chain = require("../services/chain");
var tryToClaim = require("../models/claims");

var chain = new Chain();

router.get('/', function(req, res, next) {
  tryToClaim().then((claim) => {
      res.send(chain.claimCoinsForAddress(req.body.address, 200, claim.id));
  })

});

module.exports = router;
