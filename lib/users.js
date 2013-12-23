var model = require('../modelA'),
	_ = require('underscore')

/*
  Add user to DB
*/
exports.addUser = function(req, res, next){
  var Username = req.body.user_name
    ,Password = req.body.user_password
    ,Email = req.body.user_email
    ,Fullname = req.body.user_fullname;

    //Search for user name
    model.findOne({ Username: Username }, function (err, doc) {
      if (err)
        return err;
      if (doc){
        if (doc.Email == Email)
          userAlreadyExsist();
        else
          userAlreadyExsist();
      }
      else{
        model.findOne({ Email: Email }, function (err, doc) {
          if (err)  
            return err;
          if (!doc)
            createUser();
          else
            userAlreadyExsist();
        });
      }
        
    });

    function createUser(){
      model.create({ name: Fullname, createAt: Date.now(), Username: Username, Password: Password, Email: Email  }, function(err, doc){
        if (err)
          return next(err);
        res.render('pages/signup', {
            db: doc,
            userCreated: true,
            response: 'User Created!'
        });
      });
    }

    function userAlreadyExsist(){
      console.log('already in use');
      res.render('pages/signup', {
          userCreated: false,
          error: 'user exsist use different email and username'

      });
    }
}
