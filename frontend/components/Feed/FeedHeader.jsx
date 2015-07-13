var React = require('react');

var Reflux = require('reflux');
var FeedStore = require('../../stores/FeedStore.js');

var articleActions = require('../../actions/articleActions.js');

var FeedHeader = React.createClass({

    mixins: [ Reflux.connect( FeedStore )],

    handleFetchArticles: function() {
        articleActions.fetchFeedArticles( this.state.feed.id, true );
    },

    render: function() {
        return (
            <div>
                <span>{this.state.feed && this.state.feed.title}</span>
                <button onClick={this.handleFetchArticles}>Refresh</button>
            </div>
        );
    }

});

module.exports = FeedHeader;