$(function() {

/* ---------------------------------- */
/* Charts Variables                   */
/* ---------------------------------- */
  var
    volumeWeekSeriesOptions = [],
    volumeWeekSeriesCounter = 0,
    volumeWeekSeriesNames = ['Received', 'InQueue', 'Completed'],
    queueWeekSeriesOptions = [],
    queueWeekSeriesCounter = 0,
    queueWeekSeriesNames = ['OK', 'Caution', 'Warning'],    
    colors = App.chartColors,
    teamChartColors = ['#d9534f','#e69900','#9c3','#69c','#96c','#e4784e','#d96600','#3366b2'];

/* ---------------------------------- */
/* Volume Per Week Chart (Default)    */
/* ---------------------------------- */
//Load all of the Volume chart data
  $.each(volumeWeekSeriesNames, function(i, volumeWeekSeriesName) {

//    $.getJSON(Metrics, function(data) {
      var friendlyName, volumeData, yAxis;
      switch (volumeWeekSeriesName) {
        case ('Received'):
          friendlyName = 'Received';
          volumeData = [<%=received%>];
          yAxis = 0;
          break;
        case ('InQueue'):
          friendlyName = 'In Queue';
          volumeData = [<%=inqueue%>];
          yAxis = 0;
          break;
        case ('Completed'):
          friendlyName = 'Completed';
          volumeData = [<%=completed%>];
          yAxis = 0;
          break;

      }
      volumeWeekSeriesOptions[i] = {
        name: friendlyName,
        data: volumeData,
        yAxis: yAxis
      };
      volumeWeekSeriesCounter++;
      if (volumeWeekSeriesCounter == volumeWeekSeriesNames.length) {
        createVolumeChart();
      }
    //});
  });
//Create the Volume chart when all data are loaded
  function createVolumeChart() {
    $('#AlertsPerformance_WeekViews_VolumeChart').highcharts('StockChart', {
      chart: {
        height: 250,
        marginLeft: 35,
        marginRight: 45
      },
      title:{
        text: 'Overall Trend'
      },
      credits: {
        enabled: false
      },
      navigator: {
        enabled: true
      },
      scrollbar: {
        enabled: false
      },
      rangeSelector: {
        enabled: false
      },
      colors: ['#e69900', '#9c3', '#69c', '#669', '#d9534f'],
      navigation: {
        buttonOptions: {
          enabled: true
        }
      },
      plotOptions: {
        series: {
          shadow: true
        }
      },
  //    xAxis: {
  //      type: 'datetime',
  //      dateTimeLabelFormats: {
  //        day: '%m/%d/%y'
  //      },
  //    },
      yAxis: [{
        min: 0,
      //  max: 30,
        labels: {
          formatter: function() {
            return (this.value);
          },
          align: 'right',
          x: -3,
          y: 3
        },
        gridLineColor: '#efefef',
        lineWidth: 1,
        lineColor: '#efefef',
      //  tickPositions: [0, 5, 10, 15, 20, 25, 30],
        minPadding: 0,
        maxPadding: 0.15,
        showFirstLabel: false,
        showLastLabel: false,
        startOnTick: false,
        endOnTick: false
      }],
      tooltip: {
        pointFormat: '<span style="color:{series.color};font-weight:bold;">{series.name}</span>: {point.y} Cases<br/>',
        valueDecimals: 0
      },
      series: volumeWeekSeriesOptions
    });
  }

/* ---------------------------------- */
/* In Queue Chart (Default)    */
/* ---------------------------------- */
//Load all of the Volume chart data
  $.each(queueWeekSeriesNames, function(i, queueWeekSeriesName) {
  // $.getJSON('metricQuery', function(data) {
      var friendlyName, queueData, yAxis;
      switch (queueWeekSeriesName) {
        case ('OK'):
          friendlyName = 'Less Than 1 Day';
          queueData = [<%=ok%>];
          yAxis = 0;
          break;
        case ('Caution'):
          friendlyName = '1 Day to 5 Days';
          queueData = [<%=caution%>];
          yAxis = 0;
          break;
        case ('Warning'):
          friendlyName = 'More Than 5 Days';
          queueData = [<%=warning%>];
          yAxis = 0;
          break;

      }
      queueWeekSeriesOptions[i] = {
        name: friendlyName,
        data: queueData,
        yAxis: yAxis
      };
      queueWeekSeriesCounter++;
      if (queueWeekSeriesCounter == queueWeekSeriesNames.length) {
        createqueueChart();
      }
  // });
  });
//Create the queue chart when all data are loaded
  function createqueueChart() {
    $('#AlertsPerformance_WeekViews_QueueChart').highcharts('StockChart', {
      title: {
        text: 'In Queue Trends'
      },
      chart: {
        height: 250,
        type: 'area',
        marginLeft: 35,
        marginRight: 45
      },
      colors: ['#5cb85c', '#FFF000', '#d9534f'],
      navigation: {
        buttonOptions: {
          enabled: true
        }
      },
      credits: {
        enabled: false
      },
      navigator: {
        enabled: true
      },
      scrollbar: {
        enabled: false
      },
      rangeSelector: {
        enabled: false
      },
      plotOptions: {
        area: {
          stacking: 'percent'
        },
        series: {
          shadow: false
        }
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%m/%d/%y'
        },
      },
      yAxis: [{
        labels: {
          formatter: function() {
            return (this.value);
          },
          align: 'right',
          x: -3,
          y: 3
        },
        gridLineColor: '#efefef',
        lineWidth: 1,
        lineColor: '#efefef',
        tickPositions: [0, 20, 40, 60, 80, 100],
        minPadding: 0,
        maxPadding: 0.15,
        showFirstLabel: false,
        showLastLabel: false,
        startOnTick: false,
        endOnTick: false
      }],
      tooltip: {
        pointFormat: '<span style="color:{series.color};font-weight:bold;">{series.name}</span>: {point.y} Cases<br/>',
        valueDecimals: 0
      },
      series: queueWeekSeriesOptions
    });
  }



});