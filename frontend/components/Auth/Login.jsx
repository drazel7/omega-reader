var React = require('react');
var Reflux = require('reflux');
var Navigation = require('react-router').Navigation;
var Auth = require('../../services/Auth.js');

require('../../styles/login.css');

var Login = React.createClass({

    mixins:[Navigation],

    getInitialState: function() {
        return {
            error: null
        }
    },

    handleSubmit: function(e) {
        var username = this.refs.username.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;

        Auth.login( username, password , function( authResult ) {
            if( authResult.success ) {
                this.transitionTo('dashboard');
            } else {
                this.setState({error: authResult.message});
            }
        }.bind(this));
    },

    handleRegisterClick: function(e) {
        this.transitionTo('register');
    },

    renderErrorMsg: function() {
        if( this.state.error != null ) {
            return <div className="error">{this.state.error}</div>
        } else {
            return null;
        }
    },

    render: function() {
        return (
            <div className="login">
                {this.renderErrorMsg()}
                <input type="text" name="username" id="username" ref="username" className="form-control" placeholder="Enter your username" />
                <input type="password" name="password" id="password" ref="password" className="form-control" />
                <button onClick={this.handleSubmit}>Sign In</button>
                <button onClick={this.handleRegisterClick}>Sign Up</button>
            </div>
        );
    }
});

module.exports = Login;