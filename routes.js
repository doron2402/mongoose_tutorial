
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

exports.getId = function(req, res, next) {
	var id = req.params.id
		,documents = null;

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
