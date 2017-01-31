/* globals $, L */

var App = {
  initialize: function () {},
  localities: {
    soleduck: {
      coordinates: [47.98, -123.88],
      zoom: 11
    },
    lakeCrescent: {
      coordinates: [48.05, -123.82],
      zoom: 13
    },
    elwha: {
      coordinates: [47.98, -123.59],
      zoom: 13
    }
  }
};

var NPMap = {
  baseLayers: [
    'nps-parkTiles3',
    'nps-parkTiles3Imagery',
    'nps-parkTiles3Slate'
  ],
  center: {
    lat: 47.5830,
    lng: -123.4561
  },
  description: 'Orientation Map',
  div: 'map',
  fullscreenControl: true,
  hashControl: true,
  hooks: {
    preinit: function (callback) {
      L.npmap.util._.appendJsFile([
        'https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js'
      ], function () {
        L.npmap.util._.appendJsFile([
          'https://www.nps.gov/lib/bootstrap/3.3.2/js/nps-bootstrap.min.js'
        ], function () {
          L.npmap.util._.appendCssFile([
            'https://www.nps.gov/lib/npmap.js/3.0.18/npmap.min.css'
          ]);
        });
      });
      callback();
    },
    init: function (callback) {
      App.initialize();
      callback();
    }
  },
  // maxBounds: [
  //   [45.310, -127.225],
  //   [49.499, -120.552]
  // ],
  minZoom: 8,
  overlays: [
    // {
    // preset: 'nps-places-pois',
    // unitCodes: [
    //   'olym'
    // ]},
    {
    popup: {
      actions: [{
        handler: function() {
          window.alert('Clicked!');
        },
        text: 'Learn More'
      }],
      title: '{{name}}',
      description: '<p>{{blurb}}</p></br><p><b>Activities:</b> {{activities}}</p><br/><p><b>Services:</b> {{services}}</p>'
    },
    type: 'geojson',
    url: 'https://raw.githubusercontent.com/ryanjhodge/orientation-map/master/localities.geojson',
  }],
  title: 'Olympic National Park',
  zoom: 8,
  zoomdisplayControl: true
};

(function () {
  var s = document.createElement('script');
  s.src = 'https://www.nps.gov/lib/npmap.js/3.0.18/npmap-bootstrap.min.js';
  document.body.appendChild(s);
})();
