var express = require('express');
var feedController = require('../controllers/feedController.js');
var authController = require('../controllers/authController.js');

var api = express.Router();

api.get('/feed/:id', authController.isLoggedIn,  feedController.getFeed );
api.get('/feeds', authController.isLoggedIn, feedController.getUserFeeds );
api.post('/feed/link', authController.isLoggedIn, feedController.link );

module.exports = api;