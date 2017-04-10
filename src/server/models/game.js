/* Copyright G. Hemingway @2017 - All rights reserved */
"use strict";

let mongoose            = require('mongoose'),
    Schema              = mongoose.Schema;

/***************** User Model *******************/

let Game = new Schema({
});

/***************** Registration *******************/

module.exports = mongoose.model('Game', Game);

