var metric 		= require(__dirname + '/../controllers/metric'),
	metricBin	= require(__dirname + '/../controllers/metricBin'),
	user	= require(__dirname + '/../controllers/user');


module.exports = function(router, logger) {

	router.use(function (err, req, res, next) {
		logger.log('error', err.message || err);
		return next(err);
	});

	router.route('/metrics')
		.post(metric.insert)
		.get(metric.find);

	router.route('/metrics/:id')
		.get(metric.findOne)
		.put(metric.update)
		.delete(metric.remove);

	router.route('/metric-bins')
		.post(metricBin.insert)
		.get(metricBin.find);

	router.route('/metric-bins/:id')
		.get(metricBin.findOne)
		.put(metricBin.update)
		.delete(metricBin.remove);

	router.route('/users')
		.post(user.insert)
		.get(user.find);

	router.route('/users/:id')
		.get(user.findOne)
		.put(user.update)
		.delete(user.remove);


	router.all('*', function (req, res) {
		res.status(200).send({message: 'Welcome'});
	});

	return router;
};