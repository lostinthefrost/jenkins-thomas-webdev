var app = require('../../express');

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
    page._id = (new Date()).getTime() + '';
    page.websiteId = req.params['websiteId'];
    pages.push(page);
    res.send(page);
}

function findPagesByWebsiteId(req, res) {
    var resultSet = [];
    for (var p in pages) {
        var page = pages[p];
        if (page.websiteId === req.params['websiteId']) {
            resultSet.push(page);
        }
    }
    res.json(resultSet);
}

function findPageById(req, res) {
    var page = pages.find(function(page) {
        return page._id === req.params['pageId'];
    });
    res.json(page);
}

function updatePage(req, res) {
    var page = req.body;
    for (var p in pages) {
        if (pages[p]._id === req.params['pageId']) {
            pages[p] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req, res) {
    var page = pages.find(function(page) {
        return page._id === req.params['pageId'];
    });
    var index = pages.indexOf(page);
    pages.splice(index, 1);
    res.sendStatus(200);
}
