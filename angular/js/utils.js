var details = null;
var log     = null;
var actions = null;

var get_bins = function (metric, metric_bins) {
	for (var i = 0; i < metric_bins.length; i++) {
		if (metric_bins[i].metric == metric) {
			return metric_bins[i];
		};
	};
};

var get_average = function (sum, value) {
	var set_average = value/sum;
	final_value 	= set_average * 100;
	return final_value;
};

var sort_dates = function (date, date_array) {
    if (date_array.length == 0) {
        return date;
    } else {
        for (var i = 0; i < date_array.length; i++) {
            if (date != date_array[i]) {
                return date;
            } else {
            	// do nothing
            }
        };
    }
};

var set_log = function (user, details, action, status) {
    var full_name = user.firstName + ' ' + user.lastName;

    this.activity_log  = {
        actor       : full_name,
        activity    : action,
        result      : status,
        details     : details
    };
    return this.activity_log;
};