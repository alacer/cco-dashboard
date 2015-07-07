$(function () {

	$('#dp-ex-1').datepicker ()
	$('#dp-ex-2').datepicker ()
	$('#dp-ex-3').datepicker ()
	$('#dp-ex-4').datepicker ()
	$('#dp-ex-5').datepicker ()

	$('#dpStart').datepicker ().on ('changeDate', function (e) {
		$('#dpEnd').datepicker ('setStartDate', e.date);
	})

	$('#dpEnd').datepicker ().on ('changeDate', function (e) {
		$('#dpStart').datepicker ('setEndDate', e.date)
	})

			
})