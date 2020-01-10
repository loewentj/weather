const cityForm = document.querySelector('form');
const headingAndCity = document.querySelector('.container .heading');
const card = document.querySelector('.card');
const cardImage = document.querySelector('.card img');
const details = document.querySelector('.details');
const time = document.querySelector('.card .time');
const icon = document.querySelector('.icon img');
const forecast = document.querySelector('.carousel-container');
const btnGo = document.querySelector('.btn-go');



const updateUI = (data) => {
  // destructure properties
  const { cityDets, weather } = data;

  // update details template
  headingAndCity.innerHTML = `Weather for ${cityDets.EnglishName}`;
  details.innerHTML = `
    <h5>${cityDets.EnglishName}</h5>
    <div class="details-span">${weather.WeatherText}</div>
    <div class="details-span">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // update the night/day & icon images
  const iconSrc = `${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);
  
  // let timeSrc = null;
  if(weather.IsDayTime){
    // timeSrc = 'day.svg';
    // time.classList.add('day:before');
    time.classList.remove('night');
    time.classList.add('day');
  } else {
    time.classList.remove('day');
    time.classList.add('night');
  }
  // time.setAttribute('src', timeSrc);

  // remove the d-none class if present
  if(card.classList.contains('display-none')){
    card.classList.remove('display-none');
  }
  if(forecast.classList.contains('display-none')){
    forecast.classList.remove('display-none');
  }
};

const updateCity = async (city) => {

  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  return { cityDets, weather };

};

btnGo.addEventListener('click', e => {
  // prevent default action
  e.preventDefault();
  
  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();
  // cityForm.blur();

  // update the ui with new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});