/**
 * Created by williamju on 4/10/17.
 */
"use strict";

let mongoose            = require('mongoose'),
    Schema              = mongoose.Schema;

/***************** Room Model *******************/

/* Schema for individual residents within room */
let Resident = new Schema({
    first_name: String,
    last_name: String,
    year: String,
    major: String
});

/* Schema for individual room within building */
let Room = new Schema({
    building: { type: String },
    number: { type: String },
    type: { type: String },
    residents: { type: [ Resident ] },
    floor: { type: Number },
    coordinates: { type: [ Number ] }
});

/***************** Export *******************/

module.exports = mongoose.model('Room', Room);