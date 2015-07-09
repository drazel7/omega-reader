'use strict';
var Article = require('../models/Article.js');

var articleController = {

    getArticlesFromFeed( req, res, next ) {
        var id = req.params.id;
        if( !id ) {
            var err = new Error('missing id parameter');
            return next( err );
        }

        Article.find({feed: id}, function( err, articleList ) {
            if( err ) return next( err );
            res.json(articleList);
        });
    }

}

module.exports = articleController;