$(function() {

  $('.trend-line').each(function() {

    var trendLineArea = $(this).attr('id');

  //Investigator Status SparkLines graphs
    $('#' + trendLineArea).sparkline('html', {
      tagValuesAttribute: 'alertValues',
      disableHiddenCheck: true,
      height: '25px',
      chartRangeMin: 0,
      chartRangeMax: 50,
      defaultPixelsPerValue: 25,
      numberDigitGroupSep: null,
      tooltipFormat: '<div style="text-align: center; padding-bottom: 3px; border-bottom: 1px solid #ccc; margin-bottom: 3px;"><strong>Alert {{y}}</div>',
      lineColor: 'transparent',
      fillColor: false,
      spotColor: false,
      minSpotColor: false,
      maxSpotColor: false,
      highlightSpotColor: false,
      highlightLineColor: false,
      tooltipOffsetX: -50,
      tooltipOffsetY: 25
    });
    $('#' + trendLineArea).sparkline('html', {
      composite: true,
      tagValuesAttribute: 'dateValues',
      disableHiddenCheck: true,
      height: '25px',
      chartRangeMin: 0,
      chartRangeMax: 50,
      defaultPixelsPerValue: 25,
      tooltipFormatter: function(sparkline, options, fields) {
        var date = new Date(0);
        date.setUTCSeconds(fields.y);
        var
          month = (date.getMonth() + 1),
          day = date.getDate(),
          year = date.getFullYear(),
          hours = date.getHours(),
          minutes = date.getMinutes();
        var formattedDate = month + '/' + day + '/' + year;
        var formattedTime = function() {
          var formattedHours = function() {
            if (hours == 0) hours = '12';
            else if (hours > 12) hours = (hours - 12);
            return hours;
          }
          var formattedMinutes = function() {
            if (minutes < 10) minutes = '0' + minutes;
            return minutes;
          }
          var time = formattedHours() + ':' + formattedMinutes() + ' ' + ((date.getHours() < 12)? 'AM' : 'PM');
          return time;
        }
        return '<div style="text-align: center; padding-bottom: 3px; border-bottom: 1px solid #ccc; margin-bottom: 3px;">' + formattedDate + '<br/>Start time: ' + formattedTime() + '</div>';
      },
      lineColor: 'transparent',
      fillColor: false,
      spotColor: false,
      minSpotColor: false,
      maxSpotColor: false,
      highlightSpotColor: false,
      highlightLineColor: false
    });
    $('#' + trendLineArea).sparkline('html', {
      type: 'line',
      composite: true,
      tagValuesAttribute: 'durationValues',
      disableHiddenCheck: true,
      height: '25px',
      chartRangeMin: 0,
      chartRangeMax: 50,
      defaultPixelsPerValue: 25,
      tooltipFormat: '{{y}} min. triage time',
      lineColor: '#444444',
      fillColor: 'transparent',
      spotColor: '#e5412d',
      minSpotColor: '#e5412d',
      maxSpotColor: '#e5412d',
      highlightSpotColor: '#ff5b3f',
      highlightLineColor: '#ff5b3f'
    });

  });

//Add "View Alert [AlertID]" button on-click of sparkline point
  $('.trend-line').bind('sparklineClick', function(ev) {
    var
      sparkline = ev.sparklines[0],
      region = sparkline.getCurrentRegionFields();
    window.location.replace('Overview.html?AlertID=' + region.y);
  });

});  