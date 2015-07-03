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

app.post('/addMetric', function(req, res) {

  //TODO on POST, send InQueue = Caution + Danger + OK
  //TODO add drop-down select metric
  //TODO add drop-down select date
  //TODO update bins based on metric seleceted

   
    console.log("req.body:" + req.body);
    console.log("req.params:" + req.params);
    
    // var Metric = Parse.Object.extend("metrics");
    // var newMetric = new Metric();

    // console.log("setting newMetric");
    // newMetric.set("Received", req.bodyParser);

    // console.log(3);
    // newMetric.save(null, {
    //   success: function(newMetric) {
    //     // Execute any logic that should take place after the object is saved.
    //     console.log('New object created with objectId: ' + newMetric.id);
    //   },
    //   error: function(newMetric, error) {
    //     // Execute any logic that should take place if the save fails.
    //     // error is a Parse.Error with an error code and message.
    //     console.log('Failed to create new object, with error code: ' + error.message);
    //   }
    // });

  
	res.redirect('/dashboard');
});


app.listen();


