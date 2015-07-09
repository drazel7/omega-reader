var mongoose = require('mongoose');
var FeedReader = require('../lib/FeedReader.js');

var FeedSchema = {
    url:String,
    title:String,
    description:String,
    category:String,
    language:String,
    imageUrl:String
};

var Feed = mongoose.model('Feed', FeedSchema, 'feeds');

Feed.createFromURL = function( feedURL , cb) {
    var feedReader = new FeedReader( feedURL );
    feedReader.on('meta', function( meta ) {
        var feed = new Feed({
            url: feedURL,
            title: meta.title,
            description: meta.description
         });

        feed.save( cb );
    });
    feedReader.read();
}

module.exports = Feed;