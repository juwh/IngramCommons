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
}, { _id : false });

/* Schema for individual room within building */
let Room = new Schema({
    building: String,
    number: String,
    type: String,
    residents: [ UniversityPerson ],
    floor: Number,
    coordinates: [ Number ]
});

/* Schema for overall building */
let Building = new Schema({
    name: String,
    rooms: [{ type: Schema.ObjectId, ref: 'Room' }],
    coordinates: [ Number ]
});

/***************** Export *******************/

module.exports = mongoose.model('Building', Building);
module.exports = mongoose.model('Room', Room);
module.exports = mongoose.model('UniversityPerson', UniversityPerson);