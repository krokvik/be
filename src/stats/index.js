'use strict';

var express = require('express');
var router = express.Router();
//var validator = require('validator');
// var auth = require('../services/auth');
// var config = require("../../config/dev");
// var User = require("../models/user");

// var userModel = new User();

/* GET home page. */
router.get('/get-stats', function(req, res, next) {
    res.json({message: "Stats"});
    // if (req.currentUser) {
    //     res.redirect('/game')
    // }
    // res.render('index', { user: req.currentUser || ''});
});

module.exports = router;