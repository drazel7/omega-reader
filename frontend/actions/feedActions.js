var Reflux = require('reflux');

var feedActions = Reflux.createActions(
    ['addFeed', 'fetchFeeds']
)

module.exports = feedActions;