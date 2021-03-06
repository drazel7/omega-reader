var Reflux = require('reflux');
var request = require('axios');

var articleActions = require('../actions/articleActions.js');

var ArticleStore = Reflux.createStore({

    listenables:[articleActions],

    getInitialState: function() {
        return {
            article: null
        }
    },

    onFetchFeedArticles: function(id, refresh) {
        refresh = refresh || false;
        request.get('/api/article/feed/'+id, {
            params: {
                refresh: refresh
            }
        }).then(function (res) {
                this.trigger( {articles: res.data });
            }.bind(this))
    }

});

module.exports = ArticleStore;