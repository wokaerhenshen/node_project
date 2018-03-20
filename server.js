var express = require("express");	
var cookieParser = require("cookie-parser")
var session = require('express-session')
var validator = require('express-validator')
var path = require("path");
var bodyParser = require("body-parser");
var index = require("./routes/index");
var boats = require("./routes/boats");  
var users = require("./routes/users");  
var config = require('./config');

// adding passport Authentication
const passport = require('passport');
const localStrategy = require('passport-local').Strategy 

function checkAuth (req, res, next) {
	console.log('checkAuth ' + req.url);

	// don't serve /secure to those not logged in
	// you should add to this list, for each and every secure url
	if (req.url === '/secure' && (!req.session || !req.session.authenticated)) {
		res.render('unauthorised', { status: 403 });
		return;
	}

	next();
}

var app = express();

// View engine
var ejsEngine = require("ejs-locals");
app.engine("ejs", ejsEngine);           // support master pages
app.set("view engine", "ejs");          // ejs view engine

// Set static folder
app.use(express.static(path.join(__dirname, "clients")));

// Enable CORS (medium tutorial)
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:4200");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	next();
  });

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(validator())
app.use(cookieParser())
app.use(session({secret: 'max', saveUninitialized: false, resave: false}))
app.use(checkAuth)




app.use("/", index);
app.use("/boats", boats);
app.use("/users", users);


app.listen(config.port, function() {
    console.log("Server started on port " + config.port)
});
