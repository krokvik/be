'use strict';

const express = require('express');
const router = express.Router();
const chain = require("../services/chain");


/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({message: "Hello world"});
});

router.get('/balance/:address', function(req, res, next) {
  chain.getAddressBalance(req.params.address).then((balance) => {
    res.json({balance: balance});
  })
});

module.exports = router;
