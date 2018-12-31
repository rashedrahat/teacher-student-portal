var db = require('./db');

module.exports={
	
	get: function(userId, callback){
		var sql = "select * from user where id='"+userId+"'";
		db.getResult(sql, function(result){
			//console.log(result);
			callback(result[0]);
		});
	},

	getAll: function(callback){
		var sql = "SELECT * FROM user WHERE type='Student'";
		db.getResult(sql, function(result){
			callback(result);
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO user values(null,'"+user.name+"','"+user.username+"','"+user.password+"', 'Student')";
		db.execute(sql, function(success){
			callback(success);
		});
	},
	validate: function(user, callback){
		var sql = "select * from user where username='"+user.username+"' and password='"+user.password+"'";
		db.getResult(sql, function(result){
			
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	update: function(user, callback){
		var sql = "UPDATE user set name='"+user.name+"', username='"+user.username+"', password='"+user.password+"', type='"+user.type+"' where id="+user.id;
		
		console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	del: function(userId, callback){
		var sql = "DELETE FROM user where id='"+userId+"'";
		console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	search:function(name,callback)
	{
		var sql="SELECT * from user WHERE username='"+name+"' AND type='Student'";	
		db.getResult(sql, function(result){

				if(result.length>0)
				{
					callback(result);
				}
				else
				{
					
					callback([]);
				}

		});
	}
}