
$.fn.dataTable.TableTools.defaults.aButtons = [ "copy", "csv", "xls" ];
 
$(document).ready(function() {
	var initial_date = window.location.search;
	var set_date 	 = initial_date.replace("?date=",'');
		$("#date_input").val(set_date);
    
	var initial_metric = window.location.search;
	var set_metric 	 = initial_metric.replace("?metric=",'');
		$("#metricSelect").val(set_metric);


    $('#metricsdt').DataTable( {
        dom: 'T<"clear">lfrtip'
    });

    $('#trendsdt').DataTable( {
        dom: 'T<"clear">lfrtip'
    });

    $("#date_input").on("change", function () {
    	window.location.href = "/dashboard?date=" +  this.value;
    });

    $("#metricSelect").on("change", function () {
    	window.location.href = "/trends?metric=" +  this.value;
    	console.log(this.value)
    });

} );
