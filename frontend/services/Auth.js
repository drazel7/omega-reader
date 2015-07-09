'use strict';
var request = require('axios');
var jwt = require('jsonwebtoken');
var Router = require('react-router');
var routes = require('../routes.jsx');

var Auth = {

    isLoggedIn: function() {
        return !!localStorage.token;
    },

    getUser: function() {
        if( Auth.isLoggedIn() ) {
            return jwt.decode(localStorage.token);
        }
        return null;
    },

    login: function( username, password, callback ) {
        request.post('/auth/login', {username: username, password: password})
            .then(function ( res) {
                var result;
                if( res.data.token != null ) {
                    result = new Auth.Result( true, res.data.token );
                    localStorage.token = res.data.token;
                } else {
                    result = new Auth.Result(false);
                    result.message = res.data.message || 'Invalid Username or Password';
                }
                callback(result);
            });
    },

    register: function( email, username, password,  callback ) {
        request.post('/auth/register', {
            email: email,
            username: username,
            password: password
        }).then( function(res ) {
            var result;
            if( res.data.token != null ) {
                result = new Auth.Result( true, res.data.token );
                localStorage.token = res.data.token;
            } else {
                result = new Auth.Result(false);
                result.message = res.data.message || 'Problem during sign up';
            }
            callback(result);
        })
    },

    Result: function( success, token ) {
        success = success || false;
        token = token || null;

        this.success = success;
        this.token = token;
        this.message = null;
    },

    authenticatedQuery: function( axiosPromise ) {
        axiosPromise.catch( function( response ) {
           if(response.status == 401 ) {
               console.log('redirect pliz');
               window.AppRouter.transitionTo('login' );
           }
        });
    },

    Mixin: {
        statics: {
            willTransitionTo: function(transition, params) {
                if( !Auth.isLoggedIn() ) {
                    transition.redirect('/login', {attemptedTransition: transition});
                }
            }
        }
    }

}

module.exports = Auth;