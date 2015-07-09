$(function() {

//Alerts table row selection handling: navigates to specific alert view on-click
//of an alert record
  $('[id*="Alerts"] table tbody tr td').on('click', function(e) {
    var initiator = e.target;
    var alertId = $(this).parent('tr').data('alert-id');
    if (!$(initiator).is('a[href*="AddCommentModal"]') && !$(this).hasClass('non-selectable')) {
      window.location.href = 'Overview.html?AlertID=' + alertId;
    }
  });

});