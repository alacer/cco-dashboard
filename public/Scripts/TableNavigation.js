$(function() {

//Alerts table row selection handling: navigates to specific alert view on-click
//of an alert record
  $('[id*="Overview"] table tbody tr td').on('click', function(e) {
    var initiator = e.target;
    var rowId = $(this).parent('tr').data('objectid');
    if (!$(this).hasClass('non-selectable')) {
      window.location.href = 'trends?metric=' + rowId;
    }
  });

});