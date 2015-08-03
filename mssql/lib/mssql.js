var sql = require('mssql'),
	config = require(__dirname + '/../config/config').db;

sql.connect(config, function(err) {
	if (err) console.log(err);
	
	
	
});

module.exports = sql;