var React = require('react');

var Auth = require('../services/Auth.js');
var Navigation = require('react-router').Navigation;
var AddFeed = require('./Feed/AddFeed.jsx');
var FeedList = require('../components/Feed/FeedList.jsx');
var feedStore = require('../stores/FeedStore.js');
var feedActions = require('../actions/feedActions.js');
var Reflux = require('reflux');
var RouteHandler = require('react-router').RouteHandler;

var Protected = React.createClass({

    mixins:[Navigation, Auth.Mixin, Reflux.connect(feedStore)],

    componentDidMount: function() {
        feedActions.fetchFeeds();
    },

    render: function() {
        return (
            <div>
                <div className="col-sm-2">
                    <AddFeed />
                    <FeedList feeds={this.state.feeds}/>
                </div>
                <RouteHandler />
            </div>

        )
    }

});

module.exports = Protected;