'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const utils = require('web3-utils');

router.put('/', function(req, res, next) {
  if (!utils.isAddress(req.body.wallet)) {
    res.status(500).json({error: 'Incrorrect Ethereum address'});
  } else {
    User.updateWallet(req.user, req.body.wallet);
    res.json({message: 'ok'});
  }
});

module.exports = router;
