var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    feed: { type: Schema.Types.ObjectId, ref:'Feed' },
    title:String,
    link:String,
    pubDate:Date,
    description:String,
    guid:String,
    author: String,
    category:String,
    comments:String
});

articleSchema.index({feed: 1, guid: 1}, {unique: true});

var Article = mongoose.model('Article', articleSchema, 'articles');

Article.createFromItem = function( feed, item , cb ) {
    item.feed = feed._id;
    if( !cb ) cb = function() {}

    var article = new Article(item);
    article.save( cb );
}

module.exports = Article;