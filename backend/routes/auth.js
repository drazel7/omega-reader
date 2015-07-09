var express = require('express');
var authController = require('../controllers/authController.js');

var api = express.Router();

api.get('/isLoggedIn', authController.isLoggedIn, function(req, res) {
    console.log('dude');
   var user = req.user;
    res.json({username: user.username});
});
api.post('/login', authController.login );
api.post('/register', authController.register );
api.all('/logout', authController.logout );
module.exports = api;