var express = require('express'),
	stylus = require('stylus'),
	morgan = require('morgan'),
	bodyparser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	passport = require('passport'),
	session = require('express-session');	

module.exports = function(app, config){
function compile(str, path) {
	return stylus(str).set('filename', path);
}

app.set('views', config.rootPath + '/server/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyparser());
app.use(session({secret:'Coldplay'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(stylus.middleware(
	{
		src: config.rootPath + '/public', 
		compile: compile
	}
));
app.use(express.static(config.rootPath + '/public'));
}