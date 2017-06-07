var app = require('./express');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(app.express.static(__dirname + '/public'));

var todo = require('./test/app');
todo(app);

require('./assignment/app');

app.listen(process.env.PORT || 3000);
