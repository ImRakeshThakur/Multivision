var mongoose = require('mongoose'),
  encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
  firstName: {type:String, required:'{PATH} is required!'},
  lastName: {type:String, required:'{PATH} is required!'},
  username: {
    type: String,
    required: '{PATH} is required!',
    unique:true
  },
  salt: {type:String, required:'{PATH} is required!'},
  hashed_Password: {type:String, required:'{PATH} is required!'},
  roles: [String]
});
userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return encrypt.hashPassword(this.salt, passwordToMatch) === this.hashed_Password;
  },
  hasRole: function(role) {
    return this.roles.indexOf(role) > -1;
  }
};
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
  User.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      var salt, hash;
      salt = encrypt.createSalt();
      hash = encrypt.hashPassword(salt, 'Rakesh');
      User.create({firstName:'Rakesh',lastName:'Thakur',username:'rakesh', salt: salt, hashed_Password: hash, roles: ['admin']});
      salt = encrypt.createSalt();
      hash = encrypt.hashPassword(salt, 'Rahul');
      User.create({firstName:'Rahul',lastName:'Thakur',username:'rahul', salt: salt, hashed_Password: hash, roles: []});
      salt = encrypt.createSalt();
      hash = encrypt.hashPassword(salt, 'Sai');
      User.create({firstName:'Sai',lastName:'Thakur',username:'sai', salt: salt, hashed_Password: hash});
    }
  })
};

exports.createDefaultUsers = createDefaultUsers;