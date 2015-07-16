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
	res.render('login.ejs');
});

app.get('/login', function(req, res) {
	res.render('login.ejs');
});

app.post('/login', function(req,res){
	Parse.User.logIn(req.body.username, req.body.password).then(function() {
	// Login succeeded, redirect to contributors.
	// parseExpressCookieSession will automatically set cookie.
		res.redirect('/dashboard');
		//res.render('contributors-parsetable.ejs');
	},
	function(error) {
		  // Login failed, redirect back to login form.
		  res.redirect('/login');
	});
});

app.get('/dashboard', function(req, res) {
	if(Parse.User.current()){
		var Metric = Parse.Object.extend("metrics");
		var metricQuery = new Parse.Query(Metric);

		var MetricBin = Parse.Object.extend("metric_bin");
		var metricBinQuery = new Parse.Query(MetricBin);

		var dates = [];
		var percentcaution = [];
		var percentok = [];
		var percentwarning = [];
		var metric_bins = [];
		var metric_names = [];
		var metric1data = [];

		metricQuery.ascending("Metric");
		metricBinQuery.ascending("Metric");


		metricBinQuery.find().then(function(results){	
			 for (var i=0; i < results.length; i++) {
			 	metric_bins.push(results[i]);
			 	metric_names.push(results[i].get("Metric"));
	/*		};
			for(j=0; j < metric_names.length; j++){ */
	/*				var test = metricQuery.equalTo("Metric", results[i].get("Metric"));	
					metricQuery.find().then(function(results2){
						metric1data.push(results2[j].get("Received"));
					console.log(metric1data);
					});*/	
			};


		});
		

	/*	console.log(metric_names);
			metricQuery.equalTo("Metric", metric_names[1]);
							//console.log(results);
	*/	
	/*	metricQuery.find().then(function(results){
			//console.log(metric_names);
					for (var j=0; j < results.query("Metric", metric_names[1]).length; j++) {
						metric1data.push(results[j].get("Received"));
					};			 	
		//};
			console.log(metric1data);
		});
			*/
		//console.log(metric1data);

		if (req.query.date) {
			metricQuery.equalTo("Date", req.query.date);
		};
		if(!req.query.date){
			metricQuery.equalTo("Date", "2015-06-21")	
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
				percentwarning:percentwarning,
				metric_bins: metric_bins
			});
		});
	}
	else {
	  // Render a public welcome page, with a link to the '/login' endpoint.
	  res.redirect('/login');
	}		
});

app.get('/trends', function(req, res) {
	if(Parse.User.current()){
		var Metric = Parse.Object.extend("metrics");
		var metricQuery = new Parse.Query(Metric);

		var MetricBin = Parse.Object.extend("metric_bin");
		var metricBinQuery = new Parse.Query(MetricBin);


		
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
		var bin1 = [];
		var bin2 = [];
		var bin3 = [];

		metricBinQuery.find().then(function(results){	
			 for (var i=0; i < results.length; i++) {
			 	metric_bins.push(results[i]);
			 }
		});	

		if (req.query.metric) {
			metricQuery.equalTo("Metric", req.query.metric);
			metricBinQuery.equalTo("Metric", req.query.metric);
			metricBinQuery.find().then(function(results){	
				 for (var i=0; i < results.length; i++) {
				 	bin1.push(results[i].get('Bin1'));
				 	bin2.push(results[i].get('Bin2'));
				 	bin3.push(results[i].get('Bin3'));
				 }
			});
		};

		if(!req.query.metric){
			metricQuery.equalTo("Metric", "BAU GIFTS EDD Alerts, Cases")
			metricBinQuery.find().then(function(results){	
				 	bin1.push(results[0].get('Bin1'));
				 	bin2.push(results[0].get('Bin2'));
				 	bin3.push(results[0].get('Bin3'));
			});			
		};	


		metricQuery.ascending("Date");
		metricQuery.find().then(function(results){

			for (var i=0; i < results.length; i++) {
				dates.push(results[i].get('Date'));
				percentok.push(100*results[i].get('OK')/results[i].get('InQueue'));
				percentcaution.push(100*results[i].get('Caution')/results[i].get('InQueue'));
				percentwarning.push(100*results[i].get('Danger')/results[i].get('InQueue'));
				ok.push('['+Date.parse(results[i].get('Date'))+','+results[i].get('OK')+']');
				warning.push('['+Date.parse(results[i].get('Date'))+','+results[i].get('Danger')+']');			
				caution.push('['+Date.parse(results[i].get('Date'))+','+results[i].get('Caution')+']');
				received.push('['+Date.parse(results[i].get('Date'))+','+results[i].get('Received')+']');
				completed.push('['+Date.parse(results[i].get('Date'))+','+results[i].get('Completed')+']');		
				inqueue.push('['+Date.parse(results[i].get('Date'))+','+results[i].get('InQueue')+']');					
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
				percentwarning:percentwarning,
				bin3: bin3,
				bin2: bin2,
				bin1: bin1
			});
		});
	}
	else {
	  // Render a public welcome page, with a link to the '/login' endpoint.
	  res.redirect('/login');
	}
});

