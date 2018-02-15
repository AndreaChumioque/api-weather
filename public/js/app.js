const init = function() {
  let pos, url;
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const apiKey = '8a1a3c60dad5f6ec40cd328804c45a18';
  const mainContainer = document.getElementById('main-container');
  const btnWeek = document.getElementById('btn-week');

  btnWeek.addEventListener('click', function() {
    window.location.replace('views/weekly.html');
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      url = `https://api.darksky.net/forecast/${apiKey}/${pos.lat},${pos.lng}`;

      fetch(proxy + url)
        .then(handleError)
        .then(parseJSON)
        .then(getCurrentWeather)
        .catch(displayError);
    });
  } else {
    mainContainer.innerHTML = 'Lo sentimos. Tu navegador no soporta Geolocation.';
  }

  const handleError = function(response) {
    if (!response.ok) {
      throw Error(response.status);
    }
    return response;
  };

  const parseJSON = function(response) {
    return response.json();
  };

  const getCurrentWeather = function(data) {
    console.log(data.currently);
    
    const icon = document.getElementById('icon');
    const temperature = document.getElementById('temperature');
    const wind = document.getElementById('wind');
    const humidity = document.getElementById('humidity');
    const uv = document.getElementById('uv');
    const pressure = document.getElementById('pressure');
    
    icon.setAttribute('src', `assets/images/${data.currently.icon}.svg`);
    temperature.innerText = `${((parseInt(data.currently.temperature) - 32) / 1.8).toFixed(1)}°`;
    console.log(data.currently.temperature);
    wind.innerText = `${data.currently.windSpeed} m/s`;
    humidity.innerText = `${data.currently.humidity * 100}%`;
    uv.innerText = data.currently.uvIndex;
    pressure.innerText = `${data.currently.pressure} hPa`;
  };

  const displayError = function(error) {
    console.log(error);
  };
};

window.addEventListener('load', init);