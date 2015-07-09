
 
$(document).ready(function() {

	var initial_date = window.location.search;
	var set_date 	 = initial_date.replace("?date=",'');
		$("#date_input").val(set_date);
    
	var initial_metric = window.location.search;
	var set_metric 	 = initial_metric.replace("?metric=",'');
		$("#metricTrends").val(set_metric);


    var table = $('#metricsdt').DataTable();
//    var tt = new $.fn.dataTable.TableTools( table, {
//    } );
//    $( tt.fnContainer() );


    $('#trendsdt').DataTable( {
        dom: 'T<"clear">lfrtip'
    });

    $("#date_input").on("change", function () {
    	window.location.href = "/dashboard?date=" +  this.value;
    });

    $("#metricTrends").on("change", function () {
    	window.location.href = "/trends?metric=" +  this.value;
    });

} );
