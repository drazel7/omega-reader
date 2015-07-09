'use strict';

var passport = require('passport');
var jwt = require('jsonwebtoken');
var Account = require('../models/Account.js');

var authController = {


    isLoggedIn: function(req, res, next) {
        if( ! req.user ) {
            res.status(401);
            res.json({});
        } else {
            next();
        }
    },

    login: function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if( err ) return next( err );
            // le return est important sinon on continue sur un user qui n'existe pas
            if( !user ) return res.send({});
            req.logIn( user, function( err ) {
                if( err ) return next(err);
                res.json({
                    token: jwt.sign( user, 'dasPrivatKey' )
                });
            });
        })(req, res, next);
    },

    register: function(req,res,next) {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        Account.register( new Account({
            username: username,
            email: email
        }), password, function(err, account) {
            if(err) {
                return next(err);
            }
            return authController.login(req,res,next);
        });
    },

    logout: function(req, res) {
        req.logout();
        res.send({});
    }

}

module.exports = authController;