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
	var percentcaution = [];
	var percentok = [];
	var percentwarning = [];

	// var datedd = document.getElementById("validateSelect");
	// var dateSelected = datedd.options[datedd.selectedIndex].text;
	metricQuery.equalTo("Date", "2015-06-28");
	metricQuery.find().then(function(results){
		for (var i=0; i < results.length; i++) {
			dates.push(results[i].get('Date'));
			percentok.push(100*results[i].get('OK')/results[i].get('InQueue'));
			percentcaution.push(100*results[i].get('Caution')/results[i].get('InQueue'));
			percentwarning.push(100*results[i].get('Danger')/results[i].get('InQueue'));
		}
		var unique = dates.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
		res.render('dashboard.ejs', {metrics:results, 
			uniquedates:unique, 
			percentok:percentok, 
			percentcaution:percentcaution,
			percentwarning:percentwarning
		});
	}
	)
});

app.get('/trends', function(req, res) {
	res.render('trends.ejs');
});

app.get('/dataentry', function(req, res) {
	var Metric = Parse.Object.extend("metric");
	var MetricBin = Parse.Object.extend("metric_bin");
	var metricQuery = new Parse.Query(Metric);
	var metricBinQuery = new Parse.Query(MetricBin);

	var names = [];
	var dates = [];
	
	metricBinQuery.find().then(function(results){
		for (var i=0; i < results.length; i++) {
			names.push(results[i].get('Metric'));
	}

	metricQuery.find().then(function(results){
		for (var i=0; i < results.length; i++) {
			dates.push(results[i].get('Date'));
	}

	// var uniquemetrics = names.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
	var uniquedates = dates.filter(function(item, i, ar){ return ar.indexOf(item) === i; });

	res.render('dataentry.ejs', {metrics:names, dates:uniquedates});
		
	})
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

app.get('/addMetric', function(req, res) {

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