app.get('/dataentry', function(req, res) {
	if(Parse.User.current()){
		var MetricBin = Parse.Object.extend("metric_bin");
		var MetricBin2 = Parse.Object.extend("metric_bin");
		var metricBinQuery = new Parse.Query(MetricBin);
		var metricBinQuery2 = new Parse.Query(MetricBin2);
		
		var Metric = Parse.Object.extend("metrics");
		var metricQuery = new Parse.Query(Metric);

		var metrics 	= { bin1:'OK', bin2:'Caution', bin3:'Warning' };
		var metric_bins = [];
		var dates 		= [];

		if (req.query.metric) {
			var metric_string 	= req.query.metric;
			var new_metric 		= metric_string.replace("%20"," ");
			metricBinQuery2.equalTo("Metric", new_metric);
			metricBinQuery2.find().then(function (results) {
				metrics.bin1 = results[0].get("Bin1") || 'OK';
				metrics.bin2 = results[0].get("Bin2") || 'Caution';
				metrics.bin3 = results[0].get("Bin3") || 'Warning';
			});
			get_metric_bins();
		} else {
			metricBinQuery2.equalTo("Metric", "BAU GIFTS EDD Alerts, Cases");
			metricBinQuery2.find().then(function (results) {
				metrics.bin1 = results[0].get("Bin1") || 'OK';
				metrics.bin2 = results[0].get("Bin2") || 'Caution';
				metrics.bin3 = results[0].get("Bin3") || 'Warning';
			});		
			get_metric_bins();
		};
		
		function get_metric_bins () {
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
				
					res.render('dataentry.ejs', {metric_bins:metric_bins, dates:uniquedates, metrics:metrics});


			//	}

			});
		}
		
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
	}
	else {
	  // Render a public welcome page, with a link to the '/login' endpoint.
	  res.redirect('/login');
	}
});

app.get('/settings', function(req, res) {
	if(Parse.User.current()){
		var MetricBin = Parse.Object.extend("metric_bin");
		var metricBinQuery = new Parse.Query(MetricBin);
		

			metricBinQuery.find().then(function(results){

				res.render('settings.ejs', {
					metric_bins:results
				});
		});
	}
	else {
	  // Render a public welcome page, with a link to the '/login' endpoint.
	  res.redirect('/login');
	}			
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
	if(Parse.User.current()){
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
		console.log(req.body.date);
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
	    		res.redirect('/dataentry#datauploadalert');
	    		//alert(newMetric);
	    	},
	    	error: function(newMetric, error) {
	    		alert(error);
	    	}
	    });
	}
	else {
	  // Render a public welcome page, with a link to the '/login' endpoint.
	  res.redirect('/login');
	}
	//res.redirect('/dashboard');
});

app.get('/logout', function(req, res) {
	Parse.User.logOut();
	res.redirect('/login');
});

app.listen();


