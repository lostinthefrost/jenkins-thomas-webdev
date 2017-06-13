var app = require('../../express');
var userModel = require('../model/user/user.model.server');

app.post  ('/api/user', createUser);
app.get   ('/api/user', findUserByCredentials);
app.get   ('/api/user/:userId', findUserById);
app.put   ('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

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
