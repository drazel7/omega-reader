var express = require('express');
var bodyParser = require('body-parser');
var FeedReader = require('./lib/FeedReader.js');
var mongoose = require('mongoose');
var Feed = require('./models/Feed.js');
var session = require('express-session');

//routes
var api = require('./routes/api.js');
var admin = require('./routes/admin.js');
var auth = require('./routes/auth.js');

var Account = require('./models/Account');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

var app = express();

app.use(express.static(__dirname+'/../public'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use( session({
    resave: true,
    saveUninitialized: true,
    secret: 'dasSeeKret'
}))
app.use( passport.initialize() );
app.use( passport.session() );

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

mongoose.connect('mongodb://localhost/omega-reader');

app.use('/api', api );
app.use('/admin',admin);
app.use('/auth', auth);


app.listen(3000, function() {
    console.log('LISTENING');
});