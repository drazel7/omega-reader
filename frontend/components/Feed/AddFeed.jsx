var React = require('react');
var Reflux = require('reflux');
var feedActions = require('../../actions/feedActions.js');
var FeedStore = require('../../stores/FeedStore.js');

var AddFeed = React.createClass({

    mixins: [Reflux.connect( FeedStore )],

    handleClick: function(url) {
        var url = this.refs.feedUrl.getDOMNode().value;
        this.refs.feedUrl.getDOMNode().value='';
        feedActions.addFeed(url);
    },

    render: function() {

        return (
            <div className="addfeed-component">
                <input type="text" className="form-control" name="feedUrl" ref="feedUrl" />
                <button ref="submit" onClick={this.handleClick}>Add</button>
            </div>
        )
    }

});

module.exports = AddFeed;