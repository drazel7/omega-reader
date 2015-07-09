var Reflux = require('reflux');

var articleActions = Reflux.createActions(
    ['fetchFeedArticles']
)

module.exports = articleActions;