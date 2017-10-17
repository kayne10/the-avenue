var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

var ProfileSchema = new mongoose.Schema({
  name: {type: String, trim:true, default: ''},
  email: {type: String, trim:true, default: ''},
  password: {type: String, default: ''},
  timestamp: {type: Date, default: Date.now}
})

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
ProfileSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 */
ProfileSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});


module.exports = mongoose.model('Profile', ProfileSchema)
