/**
 * Created by williamju on 4/10/17.
 */
"use strict";

let mongoose            = require('mongoose'),
    Schema              = mongoose.Schema;

/***************** Room Model *******************/

/* Schema for individual residents within room */
let UniversityPerson = new Schema({
    first_name: String,
    last_name: String,
    year: String,
    major: String
});

/* Schema for individual room within building */
let Room = new Schema({
    number: String,
    type: String,
    residents: [ UniversityPerson ],
    floor: Number,
    coordinates: [ Number ]
});

/* Schema for overall building */
let Building = new Schema({
    name: String,
    rooms: [ Room ],
    coordinates: [ Number ]
});

/***************** Export *******************/

module.exports = mongoose.model('Building', Building);