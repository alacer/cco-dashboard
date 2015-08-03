var sql		= require(__dirname + '/../lib/mssql'),
	utils	= require(__dirname + '/../lib/utils');

exports.insert = function(req, res, next) {
	var id = utils.uuid();
	var name = req.body.name.trim();
	var date = req.body.date.trim();
	var received = parseInt(req.body.received);
	var completed = parseInt(req.body.received);
	var ok = parseInt(req.body.received);
	var caution = parseInt(req.body.received);
	var danger = parseInt(req.body.received);
	var inqueue = ok + caution + danger;
	var createdAt = new Date().toISOString();
	var updatedAt = new Date().toISOString();

	var request = new sql.Request();
	request.query("insert into Metrics(id, name, date, received, completed, ok, caution, danger, inqueue, createdAt, updatedAt)"
		+ " values('"+id+"','"+name+"','" + date + "',"+received+","+completed+","+ok+","+caution+","+danger+","+inqueue+",'"+createdAt+"','" + updatedAt + "')",
		function(err, recordset) {
			if (err) return next(err);
		res.status(200).send({'message': 'Metric successfully created', 'id': id});
	});
};


exports.find = function(req, res, next) {
	var request = new sql.Request();
	request.query("select * from Metrics",
		function(err, recordset) {
			if (err) return next(err);
		res.status(200).send(recordset);
	});
};


exports.findOne = function(req, res, next) {
	var request = new sql.Request();
	request.query("select * from Metrics where id='"+req.params.id+"'",
		function(err, recordset) {
			if (err) return next(err);
		if (recordset.length > 0) {
			recordset = recordset[0];
			res.status(200).send(recordset);
		} else {
			res.status(404).send({'message': 'Metric not found'});
		}
	});
};


exports.update = function(req, res, next) {
	var queryString = "update Metrics";
	queryString += " " + "set";
	queryString += " " + req.body.name ? "name='" + req.body.name + "'," : "";
	queryString += " " + req.body.date ? "date='" + req.body.date + "'," : "";
	queryString += " " + req.body.received 	? 'received=' 	+ parseInt(req.body.received) 	+ "," : "";
	queryString += " " + req.body.completed ? 'completed=' 	+ parseInt(req.body.completed) 	+ "," : "";
	queryString += " " + req.body.ok 		? 'ok=' 		+ parseInt(req.body.ok) 		+ "," : "";
	queryString += " " + req.body.caution 	? 'caution=' 	+ parseInt(req.body.caution)	+ "," : "";
	queryString += " " + req.body.danger 	? 'danger=' 	+ parseInt(req.body.danger) 	+ "," : "";
	queryString += " " + "updatedAt='" + new Date().toISOString() + "'";
	queryString += " " + "where id='" + req.params.id + "'";
	console.log(queryString);
	var request = new sql.Request();
	request.query(queryString,
		function(err, recordset) {
			if (err) return next(err);
		res.status(200).send({'message': 'Metric successfully created', 'id': id});
	});
};


exports.remove = function(req, res, next) {
	var queryString = "delete from Metrics where id='" + req.params.id + "'";
	var request = new sql.Request();
	request.query(queryString,
		function(err, recordset) {
			if (err) return next(err);
		res.status(200).send({'message': 'Metric successfully removed', 'id': id});
	});
};