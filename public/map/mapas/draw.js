
(window.webpackJsonp = window.webpackJsonp || []).push([
    [28], {
        261: function(e, n, a) {
            "use strict";
            a.r(n);
            var o, c, t = a(3),
                r = a(2),
                w = a(11),
                i = a(21),
                s = a(15),
                u = a(48),
                d = a(145),
                l = a(66),
                f = a(150),
                p = a(9),
                m = a(10),
                v = a(5),
                I = a(19),
                g = new v.a({
                    source: new p.b
                }),
                y = new m.a,
                b = new I.a({
                    source: y,
                    style: new w.c({
                        fill: new i.a({
                            color: "rgb(0, 123, 255, 0.2)"
                        }),
                        stroke: new s.a({
                            color: "#007bff",
                            width: 4
                        }),
                        image: new u.a({
                            radius: 7,
                            fill: new i.a({
                                color: "#007bff"
                            })
                        })
                    })
                }),
                h = new t.a({
                    layers: [g, b],
                    target: "map",
                    view: new r.a({
                        center: [-5238914.98, -2621016.46],
                        zoom: 13
                    })
                }),
                k = new d.a({
                    source: y
                });
            h.addInteraction(k);

            var J = document.getElementById("type");
            

       

       

            function z() {
                o = new l.c({
                    source: y,
                    type: J.value
                }), h.addInteraction(o), c = new f.a({
                    source: y
                }), h.addInteraction(c)
               
            }
            J.onchange = function() {
                h.removeInteraction(o), h.removeInteraction(c), z()
                
            }, z() 
            MEU = k
            k.on('drawend', function(event) {
               // console.log(event)
                var geoJsonGeom = new ol.format.GeoJSON();    
                var pp = geoJsonGeom.writeGeometry(event.feature.getGeometry());
              //  console.log(pp);
            });
       
        }
    },
    [
        [261, 0]
    ]
]);
 




  

 
    




