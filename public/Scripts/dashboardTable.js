
 
$(document).ready(function() {

/*    var $datepicker = $( "#date_input" );
        $datepicker.datepicker();
        $datepicker.datepicker('setDate', new Date("2015-06-21"));*/
   /* $("window").on("load", function(){
        window.location.href = "/dashboard?date=2015-06-21";     
    }); */
   

    $('#dp-ex-3').datepicker ({
        daysOfWeekDisabled: [1,2,3,4,5,6]
    });


   // $('#dp-ex-3').datepicker ("update", '2015-06-21');
    
    $("#date_input").on("change", function () {
        window.location.href = "/dashboard?date=" +  this.value;
    });    



    $("#metricTrends").on("change", function () {
        window.location.href = "/trends?metric=" +  this.value;
    });

  $('[id*="Overview"] table tbody tr td').on('click', function(e) {
    var initiator = e.target;
    var rowId = $(this).parent('tr').data('objectid');
    if (!$(this).hasClass('non-selectable')) {
      window.location.href = 'trends?metric=' + rowId;
    }
  });

  $('[id*="trendTable"] table tbody tr td').on('click', function(e) {
    var initiator = e.target;
    var rowId = $(this).parent('tr').data('objectid');
    if (!$(this).hasClass('non-selectable')) {
      window.location.href = 'dashboard?date=' + rowId;
    }
  });

    if($("#date_input").val()!="2015-06-21"){
	var initial_date = window.location.search;
	var set_date 	 = initial_date.replace("?date=",'');
		$("#date_input").val(set_date);
    };

    if($("#date_input").val()===""){
        $("#date_input").val("2015-06-21")
    };
    
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




} );
