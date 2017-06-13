var app = require('../../express');
var websiteModel = require('../model/website/website.model.server');

app.post  ('/api/user/:userId/website', createWebsite);
app.get   ('/api/user/:userId/website', findWebsitesByUserId);
app.get   ('/api/website/:websiteId',   findWebsiteById);
app.put   ('/api/website/:websiteId',   updateWebsite);
app.delete('/api/website/:websiteId',   deleteWebsite);

function createWebsite(req, res) {
    var userId = req.params['userId'];
    var website = req.body;
    websiteModel
        .createWebsite(userId, website)
        .then(function(website) {
            res.json(website);
        }, function(err) {
            res.sendStatus(404);
        });
}

function findWebsitesByUserId(req, res) {
    var userId = req.params['userId'];
    websiteModel
        .findWebsitesByUserId(userId)
        .then(function(websites) {
            res.json(websites);
        }, function(err) {
            res.sendStatus(404);
        });
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel
        .findWebsiteById(websiteId)
        .then(function(website) {
            res.json(website);
        }, function(err) {
            res.sendStatus(404);
        });
}

function updateWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var website = req.body;
    websiteModel
        .updateWebsite(websiteId, website)
        .then(function(website) {
            res.json(website);
        }, function(err) {
            res.sendStatus(404);
        });
}

function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel
        .updateWebsite(websiteId)
        .then(function(status) {
            res.sendStatus(200);
        }, function(err) {
            res.sendStatus(404);
        });
}
