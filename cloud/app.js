var express = require('express');
var parseExpressHttpsRedirect = require('parse-express-https-redirect');
var parseExpressCookieSession = require('parse-express-cookie-session');
var app = express();
var _ = require('underscore');

app.set('views', 'cloud/views');
app.set('view engine', 'ejs');
app.use(parseExpressHttpsRedirect());  // Require user to be on HTTPS.
app.use(express.bodyParser());
app.use(express.cookieParser('Alacer'));
app.use(parseExpressCookieSession({ cookie: { maxAge: 3600000 } }));

app.get('/', function(req, res) {
	res.render('dashboard.ejs');
});

app.get('/dashboard', function(req, res) {
	var Metric = Parse.Object.extend("metric");
	var metricQuery = new Parse.Query(Metric);

	
	var dates = [];

	metricQuery.find().then(function(results){
		for (var i=0; i < results.length; i++) {
			dates.push(results[i].get('Date'));
		}
		var unique = dates.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
		console.log(unique);
		res.render('dashboard.ejs', {metrics:results, uniquedates:unique});
	}
	)
});

app.get('/trends', function(req, res) {
	res.render('trends.ejs');
});

app.get('/dataentry', function(req, res) {
	res.render('dataentry.ejs');
});

app.post('/gotodashboard', function(req, res) {
	res.redirect('/dashboard');
});

app.post('/gototrends', function(req, res) {
	res.redirect('/trends');
});

app.post('/gotodataentry', function(req, res) {
	res.redirect('/dataentry');
});

app.post('/update', function(req, res) {
	res.redirect('/update');
});


app.listen();


