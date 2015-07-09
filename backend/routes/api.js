var express = require('express');
var feedController = require('../controllers/feedController.js');
var authController = require('../controllers/authController.js');
var articleController = require('../controllers/articleController.js');

var api = express.Router();

//non protected
api.get('/feed/:id',  feedController.getFeed );

//protected
api.get('/feeds', authController.isLoggedIn, feedController.getUserFeeds );
api.post('/feed/link', authController.isLoggedIn, feedController.link );

// non protected
api.get('/article/feed/:id', articleController.getArticlesFromFeed );

module.exports = api;