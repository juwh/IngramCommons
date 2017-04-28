/**
 * Created by williamju on 4/10/17.
 */
"use strict";

let mongoose            = require('mongoose'),
    Schema              = mongoose.Schema;

/***************** Room Model *******************/

/* Schema for overall building */
let Building = new Schema({
    name: String,
    rooms: [{ type: Schema.ObjectId, ref: 'Room' }],
    coordinates: [ Number ]
});

/***************** Export *******************/

module.exports = mongoose.model('Building', Building);