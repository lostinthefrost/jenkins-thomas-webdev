var app = require('./express');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport     = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(app.express.static(__dirname + '/public'));

var todo = require('./test/app');
todo(app);

require('./assignment/app');

app.listen(process.env.PORT || 3000);
