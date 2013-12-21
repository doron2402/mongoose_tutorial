
var express = require('express'),
	mongoose = require('mongoose'),
	uri = 'mongodb://localhost/mongoose-shared-connection';

global.db = mongoose.createConnection(uri);

var routes = require('./routes')


var app = express();
app.use(express.bodyParser());


app.get('/', routes.home);
app.get('/insert', routes.insert);
app.get('/name', routes.modelName);
app.get('/getid/:id', routes.getId);
app.get('/adduser', routes.adduser);
app.post('/adduser', routes.adduserpost);
app.get('/login', routes.login);
app.post('/loginpost', routes.loginpost);


app.listen(8000, function () {
  console.log('listening on http://localhost:8000');
})
