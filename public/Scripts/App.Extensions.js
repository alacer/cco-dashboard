$(function() {

//Dropdown toggle treatment - stops dropdown with extended content from
//auto-closing on selection
  $('.dropdown-menu').on('click', function(e) {
    if($(this).hasClass('dropdown-menu-form')) {
      e.stopPropagation();
    }
  });
//Dropdown with checkboxes treatment
  $('.dropdown-menu-form input:checkbox').iCheck({
    checkboxClass: 'icheckbox_minimal-blue',
    inheritClass: true
  });

//Inbox preview message click handling
  $('#InboxPreview .inbox-message').on('click', function() {
    var messageId = $(this).attr('id');
    window.location.replace('/Inbox/Default.html?Message=' + messageId);
    return false;
  });

//Add to evidence button handling
  $('.button-evidence').on('click', function(e) {
    e.preventDefault();
  });

//Not yet implemented howl handling (FPO)
  $('.howler').on('click', function(e) {
    e.preventDefault();

    var title = 'This Feature Is Not Yet Implemented';
    var content = 'This feature is TBD and has not yet been implemented for the purposes of this demonstration site.';

    if ($(this).data('howl-title')) {
      title = $(this).data('howl-title');
    }
    if ($(this).data('howl-content')) {
      content = $(this).data('howl-content');
    }

    $.howl ({
      type: $(this).data('type'),
      title: title,
      content: content,
      sticky: $(this).data('sticky'),
      lifetime: 27500,
      iconCls: $(this).data('icon')
    });
  });

});
