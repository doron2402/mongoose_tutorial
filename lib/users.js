var model = require('../modelA'),
	_ = require('underscore')

//return false if username not exsist
exports.getUsername = function (Username, next) {
  console.log(Username);

  model.find(function (err, docs) {
    if (err) 
    	return next(err);

    _.each(docs, function(key, val){
      //Check for username and password
        console.log(key.Username);
        if (key.Username == Username) {
          //authenticate the user
          return true;
        }
        
    });//eo each
    
    return false;
  });
}

//check if email exsist in db
exports.getUserEmail = function(Email, next){

  model.find(function(err, docs){
    if (err)  return next(err);

    _.each(docs, function(key, val){
      console.log(key.Email);
      if (key.Email == Email){
        console.log('Found Email return true')
        return true;
      }
    });

    return false;

  });
}
