var express = require('express');
var examModel = require.main.require('./models/exam-model');
var router = express.Router();

router.get('*', function(request, response, next){
	
	if(request.session.un != ""){
		next();
	}else{
		response.redirect('/login');
	}
});

router.get('/', function(request, response){
	
	examModel.getAll(function(result){
		response.render('student/index', {sessUname: request.session.un});
	});

});

router.get('/examlist', function(request, response){
	
	examModel.getAll(function(result){
		response.render('student/examList', {examList: result});
	});

});

router.get('/edit/:id', function(request, response){
	
		var examId = request.params.id;

		examModel.get(examId, function(result){
			response.render('student/edit', {answer: result});
		});

});

router.post('/edit/:id', function(request, response){
	

		var exam = {
			id 	: request.body.id,
			q1 	: request.body.a1,
			q2 	: request.body.a2,
			q3	: request.body.a3,
			q4  : request.body.a4,
			q5 	: request.body.a5,
			q6 	: request.body.a6,
			q7	: request.body.a7,
			q8  : request.body.a8,
			q9	: request.body.a9,
			q10  : request.body.a10
		};

		console.log(exam);

		examModel.update(exam, function(status){

			if(status){
				
				response.redirect(request.body.id);
			}else{
				response.send('Error');
			}
			
		});

});

router.get('/delete/:id', function(request, response){
	
		var examId = request.params.id;
		examModel.del(examId, function(status){
			if(status){
				
				response.redirect('/student/examlist');
			}else{
			
				response.send('Error to delete!');
			}
		});

});


router.get('/upload', function(request, response){

	response.render('student/upload');
});

router.post('/upload', function(request, response){

	var exam={
			q1 	: request.body.a1,
			q2 	: request.body.a2,
			q3	: request.body.a3,
			q4  : request.body.a4,
			q5 	: request.body.a5,
			q6 	: request.body.a6,
			q7	: request.body.a7,
			q8  : request.body.a8,
			q9	: request.body.a9,
			q10  : request.body.a10
	};

	examModel.insert(exam, function(status){
		
		if(status == true){
			response.redirect('/student/examlist');
		}else{
			response.send('Error in uploading!');
		}
		
	});
});

module.exports = router;