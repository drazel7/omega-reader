'use strict';
var FeedReader = require('../lib/FeedReader.js');

var Feed = require('../models/Feed.js');
var UserFeed = require('../models/UserFeeds.js');
var User = require('../models/Account.js');

var mongoose = require('mongoose');

var feedController = {

    feedList: function(req, res) {
        Feed.find(function( err, feeds ) {
            res.json(feeds);
        })
    },

    getFeed: function( req, res ) {
        var id = req.params.id;

        Feed.findById(id, function( err, feed ) {
            res.json(feed);
        })
    },


    getUserFeeds: function( req, res , next) {
        UserFeed.getByUserId(req.user._id, function(err, userFeed) {
            if(err) return next( err );
            Feed.find({ '_id': { $in: userFeed.feeds }} , function(err, feeds) {
                if(err) return next( err );
                res.json( feeds );
            })
        })
    },

    link: function( req, res, next ) {
        var url = req.body.url;
        if( !url ) {
            var err = new Error('missing url parameter');
            return next(err);
        }
        UserFeed.getByUserId( req.user.id , function( err, userFeed ) {
            if( err ) return next(err);
            userFeed.addFeed( url , function(err, userFeed ) {
                if(err) return next(err);
                Feed.find({ '_id': { $in: userFeed.feeds }} , function(err, feeds) {
                    if(err) return next( err );
                    res.json( feeds );
                })
            });

        });

    }

}

module.exports = feedController;