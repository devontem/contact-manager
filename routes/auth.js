var passport = require('passport');
var Account = require('../models/account');
var express = require('express');
var router = express.Router();

router.route('/register')
    .get(function(req, res){
        res.render('register', {user: {}});
    })
    .post(function(req, res){
        //Account.register -> new Account -> arg1 {all fields in obj}, arg2 password, arg3 callback 
        Account.register(new Account({username: req.body.username}), req.body.password, function(err, account){
            if (err) {
                return res.render('register', {account: account});
            }
            
            //if succesful register, user is logged in
            req.login(account, function(err){
                res.redirect('/contacts/');
            });
        });
    });
    
router.route('/login')
    .get(function(req, res){
        res.render('login', {user: req.user});
    })
    .post(passport.authenticate('local'), function(req, res){
        res.redirect('/contacts/')
    });

router.all('/logout', function(req, res, next){
    req.logout();
    res.redirect('/');
});

module.exports = router;