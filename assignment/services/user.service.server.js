var app = require('../../express');
var userModel = require('./user.model.server');

app.post  ('/api/user', createUser);
app.get   ('/api/user', findUserByCredentials);
app.get   ('/api/user/:userId', findUserById);
app.put   ('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

var users = [
    {_id: '123', username: 'alice',    password: 'alice',    firstName: 'Alice',  lastName: 'Wonder'  },
    {_id: '234', username: 'bob',      password: 'bob',      firstName: 'Bob',    lastName: 'Marley'  },
    {_id: '345', username: 'charly',   password: 'charly',   firstName: 'Charly', lastName: 'Garcia'  },
    {_id: '456', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose',   lastName: 'Annunzi' }
];

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
