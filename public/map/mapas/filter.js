(window.webpackJsonp = window.webpackJsonp || []).push([
    [44], {
        276: function(e, a, t) {
            "use strict";
            t.r(a);
            var n = t(16),
                r = t(3),
                i = t(25),
                s = t(63),
                o = t(5),
                l = t(2),
                c = t(173),
                d = t(10),
                m = t(4),
                u = new d.a({
                    attributions: "NASA"
                }),
                p = ["^", ["/", ["%", ["+", ["time"],
                    ["interpolate", ["linear"],
                        ["get", "year"], 1850, 0, 2015, 12
                    ]
                ], 12], 12], .5],
                v = {
                    variables: {
                        minYear: 1850,
                        maxYear: 2015
                    },
                    filter: ["between", ["get", "year"],
                        ["var", "minYear"],
                        ["var", "maxYear"]
                    ],
                    symbol: {
                        symbolType: "circle",
                        size: ["*", ["interpolate", ["linear"],
                                ["get", "mass"], 0, 8, 2e5, 26
                            ],
                            ["-", 1.75, ["*", p, .75]]
                        ],
                        color: ["interpolate", ["linear"], p, 0, "#ffe52c", 1, "rgba(242,56,22,0.61)"],
                        opacity: ["-", 1, ["*", p, .75]]
                    }
                },
                y = document.getElementById("min-year"),
                w = document.getElementById("max-year");

            function g() {
                v.variables.minYear = parseInt(y.value), f()
            }

            function b() {
                v.variables.maxYear = parseInt(w.value), f()
            }

            function f() {
                var e = document.getElementById("status");
                e.querySelector("span.min-year").textContent = y.value, e.querySelector("span.max-year").textContent = w.value
            }
            y.addEventListener("input", g), y.addEventListener("change", g), w.addEventListener("input", b), w.addEventListener("change", b), f();
            var x = new XMLHttpRequest;
            x.open("GET", "data/csv/meteorite_landings.csv"), x.onload = function() {
                for (var e, a = x.responseText, t = [], r = a.indexOf("\n") + 1; - 1 != (e = a.indexOf("\n", r));) {
                    var s = a.substr(r, e - r).split(",");
                    r = e + 1;
                    var o = Object(m.g)([parseFloat(s[4]), parseFloat(s[3])]);
                    isNaN(o[0]) || isNaN(o[1]) || t.push(new n.a({
                        mass: parseFloat(s[1]) || 0,
                        year: parseInt(s[2]) || 0,
                        geometry: new i.a(o)
                    }))
                }
                u.addFeatures(t)
            }, x.send();
            var E = new r.a({
                layers: [new o.a({
                    source: new s.a({
                        layer: "toner"
                    })
                }), new c.a({
                    style: v,
                    source: u,
                    disableHitDetection: !0
                })],
                target: document.getElementById("map"),
                view: new l.a({
                    center: [0, 0],
                    zoom: 2
                })
            });
            ! function e() {
                E.render(), window.requestAnimationFrame(e)
            }()
        }
    },
    [
        [276, 0]
    ]
]);
//# sourceMappingURL=filter-points-webgl.js.map