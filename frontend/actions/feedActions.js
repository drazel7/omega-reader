var Reflux = require('reflux');

var feedActions = Reflux.createActions(
    ['addFeed', 'fetchFeeds', 'fetchFeed']
)

module.exports = feedActions;