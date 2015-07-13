var React = require('react');

var Auth = require('../services/Auth.js');
var AddFeed = require('./Feed/AddFeed.jsx');
var FeedList = require('../components/Feed/FeedList.jsx');
var Reflux = require('reflux');
var RouteHandler = require('react-router').RouteHandler;

var Protected = React.createClass({

    mixins:[ Auth.Mixin ],

    render: function() {
        return (
            <div>
                <div className="col-sm-2">
                    <AddFeed />
                    <FeedList />
                </div>
                <RouteHandler />
            </div>

        )
    }

});

module.exports = Protected;