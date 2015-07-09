var React = require('react');
var Link = require('react-router').Link;

var FeedList = React.createClass({

    renderList: function() {
        return this.props.feeds.map( function(feed) {
            return <li key={feed._id}><Link to="feed" params={{id: feed._id}}>{feed.title}</Link></li>
        });
    },

    render: function() {
        console.log( this.props );
        var items = this.renderList();
        return (
            <ul>
                {items}
            </ul>
        );
    }

});

module.exports = FeedList;