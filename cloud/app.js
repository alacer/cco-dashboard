var express = require('express');
var parseExpressHttpsRedirect = require('parse-express-https-redirect');
var parseExpressCookieSession = require('parse-express-cookie-session');
var app = express();
var _ = require('underscore');

app.set('views', 'cloud/views');
app.set('view engine', 'ejs');
app.use(parseExpressHttpsRedirect());  // Require user to be on HTTPS.
app.use(express.bodyParser());

// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

app.use(express.cookieParser('Alacer'));
app.use(parseExpressCookieSession({ cookie: { maxAge: 3600000 } }));

app.get('/', function(req, res) {
	res.render('dashboard.ejs');
});

app.get('/dashboard', function(req, res) {
	var Metric = Parse.Object.extend("metrics");
	var metricQuery = new Parse.Query(Metric);
	var dates = [];
	var percentcaution = [];
	var percentok = [];
	var percentwarning = [];

	if (req.query.date) {
		metricQuery.equalTo("Date", req.query.date);
	};

	// var datedd = document.getElementById("validateSelect");
	// var dateSelected = datedd.options[datedd.selectedIndex].text;
	// metricQuery.equalTo("Date", "2015-06-28");
	metricQuery.find().then(function(results){

/*		for (var i = 0; i < results.length; i++) { 
		  var object = results[i];
		  (function($) {
		      $('#validateSelect').append($("<option></option>")
		     .attr("value",object.get('Date'))
		     .text(object.get('Date'))); 
		      })(jQuery);
		 }*/

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
	});
});

app.get('/trends', function(req, res) {
	var Metric = Parse.Object.extend("metrics");
	var metricQuery = new Parse.Query(Metric);

	var MetricBin = Parse.Object.extend("metric_bin");
	var metricBinQuery = new Parse.Query(MetricBin);

	if (req.query.metric) {
		metricQuery.equalTo("Metric", req.query.metric);
	};
	
	var dates = [];
	var caution = [];
	var ok = [];
	var warning = [];
	var received = [];
	var completed = [];	
	var inqueue = [];		
	var metric_bins = [];
	var percentcaution = [];
	var percentok = [];
	var percentwarning = [];

	metricBinQuery.find().then(function(results){	
		 for (var i=0; i < results.length; i++) {
		 	metric_bins.push(results[i]);
		 }
	});	

	metricQuery.find().then(function(results){

		for (var i=0; i < results.length; i++) {
			dates.push(results[i].get('Date'));
			ok.push(results[i].get('OK'));
			percentok.push(100*results[i].get('OK')/results[i].get('InQueue'));
			percentcaution.push(100*results[i].get('Caution')/results[i].get('InQueue'));
			percentwarning.push(100*results[i].get('Danger')/results[i].get('InQueue'));
			warning.push(results[i].get('Danger'));			
			caution.push(results[i].get('Caution'));
			received.push(results[i].get('Received'));
			completed.push(results[i].get('Completed'));		
			inqueue.push(results[i].get('InQueue'));					
		}
		var unique = dates.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
		res.render('trends.ejs', {metrics: results,
			dates: dates,
			received: received,
			completed: completed,
			inqueue: inqueue,
			ok: ok,
			warning: warning,
			caution: caution,
			metric_bins: metric_bins,
			percentok:percentok, 
			percentcaution:percentcaution,
			percentwarning:percentwarning
		});
	});

});

app.get('/dataentry', function(req, res) {

	var MetricBin = Parse.Object.extend("metric_bin");
	var metricBinQuery = new Parse.Query(MetricBin);
	
	var Metric = Parse.Object.extend("metrics");
	var metricQuery = new Parse.Query(Metric);

	var metric_bins = [];
	var dates = [];
	
	metricBinQuery.find().then(function(results){	
		 for (var i=0; i < results.length; i++) {
		 	metric_bins.push(results[i]);
		 }
	});
		metricQuery.find().then(function(results){
			for (var i=0; i < results.length; i++) {
				dates.push(results[i].get('Date'));
			}
			
			var uniquedates = dates.filter(function(item, x, ar){ return ar.indexOf(item) === x; });
		
			res.render('dataentry.ejs', {metric_bins:metric_bins, dates:uniquedates});

	//	}

	});
	
	// metricQuery.find().then(function(results){
	// 	for (var j=0; j < results.length; j++) {
	// 		dates.push(results[j].get('Date'));
	// 	}
	// 	console.log(JSON.stringify(dates));
	// 	uniquedates = dates.filter(function(item, k, ar){ return ar.indexOf(item) === k; });
	// 	res.render('dataentry.ejs', {metric_bins:metric_bins, dates:uniquedates});
	// });
	
	// Metric names are already unique in the Metric Bin table
	// var uniquemetrics = names.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
	// uniquedates = dates.filter(function(item, k, ar){ return ar.indexOf(item) === k; });
	//console.log(JSON.stringify(dates));
	// res.render('dataentry.ejs', {metrics:metric_bins, dates:uniquedates});
	//res.render('dataentry.ejs', {metric_bins:metric_bins, dates:uniquedates});

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

app.post('/addmetric', function(req, res) {

  //TODO on POST, send InQueue = Caution + Danger + OK
  //TODO add drop-down select metric
  //TODO add drop-down select date
  //TODO update bins based on metric seleceted

   //TODO extract metricForm data from body
	console.log("req.body:" + JSON.stringify(req.body));
   // console.log("req.bodyParser:" + req.bodyParser);
    
	var Metric = Parse.Object.extend("metrics");
	var newMetric = new Metric();

	console.log("adding new metric...");

	newMetric.set("Metric", req.body.metric);
	newMetric.set("Date", req.body.date);
	newMetric.set("Comments", req.body.comments);
    newMetric.set("Received", parseInt(req.body.received));
    newMetric.set("Completed", parseInt(req.body.completed));
    newMetric.set("OK", parseInt(req.body.ok));
    newMetric.set("Caution", parseInt(req.body.caution));
    newMetric.set("Danger", parseInt(req.body.danger));
    newMetric.set("InQueue", parseInt(req.body.ok) + parseInt(req.body.caution) + parseInt(req.body.danger));

    newMetric.save(null, {
    	success: function(newMetric) {
    		alert(newMetric);
    	},
    	error: function(newMetric, error) {
    		alert(error);
    	}
    });

	//res.redirect('/dashboard');
});


app.listen();


