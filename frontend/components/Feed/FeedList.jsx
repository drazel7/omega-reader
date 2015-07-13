var React = require('react');
var Link = require('react-router').Link;

var Reflux = require('reflux');

var feedActions = require('../../actions/feedActions.js');
var FeedListStore = require('../../stores/FeedListStore.js');

var FeedList = React.createClass({

    mixins: [ Reflux.connect(FeedListStore)],

    componentDidMount: function() {
        feedActions.requestList();
    },

    renderList: function() {
        return this.state.feeds.map( function(feed) {
            return <li key={feed._id}><Link to="feed" params={{id: feed._id}}>{feed.title}</Link></li>
        });
    },

    render: function() {
        var items = this.renderList();
        return (
            <ul>
                {items}
            </ul>
        );
    }

});

module.exports = FeedList;