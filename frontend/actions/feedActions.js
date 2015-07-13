var Reflux = require('reflux');

var feedActions = Reflux.createActions(
    ['addFeed', 'requestList', 'fetchFeed']
)

module.exports = feedActions;