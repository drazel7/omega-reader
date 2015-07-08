var Reflux = require('reflux');
var userActions = require('../actions/userActions.js');
var Auth = require('../services/Auth.js');

var request = require('axios');

var UserStore = Reflux.createStore({
    listenables: [userActions],

    getInitialState: function() {
        return {
            error: null
        }
    },

    onStartLogin: function() {
    }

});

module.exports = UserStore;