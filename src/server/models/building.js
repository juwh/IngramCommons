/**
 * Created by williamju on 4/10/17.
 */
"use strict";

let mongoose            = require('mongoose'),
    Schema              = mongoose.Schema;

/***************** Room Model *******************/

/* Schema for individual room within building */
let Room = new Schema({
    number: String,
    type: String,
    resident: UniversityPerson,
    floor: Number
});