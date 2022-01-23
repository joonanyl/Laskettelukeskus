/* Tekijä Joona Nylander */

'use strict';
console.log('maps.js ladattu');
/*
Muuttujat:
kartta, Rukan ja Levin korkeus- ja leveyskoordinaatit, HTML reittiohje-nappielementit, 
ja Directions API:n directionsService ja display.

*/

let map;
let ruka = { lat: 66.1690081362218, lng: 29.16642564990237 }
let levi = { lat: 67.80417221848137, lng: 24.808682895041365 }
const reittiNappiRuka = document.querySelector('#ruka-reitti');
const reittiNappiLevi = document.querySelector('#levi-reitti');
let directionsService;
let directionsDisplay;

// Reittiohjenapeille eventlistenerit jotka suorittaa function getLocation nappia klikatessa.

reittiNappiRuka.addEventListener('click', () => {
  getLocation("ruka");
});
reittiNappiLevi.addEventListener('click', () => {
  getLocation("levi");
});

// getLocation hakee käyttäjän sijainnin ja ohjaa parametrina saamansa keskuksen perusteella reitin sijainnista keskukseen.

function getLocation(keskus) {
  navigator.geolocation.getCurrentPosition(function (position) { // Hakee sijainnin
    let pos = new google.maps.LatLng(position.coords.latitude,   // google.maps.LatLng luo saadut sijaintikoordinaatit muotoon jota maps API käyttää muuttujaan pos.
      position.coords.longitude);
    console.log('Sijainti: ' + position.coords.latitude + ' leveyssuunnassa ja '
      + position.coords.longitude + ' korkeussuunnassa');

    // Määritetään haetaanko reitti rukalle vaiko leville  
    if (keskus == "ruka") {
      initMapRuka(pos, ruka);
    } else if (keskus == "levi") {
      initMapLevi(pos, levi);
    } else {
      console.log("meni jumiin");
    }
  });
}

// initMap funktiot luo karttaelementit valmiiksi jotta alempi script tagi (maps+directions api fetch) voi työntää tiedon suoraan niihin.

function initMapRuka(location, dest) {
  // HTML elementin haku johon kartta luodaan sekä asetukset kartalle, kartta keskittyy käyttäjän sijaintiin
  map = new google.maps.Map(document.querySelector('#map-ruka'), {
    center: location,
    zoom: 6,
  });
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
  let destination = new google.maps.LatLng(dest);
  calcRoute(location, destination);
}

function initMapLevi(location, dest) {
  map = new google.maps.Map(document.querySelector('#map-levi'), {
    center: location,
    zoom: 6,
  });
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
  let destination = new google.maps.LatLng(dest);
  calcRoute(location, destination);
}

// Reitin laskeminen
function calcRoute(start, destination) {
  let request = {
    origin: start, // Lähtösijainti
    destination: destination, // Kohde
    travelMode: google.maps.TravelMode.DRIVING,  // Reitin menotapaa voi muuttaa, niitä on esim. kävely, julkinen liikenne ja ajaminen.
  };
  directionsService.route(request, function (response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
      console.log('Reitin haku onnistui!');
    } else {
      console.log('Reittipyyntö ei onnistunut.');
    }
  });
}

