
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
	res.render('pages/login', {
	   				
			});
	
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
		    	//authenticate the user
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
		
		//Check if user exsist
		var users = require('./lib/users.js');
		if (users.getUsername(Username) === false || users.getUserEmail(Email) === false){
			console.log('User doesnt exsist its ok to create one.');

			model.create({ name: Fullname, createAt: Date.now(), Username: Username, Password: Password, Email: Email  }, function(err, doc){
				if (err)
					return next(err);
				res.render('pages/signup', {
		   			db: doc,
		   			userCreated: true
				});
			});
		}else{
			res.render('pages/signup', {
		   		userCreated: false,
		   		error: 'user exsist use different email and username'

			});
		}

		
	
	}

}

exports.adduser = function(req, res, next){
	res.render('pages/signup', {
	   	db: db
	});
}

exports.deleteUser = function(req, res, next){
	var id = req.params.id;
	
	model.findByIdAndRemove(id, function(err, args){
		if (err)
			return err;
		console.log(args);
		
		res.json({response: 'ok', id: args._id});
	})

}

exports.getId = function(req, res, next) {
	var id = req.params.id,
		db;

	model.find(function (err, docs) {
	    if (err) 
	    	return next(err);
	    _.find(docs, function(doc){
	    	
	    	if (id == doc._id)
	    		db = doc;
	    	
	    });
	    
	    res.render('pages/getid', {
		   	db: db
		});


	 });

}


