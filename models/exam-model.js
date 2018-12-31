var db = require('./db');

module.exports={
	
	get: function(examId, callback){
		var sql = "select * from answer where id='"+examId+"'";
		db.getResult(sql, function(result){
			//console.log(result);
			callback(result[0]);
		});
	},

	getAll: function(callback){
		var sql = "SELECT * FROM answer";
		db.getResult(sql, function(result){
			callback(result);
		});
	},
	insert: function(exam, callback){
		var sql = "INSERT INTO answer values(null,'"+exam.q1+"','"+exam.q2+"','"+exam.q3+"','"+exam.q4+"','"+exam.q5+"','"+exam.q6+"','"+exam.q7+"','"+exam.q8+"','"+exam.q9+"','"+exam.q10+"')";
		db.execute(sql, function(success){
			callback(success);
		});
	},
	update: function(exam, callback){
		var sql = "UPDATE answer set ans1='"+exam.q1+"', ans2='"+exam.q2+"', ans3='"+exam.q3+"', ans4='"+exam.q4+"', ans5='"+exam.q5+"', ans6='"+exam.q6+"', ans7='"+exam.q7+"', ans8='"+exam.q8+"', ans9='"+exam.q9+"', ans10='"+exam.q10+"' where id="+exam.id;
		
		console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	del: function(examId, callback){
		var sql = "DELETE FROM answer where id='"+examId+"'";
		console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
}