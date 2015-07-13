var Reflux = require('reflux');
var request = require('axios');

var articleActions = require('../actions/articleActions.js');

var ArticleListStore = Reflux.createStore({

    listenables:[articleActions],

    getInitialState: function() {
        return {
            articles: []
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

module.exports = ArticleListStore;