var express = require('express');
var userModel = require.main.require('./models/user-model');
var router = express.Router();

router.get('*', function(request, response, next){
	
	if(request.session.un != ""){
		next();
	}else{
		response.redirect('/login');
	}
});

router.get('/', function(request, response){
	
	userModel.getAll(function(result){
		response.render('teacher/index', {sessUname: request.session.un});
	});

});

router.get('/studentlist', function(request, response){
	
	userModel.getAll(function(result){
		response.render('teacher/studentList', {studentList: result});
	});

});

router.get('/edit/:id', function(request, response){
	
		var userId = request.params.id;

		userModel.get(userId, function(result){
			response.render('teacher/edit', {user: result});
		});

});

router.post('/edit/:id', function(request, response){
	

		var user = {
			id 		: request.body.id,
			name 	: request.body.name,
			username: request.body.uname,
			password: request.body.pass,
			type	: request.body.user

		};

		console.log(user);

		userModel.update(user, function(status){

			if(status){
				
				response.redirect(request.body.id);
			}else{
				response.send('Error');
			}
			
		});

});

router.get('/delete/:id', function(request, response){
	
		var userId = request.params.id;
		userModel.del(userId, function(status){
			if(status){
				
				response.redirect('/teacher/studentList');
			}else{
			
				response.send('Error to delete!');
			}
		});

});

router.get('/addstudent', function(request, response){

	response.render('teacher/create', { errors:request.session.errors
                         });
	request.session.errors=null;
});

router.post('/addstudent', function(request, response){
	request.check('name','Invalid Name!').notEmpty();
	request.check('uname','Invalid Username!').notEmpty();
	request.check('pass','Invalid Password!').notEmpty();
	request.check('user','Invalid User Type!').notEmpty();
	var errors=request.validationErrors();
	if(!errors){
	var user={
		name 	: request.body.name,
		username: request.body.uname,
		password: request.body.pass,
		type	: request.body.user
	};

	userModel.insert(user, function(status){
		
		if(status == true){
			response.redirect('/teacher/studentlist');
		}else{
			response.send('Error in adding student!');
		}
		
	});
  }
  else{
  		request.session.errors=errors;
  		response.redirect('/teacher/addstudent');
  }
});

router.post('/getresult',function(requset,response){
	var name = requset.body.name;
	userModel.search(name, function(result){
		if(result.length>0)
		{
			console.log(result);
			response.send(result[0]);
		}
		else
		{
			response.send("Sorry, Not found!");
		}
	});
	
	
});

module.exports = router;