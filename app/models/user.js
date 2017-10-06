var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    friends: [{ type: Schema.ObjectId, ref: 'User'}]
});

userSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
  });

var User = mongoose.model('User', userSchema);

module.exports = User;
