var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// User Constructor
var userSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  last_login_date: {type: Date, default:Date.now()}
  // isAdmin: {type: Boolean, default: false}
});


// Add encryption
userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


// Model export
module.exports = mongoose.model('User', userSchema);
