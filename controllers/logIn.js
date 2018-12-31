var express = require('express');
var userModel = require.main.require('./models/user-model');
var router = express.Router();

router.get('/', function(request, response){
	response.render('logIn/index', { errors:request.session.errors
                         });
	request.session.errors=null;
});

router.post('/', function(request, response){
	request.check('uname','Invalid username!').notEmpty();
	request.check('pass','Invalid Password!').notEmpty();
	var errors=request.validationErrors();
	if(!errors){
		var user = {
		username : request.body.uname,
		password : request.body.pass
	};
		userModel.validate(user, function(result){
		if(result.type == "Teacher"){
				request.session.un = request.body.uname;
				response.cookie('username', request.body.uname);
				response.cookie('password', request.body.pass);
				response.redirect('/teacher');
		}else if(result.type == "Student"){
				request.session.un = request.body.uname;
				response.cookie('username', request.body.uname);
				response.cookie('password', request.body.pass);
				response.redirect('/student');
		}
		else{
			response.redirect('/login');
		}
	});
	}
	else{
			request.session.errors=errors;
  			response.redirect('/login');
		}

});

module.exports = router;