var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');


var ArticleListStore = require('../stores/ArticleListStore.js');
var articleActions = require('../actions/articleActions.js');

var ArticleEntry = require('./Article/ArticleEntry.jsx');

var ArticleList = React.createClass({

    mixins: [Router.State, Reflux.connect(ArticleListStore)],

    componentDidMount: function() {
        this.init();
    },

    componentWillReceiveProps: function() {
        this.init();
    },

    init: function() {
        var id = this.getParams().id;
        articleActions.fetchFeedArticles(id);
    },

    render: function() {
        var items = this.state.articles.map(function(article) {
            return (<ArticleEntry key={article._id} article={article} />);
        });
        return (
            <div>
                {items}
            </div>
        );
    }

});

module.exports = ArticleList;