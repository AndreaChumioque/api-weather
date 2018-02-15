const init = function() {
  let pos, url;
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const apiKey = '8a1a3c60dad5f6ec40cd328804c45a18';
  const mainContainer = document.getElementById('main-container');
  const btnBack = document.getElementById('btn-back');

  btnBack.addEventListener('click', function() {
    window.location.replace('../index.html');
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
        .then(getWeekWeather)
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
    return response.json()
      .then(function(result) {
        return result.daily.data;
      });
  };

  const getWeekWeather = function(data) {
    data.length = 7;
    console.log(data);
    const date = new Date();
    let dayNum = date.getDay();
    console.log(date);
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednedsay', 'Thursday', 'Friday', 'Saturday'];
    const days = document.querySelectorAll('.day');
    for (const day of days) {
      const children = day.children;
      const number = day.getAttribute('id');
      children[0].firstElementChild.setAttribute('src', `../assets/images/${data[number].icon}.svg`);
      children[1].innerText = week[dayNum += 1];
      children[2].innerText = `${((data[number].temperatureLow - 32) / 1.8).toFixed(1)}°`;
      children[3].innerHTML = `${((data[number].temperatureHigh - 32) / 1.8).toFixed(1)}°`;
      if (dayNum === 6) {
        dayNum = 0;
      }
    }
  };

  const displayError = function(error) {
    console.log(error);
  };
};

window.addEventListener('load', init);