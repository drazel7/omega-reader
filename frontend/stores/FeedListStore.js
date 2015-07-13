var Reflux = require('reflux');
var feedActions = require('../actions/feedActions.js');
var Auth = require('../services/Auth.js');
var request = require('axios');

var FeedListStore = Reflux.createStore({

    listenables:[feedActions],

    getInitialState: function() {
        return {
            feeds: []
        }
    },

    onRequestList: function() {
        Auth.authenticatedQuery(
            request.get('/api/feeds')
                .then(function (res) {
                    this.trigger( {feeds: res.data });
                }.bind(this))
        );
    }

});

module.exports = FeedListStore;