var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var App = React.createClass({


    clickHandler: function() {
        this.setState({text: this.state.text+'!'});
    },

    render: function() {
        return (
            <div className="container">
                <div className="row">
                    TOP
                </div>
                <div className="row">
                    <RouteHandler />
                </div>
            </div>
        )
    }
});

module.exports = App;