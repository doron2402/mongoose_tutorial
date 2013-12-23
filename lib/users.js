var model = require('../modelA'),
	_ = require('underscore')

//return false if username not exsist
exports.getUsername = function (Username, next) {

  model.find({ Username: Username}, function(err, docs){
    
    if (err)  
      return next(err);

    console.log(docs.length);
    if (docs.length > 0)
      return true;
    else
      return false;
    
  });

}

//check if email exsist in db
exports.getUserEmail = function(Email, next){

  model.find({ Email: Email}, function(err, docs){
    
    if (err)  
      return next(err);

    console.log(docs.length);
    if (docs.length > 0)
      return true;
    else
      return false;
    
  });

}
