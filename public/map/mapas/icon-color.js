var MAPA, MARCADOR;

 



$("input").on('change', setFilter);

var markers = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
    
        src: '../images/icons/felizz.svg'
      }),
      strokeColor: '#f6b504',
      borderColor: '#f6b504',
      fillColor: '#f6b504'
    })
  });

  
  var marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([-47.020259, -22.927121])));
  
  markers.getSource().addFeature(marker);
 
  

MARCADOR = marker
var layers = [ new ol.layer.Tile({ source: new ol.source.OSM() }) ];
var layer = layers[0];


  // The map
  var map = new ol.Map
    ({	target: 'map',
      view: new ol.View
      ({	zoom: 13,
        center: [-5234271.29,-2623207.53]
      }),
      layers: layers
    });







    map.addLayer(markers );
   
  // Enhance filter
  var enhance = new ol.filter.Colorize({ operation:'enhance', value: 1 });
  layer.addFilter(enhance);

  // Custom filter
  var filter = new ol.filter.Colorize();
  layer.addFilter(filter);




  function setFilter()
  {	enhance.setActive($("#enhance").prop('checked'));
    filter.setActive($("#active").prop('checked'));
    var f = $("#filter").val();
    switch (f)
    {	case 'grayscale':
      case 'invert':
      case 'sepia':
        filter.setFilter(f);
        break;
      default:
        filter.setFilter({ operation:f, red: 192, 
          green:  192, blue: 192, 
          value: Number($("#val").val()),
          });
        break;

    }
  }
  setFilter();


  MAPA = map
//# sourceMappingURL=icon-color.js.map

