/* globals $, L */

var App = {
  initialize: function () {
    var map = NPMap.config.L;
    var infoLayer = NPMap.config.overlays[1].L;
    var localitiesModuleContent = document.getElementById('npmap-module_Localities').childNodes[1];
    var localities = this.localities;

    map.removeLayer(infoLayer);
    console.log(window.screen.availWidth)
    if (window.screen.availWidth < 426) {
      console.log(window.screen.availWidth)
      NPMap.config.L.closeModules()
    }
    
    for (var key in localities) {
      if (localities.hasOwnProperty(key)) {
        var section = document.createElement('section');
        var title = document.createElement('h3');
        var blurb = document.createElement('p');

        section.setAttribute('id', key);
        title.innerHTML = localities[key]['name'];
        blurb.innerHTML = localities[key]['blurb'];
        section.appendChild(title);
        section.appendChild(blurb);
        localitiesModuleContent.appendChild(section);
      }
    }

    localitiesModuleContent.firstChild.setAttribute('class', 'active');
    localitiesModuleContent.lastChild.style.marginBottom = String(window.innerHeight * 0.50) + 'px';

    map.on('zoom', function () {
      if (map.getZoom() >= 11) {
        map.addLayer(infoLayer);
      } else {
        map.removeLayer(infoLayer);
      }
    });

    localitiesModuleContent.onscroll = function () {
      var localityNames = Object.keys(localities);
      var firstLocality = localitiesModuleContent.childNodes[0];
      var secondLocality = localitiesModuleContent.childNodes[1];

      if (localitiesModuleContent.scrollTop === 0) {
        App.setActiveLocality(firstLocality.getAttribute('id'));
        firstLocality.setAttribute('class', 'active');
        secondLocality.setAttribute('class', '');
      } else if (firstLocality.getBoundingClientRect().bottom < window.innerHeight * 0.25 && firstLocality.getBoundingClientRect().bottom > window.innerHeight * 0.1) {
        App.setActiveLocality(secondLocality.getAttribute('id'));
        firstLocality.setAttribute('class', '');
        secondLocality.setAttribute('class', 'active');
      } else {
        for (var i = 0; i < localityNames.length; i++) {
          var localityName = localityNames[i];
          if (App.isElementOnScreen(localityName)) {
            App.setActiveLocality(localityName);
            break;
          }
        }
      }
    };

    map.removeControl(map.switcherControl);
    map.removeControl(map.homeControl);
    map.removeControl(map.smallzoomControl);
    map.removeControl(map.zoomdisplayControl);
    map.addControl(map.switcherControl);
    map.addControl(map.homeControl);
    map.addControl(map.smallzoomControl);
    map.addControl(map.zoomdisplayControl);
  },
  activeLocalityName: 'solDuc',
  setActiveLocality: function (localityName) {
    if (localityName === App.activeLocalityName) return;

    App.flyToLocality(localityName);
    document.getElementById(localityName).setAttribute('class', 'active');
    document.getElementById(App.activeLocalityName).setAttribute('class', '');
    App.activeLocalityName = localityName;
  },
  isElementOnScreen: function (id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight * 0.60 && bounds.bottom > window.innerHeight * 0.40;
  },
  localities: {
    solDuc: {
      blurb: "Some of this area's most popular attractions are the hot springs, the short hike to majestic Sol Duc Falls, and watching salmon leap at the Salmon Cascades overlook in the fall.  The Sol Duc valley is also the starting point for longer hikes through old-growth forests to subalpine lakes and snowy mountain peaks.",
      coordinates: [
        47.95495566704114,
        -123.83522987365723
      ],
      name: 'Sol Duc Valley',
      zoom: 13
    },
    lakeCrescent: {
      blurb: 'Carved by glaciers, Lake Crescent is deep, clear and beautiful.  The lake is surrounded by mossy old growth forests, hiking trails to waterfalls and scenic peaks, and hugged on one side by the Spruce Railroad Trail, a paved route for easy walking and cycling.',
      coordinates: [
        48.058348493290794,
        -123.80905151367186
      ],
      name: 'Lake Crescent',
      zoom: 13
    },
    elwha: {
      blurb: 'In 2014, one of the largest dam removal and ecosystem restoration projects in national parks history was completed in the Elwha valley. Today, you can see the dam removal sites, witness the return of salmon to their ancestral runs, hike along the newly free river or to Olympic Hot Springs, and visit the historic Eagle Ranger Station.',
      coordinates: [
        48.005572554492545,
        -123.60344409942628
      ],
      name: 'Elwha Valley',
      zoom: 13
    },
    hoh: {
      blurb: 'The Hoh is a lush, canopied temperate rainforest full of coniferous and deciduous trees, mosses, and ferns. Look for Roosevelt Elk sunning along the Hoh River or grazing through alder flats, search for banana slugs and diverse fungi along the trails, and marvel at massive fir, spruce, hemlock, and maple trees.',
      coordinates: [
        47.860282340151514,
        -123.93475055694579
      ],
      name: 'Hoh Rain Forest',
      zoom: 13
    },
    quinault: {
      blurb: 'The Quinault valley is a wilderness gateway to alpine meadows, jeweled lakes and ice-carved peaks. For shorter visits, the scenic loop drive and short trails provide easy access to Quinault’s temperate rain forest, home to rushing waterfalls, massive fir, spruce, and cedars, enchanting moss-covered maple and alder, and a historic homestead.',
      coordinates: [
        47.50775116536684,
        -123.82312774658205
      ],
      name: 'Quinault Rain Forest',
      zoom: 13
    },
    staircase: {
      blurb: 'The southeastern corner of Olympic, the Staircase area is isolated from many of the more visited regions of the park.  Thus set apart and reachable only by a gravel road, the cathedral-like Douglas fir forest and jade waters of the Skokomish River feel like a sanctuary.',
      coordinates: [
        47.516157274759586,
        -123.32942962646484
      ],
      name: 'Staircase',
      zoom: 13
    },
    hurricaneRidge: {
      blurb: 'Most of Olympic\'s mountain peaks are in remote wilderness and can only be reached by hiking, but Hurricane Ridge is one exception.  The ridge is open to cars, reached by a winding, 17-mile road from Port Angeles, with stunning panoramic views, hiking trails, and a visitor center. Open throughout the summer and on weekends during winter (vehicles must carry tire chains). Check road status by calling (360) 565-3131 and visit the webcams to see current conditions.',
      coordinates: [
        47.969891660325715,
        -123.49721789360046
      ],
      name: 'Hurricane Ridge',
      zoom: 13
    },
    deerPark: {
      blurb: 'The road to Deer Park is beautiful but much rougher than the road to Hurricane Ridge, narrow and steep with only nine of its 18 miles paved.  The reward is stunning panoramic mountain views in a relatively quiet and undeveloped setting.  Bring water with you, as there is no potable water at Deer Park.',
      coordinates: [
        47.95110422491874,
        -123.26226711273193
      ],
      name: 'Deer Park',
      zoom: 13
    },
    ozette: {
      blurb: 'From the Ozette area you can explore varied landscapes and rich history.  From the crystal waters of Lake Ozette itself through old growth forests to rocky sea stacks along the coast, this area\'s remoteness makes it feel wild and serene.  Visitors can see seals, gray whales on their migration, and a well-preserved 300-year-old Makah village.',
      coordinates: [
        48.1527594944803,
        -124.66866731643677
      ],
      name: 'Ozette',
      zoom: 13
    },
    moraRialto: {
      blurb: 'Rocky beaches, giant drift logs, pounding waves and views of offshore islands known as \'seastacks\' are features that define Rialto Beach. Just inland is the Mora area, characterized by towering trees, lush undergrowth and the omnipresent roar of the Pacific Ocean in the background.',
      coordinates: [
        47.921044496163354,
        -124.63756442070007
      ],
      name: 'Mora & Rialto Beach',
      zoom: 13
    },
    rubyBeach: {
      blurb: 'The Kalaloch Area coastal waters provide a safe haven for thousands of marine species. Multiple beach access points provide stunning views of sea stacks and the grand Pacific coastline, fascinating tide pools, offshore islands, and marine life of every shape and size.',
      coordinates: [
        47.70968213042844,
        -124.41388964653017
      ],
      name: 'Ruby Beach',
      zoom: 13
    },
    kalaloch: {
      blurb: 'The Kalaloch Area coastal waters provide a safe haven for thousands of marine species. Multiple beach access points provide stunning views of sea stacks and the grand Pacific coastline, fascinating tide pools, offshore islands, and marine life of every shape and size.',
      coordinates: [
        47.607624216217324,
        -124.37283039093016
      ],
      name: 'Kalaloch Beach',
      zoom: 13
    }
  },
  flyToLocality: function (locality) {
    locality = App.localities[locality];
    NPMap.config.L.flyTo(locality.coordinates, locality.zoom, {duration: 2.00, easeLinearity: 0.25});
  }
};

