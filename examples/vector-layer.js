var raster = new ol.layer.Tile({
  source: new ol.source.MapQuestOpenAerial()
});

ol.expr.register('resolution', function() {
  return map.getView().getView2D().getResolution();
});
var vector = new ol.layer.Vector({
  source: new ol.source.Vector({
    parser: new ol.parser.GeoJSON(),
    url: 'data/countries.json'
  }),
  style: new ol.style.Style({rules: [
    new ol.style.Rule({
      symbolizers: [
        new ol.style.Fill({
          color: '#ffffff',
          opacity: 0.3
        }),
        new ol.style.Stroke({
          color: '#319FD3',
          opacity: 1
        })
      ]
    }),
    new ol.style.Rule({
      filter: 'resolution() < 5000',
      symbolizers: [
        new ol.style.Text({
          color: '#ffffff',
          text: ol.expr.parse('name'),
          fontFamily: 'Calibri,sans-serif',
          fontSize: 12
        })
      ]
    })
  ]})
});

var map = new ol.Map({
  layers: [raster, vector],
  renderer: ol.RendererHint.CANVAS,
  target: 'map',
  view: new ol.View2D({
    center: [0, 0],
    zoom: 2
  })
});
