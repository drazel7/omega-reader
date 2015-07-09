var React = require('react');

var FeedHeader = React.createClass({

    render: function() {

        if( this.props.feed == null ) {
            return <div />
        } else {
            return <div>{this.props.feed.title}</div>
        }
    }

});

module.exports = FeedHeader;