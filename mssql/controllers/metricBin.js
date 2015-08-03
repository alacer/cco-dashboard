var sql		= require(__dirname + '/../lib/mssql'),
	utils	= require(__dirname + '/../lib/utils');

exports.insert = function(req, res, next) {
	var id = utils.uuid();
	var metric = req.body.metric.trim();
	var bin1 = req.body.bin1.trim();
	var bin2 = req.body.bin2.trim();
	var bin3 = req.body.bin3.trim();
	var role = req.body.role.trim();
	var createdAt = new Date().toISOString();
	var updatedAt = new Date().toISOString();

	var request = new sql.Request();
	request.query("insert into MetricBins(id, metric, bin1, bin2, bin3, role, createdAt, updatedAt)"
		+ " values('"+id+"','" + metric + "','"+bin1+"','" + bin2 + "','"+bin3+"','"+role+"','"+createdAt+"','"+updatedAt+"')",
		function(err, recordset) {
			if (err) return next(err);
		res.status(200).send({'message': 'Metric successfully created', 'id': id});
	});
};

exports.find = function(req, res, next) {
	var request = new sql.Request();
	request.query("select * from MetricBins",
		function(err, recordset) {
			if (err) return next(err);
		res.status(200).send(recordset);
	});
};


exports.findOne = function(req, res, next) {
	var request = new sql.Request();
	request.query("select * from MetricBins where id='"+req.params.id+"'",
		function(err, recordset) {
			if (err) return next(err);
		if (recordset.length > 0) {
			recordset = recordset[0];
			res.status(200).send(recordset);
		} else {
			res.status(404).send({'message': 'Metric bin not found'});
		}
	});
};


exports.update = function(req, res, next) {
	var queryString = "update MetricBins";
	queryString += " " + "set ";
	queryString += " " + req.body.metric ? "metric='" + req.body.metric + "'," : "";
	queryString += " " + req.body.bin1 ? "bin1='" + req.body.bin1 + "'," : "";
	queryString += " " + req.body.bin2 ? "bin2='" + req.body.bin2 + "'," : "";
	queryString += " " + req.body.bin3 ? "bin3='" + req.body.bin3 + "'," : "";
	queryString += " " + req.body.role ? "role='" + req.body.role + "'," : "";
	queryString += " " + "updatedAt='" + new Date().toISOString() + "'";
	queryString += " " + "where id='" + req.params.id + "'";
	console.log(queryString);
	var request = new sql.Request();
	request.query(queryString,
		function(err, recordset) {
			if (err) return next(err);
		res.status(200).send({'message': 'Metric bin successfully updated', 'id': req.params.id });
	});
};


exports.remove = function(req, res, next) {
	var queryString = "delete from MetricBins where id='" + req.params.id + "'";
	var request = new sql.Request();
	request.query(queryString,
		function(err, recordset) {
			if (err) return next(err);
		res.status(200).send({'message': 'Metric bin successfully removed', 'id': req.params.id });
	});
};