window.FlashCanvasOptions = {
  swfPath: '/Common/Scripts/Libraries/FlashCanvas/bin/'
};
yepnope([
  // Libs
  '/Common/Scripts/Libraries/jquery-1.9.1.min.js',
  /* '/Common/Scripts/Libraries/flotr2/lib/bean.js', */
  '/Common/Scripts/Libraries/bean-min.js',
  '/Common/Scripts/Libraries/flotr2/lib/underscore-min.js',
  {
  test : (navigator.appVersion.indexOf("MSIE") != -1  && parseFloat(navigator.appVersion.split("MSIE")[1]) < 9),
    // Load for IE < 9
    yep : [
      '/Common/Scripts/Libraries/FlashCanvas/bin/flashcanvas.js',
      '/Common/Scripts/Libraries/flotr2/lib/base64.js'
    ]
  },
  '/Common/Scripts/Libraries/flotr2/lib/canvas2image.js',
  '/Common/Scripts/Libraries/bonzo.min.js',

  // Flotr
  '/Common/Scripts/Libraries/flotr2/js/Flotr.js',
  '/Common/Scripts/Libraries/flotr2/js/DefaultOptions.js',
  '/Common/Scripts/Libraries/flotr2/js/Color.js',
  '/Common/Scripts/Libraries/flotr2/js/Date.js',
  '/Common/Scripts/Libraries/flotr2/js/DOM.js',
  '/Common/Scripts/Libraries/flotr2/js/EventAdapter.js',
  '/Common/Scripts/Libraries/flotr2/js/Graph.js',
  '/Common/Scripts/Libraries/flotr2/js/Axis.js',
  '/Common/Scripts/Libraries/flotr2/js/Series.js',
  '/Common/Scripts/Libraries/flotr2/js/Text.js',
  '/Common/Scripts/Libraries/flotr2/js/types/lines.js',
  '/Common/Scripts/Libraries/flotr2/js/types/bars.js',
  '/Common/Scripts/Libraries/flotr2/js/types/points.js',
  '/Common/Scripts/Libraries/flotr2/js/plugins/selection.js',
  '/Common/Scripts/Libraries/flotr2/js/plugins/legend.js',
  '/Common/Scripts/Libraries/flotr2/js/plugins/hit.js',
  '/Common/Scripts/Libraries/flotr2/js/plugins/crosshair.js',
  '/Common/Scripts/Libraries/flotr2/js/plugins/labels.js',
  '/Common/Scripts/Libraries/flotr2/js/plugins/legend.js',
  '/Common/Scripts/Libraries/flotr2/js/plugins/titles.js',
  {
    test : ('ontouchstart' in window),
    nope : [
      '/Common/Scripts/Libraries/flotr2/js/plugins/handles.js'
    ]
  },

  // Visualization
  '/Common/Scripts/Libraries/envision/Envision.js',
  '/Common/Scripts/Libraries/envision/Visualization.js',
  '/Common/Scripts/Libraries/envision/Component.js',
  '/Common/Scripts/Libraries/envision/Interaction.js',
  '/Common/Scripts/Libraries/envision/Preprocessor.js',
  '/Common/Scripts/Libraries/envision/templates/namespace.js',
  '/Common/Scripts/Libraries/envision/templates/Finance.js',
  '/Common/Scripts/Libraries/envision/templates/TimeSeries.js',
  '/Common/Scripts/Libraries/envision/templates/Zoom.js',
  '/Common/Scripts/Libraries/envision/actions/namespace.js',
  '/Common/Scripts/Libraries/envision/actions/hit.js',
  '/Common/Scripts/Libraries/envision/actions/selection.js',
  '/Common/Scripts/Libraries/envision/actions/zoom.js',
  '/Common/Scripts/Libraries/envision/adapters/namespace.js',
  '/Common/Scripts/Libraries/envision/adapters/flotr/namespace.js',
  '/Common/Scripts/Libraries/envision/adapters/flotr/defaultOptions.js',
  '/Common/Scripts/Libraries/envision/adapters/flotr/Child.js',
  '/Common/Scripts/Libraries/envision/adapters/flotr/lite-lines.js',
  '/Common/Scripts/Libraries/envision/adapters/flotr/whiskers.js',
  '/Common/Scripts/Libraries/envision/components/namespace.js',
  '/Common/Scripts/Libraries/envision/components/QuadraticDrawing.js',

  { complete : accountActivityTrends }
]);