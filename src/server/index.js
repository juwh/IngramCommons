/* Copyright W. Ju, @2017 */
'use strict';

let path            = require('path'),
    express         = require('express'),
    session         = require('express-session'),
    RedisStore      = require('connect-redis')(session),
    bodyParser      = require('body-parser'),
    logger          = require('morgan'),
    mongoose        = require('mongoose');

let port = process.env.PORT ? process.env.PORT : 8080;
let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

/**********************************************************************************************************/

// Setup our Express pipeline
let app = express();
// Setup pipeline logging
if (env !== 'test') app.use(logger('dev'));
// Setup pipeline support for static pages
app.use(express.static(path.join(__dirname, '../../public')));
// Setup pipeline session support
app.use(session({
    name: 'session',
    secret: 'ohhellyes',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: false,
        secure: false
    }
}));
// Finish pipeline setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Connect to mongoBD
let options = { promiseLibrary: require('bluebird') };
mongoose.connect('mongodb://192.168.99.100:32768/juwh', options, err => {
    if (err) console.log(err);
    else console.log('\t MongoDB connected');
});

// Import our Data Models
app.models = {
    UniversityPerson: require('./models/person'),
    Room: require('./models/room'),
    Building: require('./models/building')
};

// Import our API Routes
require('./api/v1/room')(app);
/*
require('./api/v1/game')(app);
require('./api/v1/user')(app);
require('./api/v1/session')(app);
*/

/**********************************************************************************************************/

// Run the server itself
let server = app.listen(port, () => {
    console.log('Example app listening on ' + server.address().port);
});