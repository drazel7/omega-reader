var React = require('react');
var Router = require('react-router');

var feedActions = require('../actions/feedActions.js');
var articleActions = require('../actions/articleActions.js');

var Reflux = require('reflux');
var FeedStore = require('../stores/FeedStore.js');

var ArticleList = require('./ArticleList.jsx');
var FeedHeader = require('./Feed/FeedHeader.jsx');

var Feed = React.createClass({
    mixins: [Router.State, Reflux.connect(FeedStore)],

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
        var id = this.getParams().id;
        var json = JSON.stringify( this.state.feed );
        return(
            <div>
                <FeedHeader feed={this.state.feed} />
                <ArticleList feedId={id} />
            </div>
        )
    }
});

module.exports = Feed;