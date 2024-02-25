// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1Ijoic3Nzczc3NzciLCJhIjoiY2xyNmVnOW9uMXIwZDJrbnZxYWVqaW5kNiJ9.1Wv-_Oi7PbMHwezwPdFG5g";

// Define a map object by initialising a Map from Mapbox
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/ssss7777/clsxqrbl4002l01qphsg5g1rq",
  center: [-0.1276, 51.5072],
  zoom: 9
});
const data_url = "https://api.mapbox.com/datasets/v1/ssss7777/clsxqdj3w1jr61lodf9vfb2pj/features?access_token=pk.eyJ1Ijoic3Nzczc3NzciLCJhIjoiY2xyNmVnOW9uMXIwZDJrbnZxYWVqaW5kNiJ9.1Wv-_Oi7PbMHwezwPdFG5g";

map.on('load', () => {
  map.addLayer({
    id: 'venuelayer',
    type: 'circle',
    source: {
      type: 'geojson',
      data: data_url 
    },
    paint: {
      'circle-radius': 4,
      'circle-color': ['match',['get', 'layer'],
'Cinemas','#e41a1c',
'Theatre','#377eb8',
'Commercial galleries','#4daf4a',
/* other */ 'grey'],
      'circle-opacity': 1
    }
  });
  
// This part create an event listener and zooms to the selected point
map.on('click', (event) => {
  const features = map.queryRenderedFeatures(event.point, {
    layers: ['venuelayer'] 
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];
  map.flyTo({
    center: feature.geometry.coordinates, 
    zoom: 15 
  });
  
  //Create a new pop up with the style defined in the CSS as my-popup.
  const popup = new mapboxgl.Popup({ offset: [0, -40], className: "my-popup" })
    .setLngLat(feature.geometry.coordinates) 
    .setHTML(
      `<h3>${feature.properties.name}</h3> 
  <p>${feature.properties.layer}</p>
  <p>${feature.properties.borough_name}</p>
  <p><a href=${feature.properties.website}>Click for more information</a></p>`
    )
    .addTo(map); //Add this pop up to the map.
  
});   
  document.getElementById('filters').addEventListener('change', (event) => {
    
    filterC = ['==', ['get', 'layer'], 'C'];
    
    //for checkbox A, if checked, get category A buildings
    //Else, do nothing
    var checkBoxA = document.getElementById("Cinemas");
    if (checkBoxA.checked == true){
      filterA = ['==', ['get', 'layer'], 'Cinemas'];
    } else {
      filterA = ['==', ['get', 'layer'], 'placeholder'];
    }
    
    //for checkbox B, if checked, get category B buildings
    //Else, do nothing
    var checkBoxB = document.getElementById("Theatre");
    if (checkBoxB.checked == true){
      filterB = ['==', ['get', 'layer'], 'Theatre'];
    } else {
      filterB = ['==', ['get', 'Theatre'], 'placeholder'];
    }  
    
    //for checkbox C, if checked, get category C buildings
    //Else, do nothing
    var checkBoxC = document.getElementById("Commercial galleries");
    if (checkBoxC.checked == true){
      filterC = ['==', ['get', 'layer'], 'Commercial galleries'];
    } else {
      filterC = ['==', ['get', 'layer'], 'placeholder'];
    }   
    
    //Set the filter based on the applied filter rules
    map.setFilter('venuelayer', ['any', filterA,filterB,filterC]);
});

//This changes the cursor when mousing over a point
 map.on('mouseenter', 'venuelayer', (e) => {
map.getCanvas().style.cursor = 'default';
}); 
  
map.on('mouseleave', 'venuelayer', () => {
map.getCanvas().style.cursor = '';
});
  
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken, 
  mapboxgl: mapboxgl, 
  marker: false,
  placeholder: "Search for a place in London", 
  proximity: {
    longitude: -0.1276,
    latitude: 51.5072,
  } 
});

map.addControl(geocoder, "top-right");

 //add the find my location control
map.addControl(new mapboxgl.GeolocateControl());

//add navigation control
map.addControl(new mapboxgl.NavigationControl());

//add fullscreen control
map.addControl(new mapboxgl.FullscreenControl());
 
 });