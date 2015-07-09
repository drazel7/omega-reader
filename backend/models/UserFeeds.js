var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./Account.js');
var Feed = require('./Feed.js');


var UserFeedsSchema = {
    user: { type: Schema.Types.ObjectId, ref:'Account' },
    feeds: [ { type: Schema.Types.ObjectId, ref:'Feed' } ]
};

var UserFeeds = mongoose.model('UserFeeds', UserFeedsSchema, 'userFeeds');

/**
 * gets or creates UserFeeds
 * @param userId    user id
 * @param cb        callback
 */
UserFeeds.getByUserId = function(userId, cb) {
    UserFeeds.findOne({user: userId}, function(err, userFeedDocument) {
        if( err ) return cb( err, userFeedDocument );
        if( !userFeedDocument ) {
            var newUserFeed = new UserFeeds({
                user: userId,
                feeds:[]
            });
            newUserFeed.save(function(err,userFeedDocument) {
                cb(err, userFeedDocument);
            })
        } else {
            cb(err, userFeedDocument);
        }
    })
}

UserFeeds.prototype.addFeed = function( feedURL , cb ) {

    Feed.findOne({url: feedURL}, function(err, feedDocument ) {
        if( err ) return cb( err, feedDocument );
        if( !feedDocument ) {
            Feed.createFromURL( feedURL , function(err, feedDocument) {
                this.feeds.push( feedDocument._id);
                this.save(cb);
            }.bind(this));
        } else {
            if (this.feeds.indexOf(feedDocument._id) < 0) {
                this.feeds.push(feedDocument._id);
                this.save(cb);
            } else {
                cb(null,this);
            }
        }
    }.bind(this));
}

module.exports = UserFeeds;