var React = require('react');
var Navigation = require('react-router').Navigation;
var Auth = require('../../services/Auth');

var Register = React.createClass({

    mixins:[Navigation],

    getInitialState: function() {
        return {
            error: null
        }
    },

    handleSubmit: function() {
        var email = this.refs.email.getDOMNode().value;
        var username = this.refs.username.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;

        Auth.register(email, username, password, function( authResult ) {
            if( authResult.success ) {
                this.transitionTo('dashboard');
            } else {
                this.setState({error: authResult.message});
            }
        }.bind(this));
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
            <div>
                {this.renderErrorMsg()}
                <input type="text" name="email" id="email" ref="email" className="form-control" placeholder="Enter your email" />
                <input type="text" name="username" id="username" ref="username" className="form-control" placeholder="Enter your username" />
                <input type="password" name="password" id="password" ref="password" className="form-control" />
                <input type="password" name="password-reat" id="password-repeat" ref="password-repeat" className="form-control" />
                <button onClick={this.handleSubmit}>Sign Up</button>
            </div>
        )
    }

});

module.exports = Register;