var express = require('express');
var router = express.Router();

router.get('/', function(request, response){

	request.session.un = "";
	response.redirect('/login');
});

module.exports = router;