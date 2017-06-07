var app = require('../../../express');

app.post  ('/api/user/:userId/website', createWebsite);
app.get   ('/api/user/:userId/website', findWebsitesByUserId);
app.get   ('/api/website/:websiteId',   findWebsiteById);
app.put   ('/api/website/:websiteId',   updateWebsite);
app.delete('/api/website/:websiteId',   deleteWebsite);

var websites = [
    { '_id': '123', 'name': 'Facebook',    'developerId': '456', 'description': 'Lorem' },
    { '_id': '234', 'name': 'Tweeter',     'developerId': '456', 'description': 'Lorem' },
    { '_id': '456', 'name': 'Gizmodo',     'developerId': '456', 'description': 'Lorem' },
    { '_id': '890', 'name': 'Go',          'developerId': '123', 'description': 'Lorem' },
    { '_id': '567', 'name': 'Tic Tac Toe', 'developerId': '123', 'description': 'Lorem' },
    { '_id': '678', 'name': 'Checkers',    'developerId': '123', 'description': 'Lorem' },
    { '_id': '789', 'name': 'Chess',       'developerId': '234', 'description': 'Lorem' }
];

function createWebsite(req, res) {
    var website = req.body;
    website._id = (new Date()).getTime() + '';
    website.developerId = req.params['userId'];
    websites.push(website);
    res.send(website);
}

function findWebsitesByUserId(req, res) {
    var resultSet = [];
    for (var w in websites) {
        var website = websites[w];
        if (website.developerId === req.params['userId']) {
            resultSet.push(website);
        }
    }
    res.json(resultSet);
}

function findWebsiteById(req, res) {
    var website = websites.find(function(website) {
        return website._id === req.params['websiteId'];
    });
    res.json(website);
}

function updateWebsite(req, res) {
    var website = req.body;
    for (var w in websites) {
        if (websites[w]._id === req.params['websiteId']) {
            websites[w] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWebsite(req, res) {
    var website = websites.find(function(website) {
        return website._id === req.params['websiteId'];
    });
    var index = websites.indexOf(website);
    websites.splice(index, 1);
    res.sendStatus(200);
}
