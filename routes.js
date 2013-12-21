
var model = require('./modelA'),
	_ = require('underscore')

exports.home = function (req, res, next) {
  model.find(function (err, docs) {
    if (err) return next(err);
    res.send(docs);
  })
}

exports.modelName = function (req, res) {
  res.send('my model name is ' + model.modelName);
}

exports.insert = function (req, res, next) {
  model.create({ name: 'inserting ' + Date.now() }, function (err, doc) {
    if (err) return next(err);
    res.send(doc);
  })	
}


exports.login = function(req, res, next){
	var html = '<form method="POST" action="/loginpost"><input type="text" name="username" /><input type="password" name="password" /><input type="submit" value="Create" /></form>';
	res.send(html);
}

//Login post will authenticate the user
exports.loginpost = function(req, res, next){
	var Username = req.body.username
		,Password = req.body.password
		,dbKey = null;

	model.find(function (err, docs) {
	    if (err) 
	    	return next(err);
	    
	    _.each(docs, function(key, val){
			//Check for username and password
		  	if (key.Username == Username && key.Password == Password) {
		    	
		    	console.log('DB Username %s DB Password %s', key.Username, key.Password);
		  		console.log('Post Username %s Post Password %s', Username, Password);
		  		res.json(key);
		  	}
		  	
		});//eo each
		
		res.json({error: "Couldnt find the username or password"});

	}); //eo model.find


}

exports.adduserpost = function(req, res, next){
	var Username = req.body.username
		,Password = req.body.password;

	model.create({ name: 'inserting ' + Date.now(), createAt: Date.now(), Username: Username, Password: Password  }, function(err, doc){
		if (err)
			return next(err);

		res.send(doc)	
	});
	
}

exports.adduser = function(req, res, next){
	var html = '<form method="POST"><input type="text" name="username" /><input type="password" name="password" /><input type="submit" value="Create" /></form>';
	res.send(html);
}

exports.getId = function(req, res, next) {
	var id = req.params.id;

	model.find(function (err, docs) {
	    if (err) 
	    	return next(err);
	    
	    _.each(docs, function(key, val){
			console.log(key._id);
			console.log(id)
		  	if (key._id == id) {
		    	res.json(key);
		  	}
		  	else 
		  	{
		  		res.json(JSON.stringify({
	    			error: "Couldn't find :("
				}));
		  	}

		});   	
	 });

}