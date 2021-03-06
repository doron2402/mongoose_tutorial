
var express = require('express'),
	exphbs = require('express3-handlebars'),
	mongoose = require('mongoose'),
	uri = 'mongodb://localhost/mongoose-shared-connection';
	
global.db = mongoose.createConnection(uri);



var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
//Setters
app.set('views', __dirname + '/views');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.locals({
    site: {
        title: 'MongoDBExpressBootstrapHBS',
        description: 'just fuc**** with MongoDB & Node.js',
        name: 'Mongo DB on Node.js (Express)'
    },
    author: {
        name: 'Doron Segal',
        contact: 'doron2402@gmail.com',
        site: 'http://wwww.segaldoron.com'
    }
});

/* Routes */
var routes = require('./routes')
app.get('/', routes.home);
app.get('/insert', routes.insert);
app.get('/name', routes.modelName);
app.get('/getid/:id', routes.getId);
app.get('/signup', routes.adduser);
app.post('/adduser', routes.adduserpost);
app.get('/login', routes.login);
app.post('/authenticate', routes.loginpost);
app.post('/delete/user/:id', routes.deleteUser);
app.get('/contact', routes.contact);
app.get('/about', routes.about);




app.listen(8000, function () {
  console.log('listening on http://localhost:8000');
})

