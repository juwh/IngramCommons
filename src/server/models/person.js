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

/***************** Export *******************/

module.exports = mongoose.model('UniversityPerson', UniversityPerson);