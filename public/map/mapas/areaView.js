//Coordinates of Pinggu District, Beijing
var coordinates = []
//console.log('localStorage.my_lat_lon')
//console.log(localStorage.my_lat_lon)
try{
    var cd = JSON.parse(localStorage.my_lat_lon)[0]
}catch(erro){
//console.log(erro)
}


for(const k in cd){
    coordinates.push([cd[k][0],cd[k][1]])
}

//console.log(coordinates)
 

function boa(lon,lat){

    const e = 2.7182818284
    const X = 20037508.34
    
    const lat3857 = lat
    const long3857 = lon
    
    //converting the logitute from epsg 3857 to 4326
    const long4326 = (lat3857*180)/X
    
    //converting the latitude from epsg 3857 to 4326 split in multiple lines for readability
    
    let lat4326 = lat3857/(X / 180)
    const exponent = (Math.PI / 180) * lat4326
    
    lat4326 = Math.atan(e ** exponent)
    lat4326 = lat4326 / (Math.PI / 180)
    lat4326 = lat4326 - 46.63574707207
    
    return [long4326,lat4326]
    }

var coordinatesPolygon = new Array();
//Cycle traversal transfers longitude and latitude to the projection coordinate system of "EPSG:4326"
for (var i = 0; i < coordinates.length; i++) {
var pointTransform = ol.proj.fromLonLat([coordinates[i][0],coordinates[i][1]], "EPSG:3857");
coordinatesPolygon.push(pointTransform);
}
/*
coordinatesPolygon = [
    [-47.062967,-22.909028],
    [-47.061707,-22.908958],
    [-47.062533,-22.908469]
]
*/
//console.log(coordinatesPolygon)
//Tile Layer
var tileLayer = new ol.layer.Tile({
source:new ol.source.OSM()
});
var source = new ol.source.Vector();
//Vector Layer
var vector = new ol.layer.Vector({
source: source,
style: new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgb(0, 123, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
        color: 'rgb(0, 123, 255)',
        width: 2
    }),
    image: new ol.style.Circle({
        radius: 11,
        fill: new ol.style.Fill({
            color: 'rgb(0, 123, 255, 0.2)'
        })
    })
})
});
//The polygon here must be an array of coordinates
var plygon = new ol.geom.Polygon([coordinates])
//Polygon feature class
var feature = new ol.Feature({
geometry: plygon,
});
//console.log(feature);
source.addFeature(feature);
//console.log(vector.getSource().getFeatures().length);
var view=new ol.View({
center:coordinates[0],
zoom: 11,
projection: "EPSG:3857"
});
var map = new ol.Map({
layers: [tileLayer, vector],

view:view,
target: "map"
});