var NPMap = {
  center: {
    lat: 47.8049,
    lng: -123.6703
  },
  description: 'Orientation Map',
  detectAvailablePopupSpace: false,
  div: 'map',
  fullscreenControl: true,
  hashControl: true,
  homeControl: {
    position: 'topright'
  },
  smallzoomControl: {
    position: 'topright'
  },
  baseLayers: [
    'nps-parkTiles3',
    'nps-parkTiles3Imagery',
    'nps-parkTiles3Slate'
  ],
  hooks: {
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
  modules: [{
    content: '',
    icon: 'info',
    title: 'Localities',
    type: 'custom',
    visible: true
  }],
  overlays: [{
    type: 'mapbox',
    id: 'ryanjhodge.eb91f439'
  }, {
    popup: {
      title: '{{name}}',
      description: '<div class="responsive-container"><img src="{{photoURL}}"></div><p><b>Activities:</b> {{activities}}</p><p><b>Services:</b> {{services}}</p> <p><a href="{{webURL}}">Learn More >> </a></p>'
    },
    styles: {
      point: {
        'marker-size': 'large',
        'marker-symbol': 'information-white',
        'marker-library': 'npmapsymbollibrary'
      }
    },
    type: 'geojson',
    url: 'https://raw.githubusercontent.com/ryanjhodge/orientation-map/master/data/localities.geojson'
  }],
  title: 'Olympic National Park',
  zoom: 9,
  zoomdisplayControl: {
    position: 'topright'
  }
};

(function () {
  var s = document.createElement('script');
  s.src = 'https://cdn.rawgit.com/ryanjhodge/npmap/ce25d6d8/npmap-bootstrap.min.js';
  document.body.appendChild(s);
})();
