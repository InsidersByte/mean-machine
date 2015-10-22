'use strict';

// grab the packages that we need for the user model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// user schema
const UserSchema = new Schema({
    name: String,
    username: { type: String, required: true, index: { unique: true }},
    password: { type: String, required: true, select: false }
});

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
    let self = this;

    // hash the password only if the password has been changed or user is new
    if (!self.isModified('password')) return next();

    // generate the hash
    bcrypt.hash(self.password, null, null, function(err, hash) {
        if (err) return next(err);

        // change the password to the hashed version
        self.password = hash;
        next();
    });
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
    let self = this;

    return bcrypt.compareSync(password, self.password);
};

// return the model
module.exports = mongoose.model('User', UserSchema);
