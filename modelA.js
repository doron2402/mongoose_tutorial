
var Schema = require('mongoose').Schema;
var mySchema = Schema({ 
	name: String, 
	createAt: Date, 
	Username: String, 
	Password: String,
	Email: String });

// db is global
module.exports = db.model('MyModel', mySchema);
