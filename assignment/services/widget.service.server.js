var app = require('../../express');

var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/uploads' });

app.post  ('/api/upload', upload.single('myFile'), uploadImage);
app.post  ('/api/page/:pageId/widget', createWidget);
app.get   ('/api/page/:pageId/widget', findWidgetsByPageId);
app.put   ('/api/page/:pageId/widget', sortWidget);
app.get   ('/api/widget/:widgetId',    findWidgetById);
app.put   ('/api/widget/:widgetId',    updateWidget);
app.delete('/api/widget/:widgetId',    deleteWidget);

var widgets = [
    { '_id': '123', 'widgetType': 'HEADING', 'pageId': '321', 'size': 2, 'text': 'GIZMODO'},
    { '_id': '234', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Lorem ipsum'},
    { '_id': '345', 'widgetType': 'IMAGE', 'pageId': '321', 'width': '100%',
      'url': 'http://lorempixel.com/400/200/'},
    { '_id': '456', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'},
    { '_id': '567', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Lorem ipsum'},
    { '_id': '678', 'widgetType': 'YOUTUBE', 'pageId': '321', 'width': '100%',
      'url': 'https://youtu.be/AM2Ivdi9c4E' },
    { '_id': '789', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'}
];

function uploadImage(req, res) {
    var userId    = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId    = req.body.pageId;
    var widgetId  = req.body.widgetId;
    var width     = req.body.width;
    var myFile    = req.file;

    var originalname = myFile.originalname; // file name on user's computer
    var filename     = myFile.filename;     // new file name in upload folder
    var path         = myFile.path;         // full path of uploaded file
    var destination  = myFile.destination;  // folder where file is saved to
    var size         = myFile.size;
    var mimetype     = myFile.mimetype;

    var widget = getWidgetById(widgetId);
    widget.url = '/uploads/'+filename;

    var callbackUrl = '/assignment/#!/user/'+userId+'/website/'+websiteId+'/widget/'+widgetId;

    res.redirect(callbackUrl);
}

function createWidget(req, res) {
    var widget = req.body;
    widget._id = (new Date()).getTime() + '';
    widget.pageId = req.params['pageId'];
    widgets.push(widget);
    res.send(widget);
}

function findWidgetsByPageId(req, res) {
    var resultSet = [];
    for (var w in widgets) {
        var widget = widgets[w];
        if (widget.pageId === req.params['pageId']) {
            resultSet.push(widget);
        }
    }
    res.json(resultSet);
}

function sortWidget(req, res) {
        var pageId    = req.params['pageId'];
        var old_index = req.query['initial'];
        var new_index = req.query['final'];

        if (old_index < 0) {
            res.sendStatus(400);
            return;
        }

        var widgetsOnPage = [];
        for (var w in widgets) {
            var widget = widgets[w];
            if (widget.pageId == pageId)
                widgetsOnPage.push(widget);
        }

        if (new_index >= widgetsOnPage.length) {
            res.sendStatus(400);
            return;
        }

        widgetsOnPage.splice(new_index, 0, widgetsOnPage.splice(old_index, 1)[0]);

        for (var w in widgetsOnPage) {
            var widget = widgetsOnPage[w];
            var index = widgets.indexOf(widget);
            widgets.splice(index, 1);
            widgets = widgets.concat([widget]);
        }

        res.sendStatus(200);
}

function getWidgetById(widgetId) {
    return widgets.find(function(widget) {
        return widget._id === widgetId;
    });
}

function findWidgetById(req, res) {
    res.json(getWidgetById(req.params['widgetId']));
}

function updateWidget(req, res) {
    var widget = req.body;
    for (var p in widgets) {
        if (widgets[p]._id === req.params['widgetId']) {
            widgets[p] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWidget(req, res) {
    var widget = widgets.find(function(widget) {
        return widget._id === req.params['widgetId']
    });
    var index = widgets.indexOf(widget);
    widgets.splice(index, 1);
    res.sendStatus(200);
}
