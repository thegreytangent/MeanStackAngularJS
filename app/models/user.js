const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


var UserSchema = new Schema({
    username : { type: String, lowercase: true, required: true},
    password : { type: String, required: true},
    email : { type: String, lowercase: true, required: true},
});

UserSchema.pre('save', function(next) {
   const user = this;
   bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
   })
  
});

UserSchema.methods.comparePasswords = function(password) {
    return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model("User", UserSchema);