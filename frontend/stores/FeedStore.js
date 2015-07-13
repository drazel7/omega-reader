var Reflux = require('reflux');
var feedActions = require('../actions/feedActions');
var Auth = require('../services/Auth.js');

var request = require('axios');

var FeedStore = Reflux.createStore({
    listenables: [feedActions],

    getInitialState: function() {
        return {
            feed: null
        }
    },

    onAddFeed: function(url) {
        Auth.authenticatedQuery(
            request.post('/api/feed/link',
                { url: url })
                .then(function (res) {
                   this.trigger( {feeds: res.data });
                }.bind(this))
        );
    },

    onFetchFeed: function(id) {
        request.get('/api/feed/'+id).then( function( res ) {
            this.trigger({feed: res.data });
        }.bind(this));
    }


});

module.exports = FeedStore;