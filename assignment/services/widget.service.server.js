var app = require('../../../express');

var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/uploads' });

app.post ('/api/upload', upload.single('myFile'), uploadImage);

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

    widget = getWidgetById(widgetId);
    widget.url = '/uploads/'+filename;

    var callbackUrl = '/assignment/#/user/'+userId+'/website/'+websiteId+...;

    res.redirect(callbackUrl);
}
...
