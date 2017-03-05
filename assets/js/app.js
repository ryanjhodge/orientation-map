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
    lat: 47.8049,
    lng: -123.4561
  },
  description: 'Orientation Map',
  detectAvailablePopupSpace: false,
  div: 'map',
  fullscreenControl: true,
  hashControl: true,
  // hooks: {
  //   preinit: function (callback) {
  //     L.npmap.util._.appendJsFile([
  //       'https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js'
  //     ], function () {
  //       L.npmap.util._.appendJsFile([
  //         'https://www.nps.gov/lib/bootstrap/3.3.2/js/nps-bootstrap.min.js'
  //       ], function () {
  //         L.npmap.util._.appendCssFile([
  //           'https://www.nps.gov/lib/npmap.js/3.0.18/npmap.min.css'
  //         ]);
  //       });
  //     });
  //     callback();
  //   },
  //   init: function (callback) {
  //     App.initialize();
  //     callback();
  //   }
  // },
  // maxBounds: [
  //   [45.310, -127.225],
  //   [49.499, -120.552]
  // ],
  minZoom: 8,
  overlays: [{
    type: "mapbox",
    id: "ryanjhodge.eb91f439"
  },{
    popup: {
      actions: [{
        handler: function () {
          var win = window.open("https://youtu.be/5aFYZV_PLJs", '_blank');
          win.focus();
        },
        text: 'Watch a video of the area'
      }],
      title: '{{name}}',
      description: '<img src="{{photoURL}}" style="width:400px;height:168px"><p>{{blurb}}</p></br><p><b>Activities:</b> {{activities}}</p><br/><p><b>Services:</b> {{services}}</p>'
    },
    styles: {
      point: {
        'marker-size': 'medium'
      }
    },
    type: 'geojson',
    url: 'https://raw.githubusercontent.com/ryanjhodge/orientation-map/master/data/localities.geojson'
  }],
  title: 'Olympic National Park',
  zoom: 9,
  zoomdisplayControl: true
};

(function () {
  var s = document.createElement('script');
  s.src = 'https://cdn.rawgit.com/ryanjhodge/npmap/10d6adc0/npmap-bootstrap.min.js';
  document.body.appendChild(s);
})();
