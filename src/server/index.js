/* Copyright G. Hemingway, @2017 */
'use strict';

let path            = require('path'),
    express         = require('express'),
    bodyParser      = require('body-parser'),
    logger          = require('morgan'),
    mongoose        = require('mongoose'),
    _               = require('underscore');

let port = process.env.PORT ? process.env.PORT : 8080;
let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

/**********************************************************************************************************/

// Setup our Express pipeline
let app = express();
if (env !== 'test') app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose component
mongoose.connect('mongodb://192.168.99.100:32768/campus', err => {
    if (err) console.log(err);
    else console.log('\t MongoDB connected');
});

mongoose.model('buildings', {building: String});

app.get('/buildings', function(req, res) {
    mongoose.model('buildings').find(function(err, buildings) {
        res.send(buildings);
    })
});

// Import our routes
//require('./routes')(app);

/**********************************************************************************************************/

// Run the server itself
let server = app.listen(port, () => {
    console.log('Example app listening on ' + server.address().port);
});