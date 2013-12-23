
var model = require('./modelA'),
	_ = require('underscore')

exports.home = function (req, res, next) {
  model.find(function (err, docs) {
    if (err) 
    	return next(err);
    res.render('home', {
    	db: docs,
    	helpers: {
            list: function (context, options) { 
        	return "<ul>" + context.map(function(item) {
    		return "<li>" + options.fn(item) + "</li>";
  			}).join("\n") + "</ul>"; }
        }
    });
    
    //res.render(docs);
  })
}

exports.modelName = function (req, res) {
  res.send('my model name is ' + model.modelName);
}

exports.contact = function(req, res){
	res.render('pages/contact', {
	   	db: db
	});
}

exports.about = function(req, res){
	res.render('pages/about', {
	   	db: db
	});
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
	var Username = req.body.user_name
		,Password = req.body.user_password
		,Email = req.body.user_email
		,Fullname = req.body.user_fullname;

	if (Fullname && Email && Password && Username){
		
		model.create({ name: Fullname, createAt: Date.now(), Username: Username, Password: Password, Email: Email  }, function(err, doc){
			if (err)
				return next(err);
			res.render('pages/signup', {
	   			db: doc,
	   			userCreated: true
			});
		});
	
	}

}

exports.adduser = function(req, res, next){
	res.render('pages/signup', {
	   	db: db
	});
}

exports.getId = function(req, res, next) {
	var id = req.params.id,
		db;

	model.find(function (err, docs) {
	    if (err) 
	    	return next(err);
	    _.find(docs, function(doc){
	    	
	    	if (id == doc._id){
	    		console.log(doc);
	    		db = doc;
	    	}
	    		
	    		//res.json(doc);
	    		//return doc;
	    		
	    	
	    });
	    
	    res.render('pages/getid', {
		   	db: db
		});


	 });

}


