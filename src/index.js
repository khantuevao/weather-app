import './style.css';



async function getWeather(location) {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=441e235791d46849b89aae5693761c20`, {mode: 'cors'});
    const weatherData = await response.json();
    
    const cityData = (() => {
      const name = weatherData.name;
      const desc = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const wind = weatherData.wind.speed;
    
      return {name, desc, temp, wind};
    })();

    const nameInput = document.getElementById('name');
    nameInput.innerHTML = `city: ${cityData.name}`;

    const descInput = document.getElementById('description');
    descInput.innerHTML = cityData.desc;

    const tempInput = document.getElementById('temperature');
    tempInput.innerHTML = `temp: ${(cityData.temp - 273.15).toFixed(0)} C`;
    const convert = document.getElementById('convert');
    convert.classList.add('visible');
    convert.addEventListener('click', () => {
      if (tempInput.className === 'c') {
        tempInput.classList.remove('c');
        tempInput.classList.add('f');
        tempInput.innerHTML = `temp: ${(1.8 * (cityData.temp - 273) + 32).toFixed(0)} F`;
      } else if (tempInput.className === 'f') {
        tempInput.classList.remove('f');
        tempInput.classList.add('c');
        tempInput.innerHTML = `temp: ${(cityData.temp - 273.15).toFixed(0)} C`;
      }
    })

    const windsInput = document.getElementById('wind');
    windsInput.innerHTML =`wind: ${cityData.wind} m/s`;

  } catch (err) {
    console.log(err);
  }  
}

const getWeatherBtn = document.getElementById('get-weather');
getWeatherBtn.addEventListener('click', () => {
  let cityName = document.getElementById('city');
  getWeather(cityName.value);
  cityName.value = '';
});