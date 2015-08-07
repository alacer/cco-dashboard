var details     = null;
var log         = null;
var actions     = null;

var data_size   = 9999999;

var default_date = function () {

    var current_day = new Date(); 
    var day         = current_day.getDate() - current_day.getDay(); 
    var sunday      = new Date(current_day.setDate(day)).toUTCString(); 

    var date        = new Date(sunday);
    var yyyy        = date.getFullYear().toString();
    var mm          = (date.getMonth()+1).toString(); 
    var dd          = date.getDate().toString();
    var new_date    = yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);

    return new_date;
};

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