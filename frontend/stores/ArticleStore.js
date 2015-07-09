var Reflux = require('reflux');
var request = require('axios');

var articleActions = require('../actions/articleActions.js');

var ArticleStore = Reflux.createStore({

    listenables:[articleActions],

    getInitialState: function() {
        return {
            articles: [],
            openArticle: null
        }
    },

    onFetchFeedArticles: function(id) {
        request.get('/api/article/feed/'+id)
            .then(function (res) {
                this.trigger( {articles: res.data });
            }.bind(this))
    }

});

module.exports = ArticleStore;