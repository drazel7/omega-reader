var React = require('react');
var Router = require('react-router');

var feedActions = require('../actions/feedActions.js');

var Reflux = require('reflux');

var ArticleList = require('./ArticleList.jsx');
var FeedHeader = require('./Feed/FeedHeader.jsx');

var Feed = React.createClass({
    mixins: [Router.State],

    init: function() {
        var id = this.getParams().id;
        feedActions.fetchFeed(id);
    },

    componentDidMount: function() {
        this.init();
    },

    componentWillReceiveProps: function() {
        this.init();
    },

    render: function() {
        return(
            <div>
                <FeedHeader />
                <ArticleList />
            </div>
        )
    }
});

module.exports = Feed;