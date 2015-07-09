var express = require('express');

var Account = require('../models/Account.js');
var Feed = require('../models/Feed.js');
var UserFeed = require('../models/UserFeeds.js');

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var admin = express.Router();

admin.get('/createuser', function(req, res) {
    Account.register( new Account({
        username: 'michael',
        nickname: 'drazel'
    }), 'fetmeapht', function(err, account) {
        if(err) {
            console.log('Error while creating account',err);
            res.send('ERROR');
            return;
        }

        console.log('created user michael');
        res.send('CREATED');
    })
} );


admin.get('/test', function(req, res ) {

    Account.find({username: 'michael'}, function(err, userData) {
        Feed.find({url: 'http://www.ouest-france.fr/rss.xml'}, function(err, feedData) {
        //Feed.find({url: 'http://rss.lemonde.fr/c/205/f/3050/index.rss'}, function(err, feedData){
            var user = userData[0];
            var feed = feedData[0];
            UserFeed.findOne({user: user._id}, function(err, doc) {
               if( !doc ) {
                   var userFeed = new UserFeed({
                       user: user._id,
                       feeds: [feed._id]
                   });
                   userFeed.save( function(err, savedData ) {
                       console.log('ERR',err);
                       console.log(savedData);
                       return res.json(feedData);
                   })
               } else {
                   if( doc.feeds.indexOf(feed._id)<0){
                       doc.feeds.push(feed._id);
                       doc.save(function(err,savedData) {
                           console.log('ERR',err);
                           console.log('SAVE 2',savedData);
                           return res.json(savedData);
                       })
                   }
               }
            });
            //res.json(feedData);

        })
    })


})

admin.get('/loggedin', function(req,res) {
    if( req.user ) {
        res.send( req.user );
    } else {
        res.send('NOT LOGGED IN');
    }
})

admin.get('/login', function( req,res) {
    var username = req.query.username;
    var password = req.query.password;
    console.log(req.query.username);
    res.send('WIP');
})

module.exports = admin;