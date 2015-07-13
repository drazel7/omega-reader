var mongoose = require('mongoose');
var FeedReader = require('../lib/FeedReader.js');
var Article = require('./Article.js');

var FeedSchema = {
    url:String,
    title:String,
    description:String,
    category:String,
    language:String,
    imageUrl:String,
    lastFetchDate: Date
};

var Feed = mongoose.model('Feed', FeedSchema, 'feeds');

Feed.createFromURL = function( feedURL , cb) {
    var feedReader = new FeedReader( feedURL );

    feedReader.on('meta', function( meta ) {
        var feed = new Feed({
            url: feedURL,
            title: meta.title,
            description: meta.description,
            lastFetchDate: new Date()
         });

        feed.save( function(err, feed ) {
            if( !err ) {
                // Permet de créer les articles deja lus
                if( feedReader.items.length > 0 ) {
                    feedReader.items.map(function(item) {
                        Article.createFromItem(feed, item);
                    })
                }
                // Créer les articles au fur et a mesure qu'on les lit
                feedReader.on('item', function( item ) {
                    Article.createFromItem(feed, item );
                });
            }
            cb(err, feed );
        } );
    });

    feedReader.read();
}

Feed.prototype.fetchArticles = function( cb ) {
    var feedReader = new FeedReader( this.url );

    var newItems = [];

    feedReader.on('item', function( item ) {
        Article.createFromItem( this, item , function(err, article ) {
            if( !err ) {
                newItems.push( article );
            }
        });
    });

    feedReader.on('end', function() {
        cb( newItems );
    });

    feedReader.read();

    this.lastFetchDate = new Date();
    this.save();
}


module.exports = Feed;