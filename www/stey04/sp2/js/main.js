const map = L.map('mapid', {
    center: [0, 0],
    /*
    maxBounds: [[-90, -180], [90, 180]],
    maxBoundsViscosity: 0.0,
    */
    worldCopyJump: true,
    zoom: 2,
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    minZoom: 1,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/dark-v10',         // 'mapbox/satellite-streets-v11',     // 'mapbox/streets-v11', //  'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);


const issIcon = L.icon({
    iconUrl: './assets/iss2.png',
    iconSize: [51.2, 51.2],
    popupAnchor: [0, -20],
});

const iss = L.marker([0, 0], { icon: issIcon }).addTo(map).bindPopup("<b>Hello there!</b>");

const moveISS = (lat, long) => {
    iss.setLatLng([lat, long]);
    map.panTo([lat, long], animate = true);
};

const updateISS = () => {
    $.ajax('http://api.open-notify.org/iss-now.json')
        .done(s => {
            let lat = s.iss_position.latitude;
            let long = s.iss_position.longitude;
            moveISS(lat, long);
        })
        .fail(e => console.log('error', e));
    // update ISS position every 8 seconds
    setTimeout(updateISS, 8000);
};

updateISS();