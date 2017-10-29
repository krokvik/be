'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.put('/', function(req, res, next) {
    User.updateWallet(req.user, req.body.wallet);
    res.json({message: 'ok'});
});

module.exports = router;
