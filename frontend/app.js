var React = require('react');
var Router = require('react-router');
var routes = require('./routes.jsx');

window.AppRouter = Router.run(routes, function(Root){
    React.render(<Root />, document.getElementById('app'));
});