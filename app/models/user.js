const mongoose = require("mongoose");
const validate = require('mongoose-validator')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const titlize = require('mongoose-title-case');


const nameValidator = [
  validate({
    validator: 'matches',
    arguments: ['^[a-zA-Z-]+$', 'i'],
    message: "The name must not contain special characters"
  })
];

const emailValidator = [
  validate({
    validator: 'isLength',
    arguments: [3,50],
    message: 'Email shoud be {ARGS[0]} to {ARGS[1]}'
  })
];





var UserSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
    validate: nameValidator
  },
  username : {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password : {
    type: String,
    required: true
  },
  email : {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    validate: emailValidator
  },
});



UserSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  })

});


UserSchema.plugin(titlize, {
  paths: [ 'name']
});


UserSchema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.password);
}





module.exports = mongoose.model("User", UserSchema);
