var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserReadsSchema = {
    user: { type: Schema.Types.ObjectId, ref:'Account' },
    articles: [ { type: Schema.Types.ObjectId, ref:'Article' } ]
};

var UserReads = mongoose.model('UserReads', UserReadsSchema, 'userReads');

module.exports = UserReads;