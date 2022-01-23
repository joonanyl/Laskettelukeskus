/*
Tekijät: Aleksi Länkelä ja Joona Nylander. Aleksi teki demosivun jossa haettiin käyttäjän sijainti ja näytettiin sen sää.
Joona muokkasi APIn toimimaan sivun käyttötarkoitukseen.
*/

'use strict';
const ikoniElementtiRuka = document.querySelector('#ruka .weatherikoni');
const ikoniElementtiLevi = document.querySelector('#levi .weatherikoni');
const lampotilaElementtiRuka = document.querySelector('#ruka .lampotila p');
const lampotilaElementtiLevi = document.querySelector('#levi .lampotila p');


// Rukan ja Levin koordinaatit
const coords = [
  66.1690081362218,
  29.16642564990237,
  67.80417221848137,
  24.808682895041365];
const rukaLat = coords[0];
const rukaLng = coords[1];
const leviLat = coords[2];
const leviLng = coords[3];

const weather = {};
weather.temperature = {
  unit: 'celcius',  // Asetetaan lämpötilan mittausyksikkö celciukseksi
};

const kelvinit = 273;
const avain = '9025454b3f1c8837bb18596e196c64b0';

setPosition('ruka');
setPosition('levi');

// Asetetaan sijainti josta lämpötila haetaan. 
function setPosition(keskus) {
  if (keskus == 'ruka') {
    let latitude = rukaLat;
    let longitude = rukaLng;
    getWeather(latitude, longitude);
  } else if (keskus == 'levi') {
    let latitude = leviLat;
    let longitude = leviLng;
    getWeather(latitude, longitude);
  }
}

// Haetaan sää Openweathermap API:lla
function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${avain}`;

  fetch(api).then(function(response) {
    let data = response.json();
    console.log(data);
    return data;

  }).then(function(data) {
    weather.temperature.value = Math.floor(data.main.temp - kelvinit);
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
  }).then(function() {
    if (latitude === rukaLat) {
      displayWeather('ruka');
    } else if (latitude === leviLat) {
      displayWeather('levi');
    }
  });
}

// Tulostetaan sää HTML:ään
function displayWeather(keskus) {
  if (keskus === 'ruka') {
    ikoniElementtiRuka.innerHTML = `<img src="images/icons/${weather.iconId}.png"/>`;
    lampotilaElementtiRuka.innerHTML = `<b>${weather.temperature.value}°<span>C</span></b>`;
  } else if (keskus === 'levi') {
    ikoniElementtiLevi.innerHTML = `<img src="images/icons/${weather.iconId}.png"/>`;
    lampotilaElementtiLevi.innerHTML = `<b>${weather.temperature.value}°<span>C</span></b>`;
  }
}