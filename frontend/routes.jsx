var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('./components/App.jsx');
var Feed = require('./components/Feed.jsx');
var Home = require('./components/Home.jsx');
var NotFound = require('./components/NotFound.jsx');
var Login = require('./components/Auth/Login.jsx');
var Dashboard = require('./components/Dashboard.jsx');
var Protected = require('./components/Protected.jsx');
var Register = require('./components/Auth/Register.jsx');

var routes = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute name="home" handler={Home} />

        <Route name="login" path="/login" handler={Login} />
        <Route name="register" path="/register" handler={Register} />

        <Route path="app" handler={Protected}>
            <Route name="feed" path="feed/:id" handler={Feed} />
            <Route name="dashboard" path="dashboard" handler={Dashboard} />
        </Route>
        <NotFoundRoute handler={NotFound} />
    </Route>
)

module.exports = routes;