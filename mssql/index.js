var express 	= require('express'),
	bodyParser 	= require('body-parser'),
	config 		= require(__dirname + '/config/config'),
	logger 		= require(__dirname + '/lib/logger'),
	mssql 		= require(__dirname + '/lib/mssql'),
	app 		= express();

app.set('port', process.env.PORT || 5000);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require(__dirname + '/lib/cors')('*'));
app.use(require(__dirname + '/config/router')(express.Router(), logger));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});