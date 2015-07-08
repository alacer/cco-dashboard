
$.fn.dataTable.TableTools.defaults.aButtons = [ "copy", "csv", "xls" ];
 
$(document).ready(function() {
	var initial_date = window.location.search;
	var set_date 	 = initial_date.replace("?date=",'');
		$("#date_input").val(set_date);
    
    $('#metricsdt').DataTable( {
        dom: 'T<"clear">lfrtip'
    });

    $('#trendsdt').DataTable( {
        dom: 'T<"clear">lfrtip'
    });

    $("#date_input").on("change", function () {
    	window.location.href = "/dashboard?date=" +  this.value;
    });

} );
