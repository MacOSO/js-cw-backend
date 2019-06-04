const express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    fileUpload = require('express-fileupload');

const mongoURI = 'mongodb://admin:dinamit666@ds151586.mlab.com:51586/cw-store';

mongoose.connect(mongoURI, {useNewUrlParser: true}, function(err) {
    if(err != null) console.log('Error:\n' + err);
});

let gamesRouter = require('./app/games');
let usersRouter = require('./app/users');

let app = express();

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* GET home page. */
app.get('/', function(req, res, next) {
    res.status(418).send({ status: 'FUCK YOU DIRTY HACKER', message: 'FUCKING COURSE WORK, FUCKING JAVA, FUCKING JAVASCRIPT' });
});
app.use('/games', gamesRouter);
app.use('/users', usersRouter);

module.exports = app;
