/* Copyright G. Hemingway @2017 - All rights reserved */
"use strict";

let crypto              = require('crypto'),
    mongoose            = require('mongoose'),
    Schema              = mongoose.Schema;

/***************** User Model *******************/

function gravatarHash(address) {
    if (!address) return '';
    let hash = address.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    hash = hash.toLowerCase();
    return crypto.createHash('md5').update(hash).digest('hex');
}

const makeSalt = () => (
    Math.round((new Date().valueOf() * Math.random())) + ''
);

const encryptPassword = (salt, password) => (
    crypto.createHmac('sha512', salt).update(password).digest('hex')
);

let User = new Schema({
    'username':     { type: String, required: true, index: { unique: true } },
    'first_name':   { type: String },
    'last_name':    { type: String },
    'primary_email':{ type: String, required: true, index: { unique: true } },
    'city':         { type: String },
    'hash':         { type: String, required: true },
    'salt':         { type: String, required: true },
    'games':        { type: Array }
});

User.virtual('password').set(function(password) {
    this.salt = makeSalt();
    this.hash = encryptPassword(this.salt, password);
});

User.method('authenticate', function(plainText) {
    return encryptPassword(this.salt, plainText) === this.hash;
});

User.pre('save', function(next) {
    this.username = this.username.toLowerCase();
    // Sanitize strings
    this.first_name = this.first_name.replace(/<(?:.|\n)*?>/gm, '');
    this.last_name = this.last_name.replace(/<(?:.|\n)*?>/gm, '');
    this.city = this.city.replace(/<(?:.|\n)*?>/gm, '');
    next();
});

/***************** Registration *******************/

module.exports = mongoose.model('User', User);
