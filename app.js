//DECLARATION
var express 		= require('express');
var bodyParser 		= require('body-parser');
var expressValidator= require('express-validator');
var expressSession 	= require('express-session');
var cookieParser 	= require('cookie-parser');
var teacher 		= require('./controllers/teacher/index');
var student 		= require('./controllers/student/index');
var login 			= require('./controllers/logIn');
var logout 			= require('./controllers/logOut');
var app 			= express();

//CONFIGURATION
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(expressSession({secret: 'secret', saveUninitialized: true, resave: false}));
app.use(cookieParser());
app.use(express.static('assets'));
app.use('jQuery-UI', express.static('assets'));

//ROUTING
app.use('/login', login);
app.use('/logout', logout);
app.use('/teacher', teacher);
app.use('/student', student);
app.get('/', function(request, response){
	response.render('index');
});

//SERVER STARTUP
app.listen(2019, function(){
	console.log("Server startead at 2019...");
});