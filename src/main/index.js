'use strict';

var express = require('express');
var router = express.Router();
//var validator = require('validator');
// var auth = require('../services/auth');
// var config = require("../../config/dev");
// var User = require("../models/user");

// var userModel = new User();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({message: "Hello world"});
    // if (req.currentUser) {
    //     res.redirect('/game')
    // }
    // res.render('index', { user: req.currentUser || ''});
});

// router.post('/login', function(req, res, next) {
//     userModel.checkPassword(req.body.login, req.body.password).then(function(user) {
//         userModel.changeToken(user, auth.createToken({name: user.name, email: user.email})).then(function(token) {
//             res.cookie('token', token, { maxAge: config.expireTokenDate });
//             res.redirect('/game')
//         }, function() {
//            res.redirect('/')
//         });
//     }, function () {
//         res.redirect('/');
//     });
// });

// router.get('/register', function(req, res, next) {
//     console.log(req.session);
//     res.render('register', { title: 'Register' });

// });

// router.get('/logout', function(req, res) {
//     res.send(auth.createToken({value: req.params.value}));
//     //req.session.redSession = req.params.value;
//     //res.send(req.session);
// });

module.exports = router;