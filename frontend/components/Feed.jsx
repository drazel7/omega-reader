var React = require('react');
var Router = require('react-router');
var request = require('superagent');

var Feed = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
        return {
            feed: null
        }
    },

    init: function() {
        var id = this.getParams().id;
        request.get('/api/feed/'+id, function(err, res) {
            console.log(res);
            this.setState({feed: res.body });
        }.bind(this))
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
                <div>Feed {id}</div>
                <div>Content : </div>
                <pre>
                {json}
                </pre>
            </div>
        )
    }
});

module.exports = Feed;