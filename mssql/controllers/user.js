var sql		= require(__dirname + '/../lib/mssql'),
	utils	= require(__dirname + '/../lib/utils');

exports.insert = function(req, res, next) {
	var id = utils.uuid();
	var username = req.body.username.trim();
	var password = req.body.password.trim();
	var firstName = req.body.firstName.trim();
	var lastName = req.body.lastName.trim();
	var emailAddress = req.body.emailAddress.trim();
	var role = req.body.role.trim();
	var createdAt = new Date().toISOString();
	var updatedAt = new Date().toISOString();

	var request = new sql.Request();
	request.query("insert into Users(id, username, password, firstName, lastName, emailAddress, role, createdAt, updatedAt)"
		+ " values('"+id+"','"+username+"','" + password + "','"+firstName+"','" + lastName + "','"+emailAddress+"','"+role+"','"+createdAt+"','"+updatedAt+"')",
		function(err, recordset) {
			if (err) return next(err);
		res.status(200).send({'message': 'User successfully created', 'id': id});
	});
};



exports.find = function(req, res, next) {
	var request = new sql.Request();
	request.query("select * from Users",
		function(err, recordset) {
			if (err) return next(err);
		res.status(200).send(recordset);
	});
};


exports.findOne = function(req, res, next) {
	var request = new sql.Request();
	request.query("select * from Users where username='"+req.params.id+"'",
		function(err, recordset) {
			if (err) return next(err);
		if (recordset.length > 0) {
			recordset = recordset[0];
			res.status(200).send(recordset);
		} else {
			res.status(404).send({'message': 'User not found'});
		}
	});
};


exports.update = function(req, res, next) {
	var queryString = "update Users";
	queryString += " " + "set ";
	queryString += " " + req.body.password ? "password='" + req.body.password + "'," : "";
	queryString += " " + req.body.firstName ? "firstName='" + req.body.firstName + "'," : "";
	queryString += " " + req.body.lastName ? "lastName='" + req.body.lastName + "'," : "";
	queryString += " " + req.body.emailAddress ? "emailAddress='" + req.body.emailAddress + "'," : "";
	queryString += " " + req.body.role ? "role='" + req.body.role + "'," : "";
	queryString += " " + "updatedAt='" + new Date().toISOString() + "'";
	queryString += " " + "where id='" + req.params.id + "'";
	console.log(queryString);
	var request = new sql.Request();
	request.query(queryString,
		function(err, recordset) {
			if (err) return next(err);
		res.status(200).send({'message': 'User successfully updated', 'id': req.params.id});
	});
};


exports.remove = function(req, res, next) {
	var queryString = "delete from Users where id='" + req.params.id + "'";
	var request = new sql.Request();
	request.query(queryString,
		function(err, recordset) {
			if (err) return next(err);
		res.status(200).send({'message': 'User successfully removed', 'id': req.params.id});
	});
};