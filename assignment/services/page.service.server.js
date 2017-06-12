var app = require('../../express');
var pageModel = require('../model/page/page.model.server');

app.post  ('/api/website/:websiteId/page', createPage);
app.get   ('/api/website/:websiteId/page', findPagesByWebsiteId);
app.get   ('/api/page/:pageId',            findPageById);
app.put   ('/api/page/:pageId',            updatePage);
app.delete('/api/page/:pageId',            deletePage);

var pages = [
    { '_id': '321', 'name': 'Post 1', 'websiteId': '456', 'description': 'Lorem' },
    { '_id': '432', 'name': 'Post 2', 'websiteId': '456', 'description': 'Lorem' },
    { '_id': '543', 'name': 'Post 3', 'websiteId': '456', 'description': 'Lorem' }
];

function createPage(req, res) {
    var page = req.body;
    pageModel
        .createPage(page)
        .then(function(page) {
            res.json(page);
        });
}

function findPagesByWebsiteId(req, res) {
    var websiteId = req.params['websiteId'];
    pageModel
        .findPagesByWebsiteId(websiteId)
        .then(function(pages) {
            res.json(pages);
        }, function(err) {
            res.sendStatus(404);
        });
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];
    pageModel
        .findPageById(pageId)
        .then(function(page) {
            res.json(page);
        }, function(err) {
            res.sendStatus(404);
        });
}

function updatePage(req, res) {
    var pageId = req.params['pageId'];
    var page = req.body;
    pageModel
        .updatePage(pageId, page)
        .then(function(page) {
            res.json(page);
        }, function(err) {
            res.sendStatus(404);
        });
}

function deletePage(req, res) {
    var pageId = req.params['pageId'];
    pageModel
        .deletePage(pageId)
        .then(function(status) {
            res.sendStatus(200);
        }, function(err) {
            res.sendStatus(404);
        });
}
