var app = require('../../express');

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
    user._id = (new Date()).getTime() + '';
    users.push(user);
    res.send(user);
}

function findUserByUsername(req, res) {
    // TODO: finish implementation
    var user = users.find(function(user) {
        return user.username === req.params['username'];
    });
    if (typeof user === 'undefined')
        res.sendStatus(404);
    else
        res.json(user);
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    for (var u in users) {
        var user = users[u];
        if (user.username === username && user.password === password) {
            res.json(user);
            return;
        }
    }
    res.sendStatus(404);
}

function findUserById(req, res) {
    var user = users.find(function(user) {
        return user._id === req.params['userId'];
    });
    res.json(user);
}

function updateUser(req, res) {
    var user = req.body;
    for (var u in users) {
        if (users[u]._id === req.params['userId']) {
            users[u] = user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteUser(req, res) {
    var user = users.find(function(user) {
        return user._id === req.params['userId'];
    });
    var index = users.indexOf(user);
    users.splice(index, 1);
    res.sendStatus(200);
}
