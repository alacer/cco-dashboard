
$.fn.dataTable.TableTools.defaults.aButtons = [ "copy", "csv", "xls" ];
 
$(document).ready(function() {
    $('#metricsdt').DataTable( {
        dom: 'T<"clear">lfrtip'
    } );

    $('#trendsdt').DataTable( {
        dom: 'T<"clear">lfrtip'
    } );
} );
