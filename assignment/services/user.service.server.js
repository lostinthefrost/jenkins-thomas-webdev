var app              = require('../../express');
var userModel        = require('../model/user/user.model.server');
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt           = require('bcrypt-nodejs');

app.post  ('/api/user', createUser);
app.get   ('/api/user', findUserByCredentials);
app.get   ('/api/user/:userId', findUserById);
app.put   ('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

app.post  ('/api/login', passport.authenticate('WebAppMaker'), login);
app.get   ('/api/loggedin', loggedin);
app.post  ('/api/logout', logout);
app.post  ('/api/register', register);

app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get   ('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/login'
}));

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(function(user) {
            if (user && bcrypt.compareSync(password, user.password))
                return done(null, user);
            return done(null, false);
        }, function(err) {
            if (err) return done(err);
        });
}

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
}

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(function(user) {
            if (user)
                return done(null, user);
            userModel.createUser(profile);
        }, function(err) {
            if (err) return done(err);
        });
}

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function(user) {
            if (user) {
                req.login(user, function(err) {
                    if (err)
                        res.status(400).send(err);
                    else
                        res.json(user);
                });
            }
        });
}


function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function(user) {
            res.json(user);
        });
}

function findUserByUsername(req, res) {
    var username = req.params['username'];
    userModel
        .findUserByUsername(username)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            res.sendStatus(404);
        });
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    userModel
        .findUserByCredentials(username, password)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            res.sendStatus(404);
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            res.sendStatus(404);
        });
}

function updateUser(req, res) {
    var userId = req.params['userId'];
    var user = req.body;
    userModel
        .updateUser(userId, user)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            res.sendStatus(404);
        });
}

function deleteUser(req, res) {
    var userId = req.params['userId'];
    userModel
        .deleteUser(userId)
        .then(function(status) {
            res.sendStatus(200);
        }, function(err) {
            res.sendStatus(404);
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(function(user) {
                done(null, user);
            },
            function(err) {
                done(err, null);
            }
        );
}
