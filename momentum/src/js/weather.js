import {localization} from './localization.js';

class Weather{
  locales = {
    'en': {
      emptyInput: 'Enter city above',
      cityNotFound: 'City not found',
      city: 'Minsk',
      temperature: 'Temperature',
      windSpeed: 'Wind speed',
      windSpeedUnits: 'm/s',
      humidity: 'Humidity'
    },
    'be': {
      emptyInput: 'Увядзіце горад',
      cityNotFound: 'Горад не знойдзены',
      city: 'Мінск',
      temperature: 'Тэмпература',
      windSpeed: 'Хуткасць ветру',
      windSpeedUnits: 'м/с',
      humidity: 'Вільготнасць'
    }
  }
  constructor({controls, indicators}){
    this.controls = controls;
    this.indicators = indicators;
    this.controls.input.value = localStorage.getItem('weather-city') ?? 'Minsk';
    document.addEventListener('localechange', () => this.getWeather());
    this.controls.input.addEventListener('change', () => {
      this.saveCity(this.controls.input.value);
      this.getWeather();
    });
    this.getWeather();
  }
  saveCity(cityName){
    localStorage.setItem('weather-city', cityName);
  }
  async getWeather(){
    let city;
    if(localStorage.getItem('weather-city') === null){
      this.controls.input.value = this.locales[localization.currentLocale].city;
      city = this.locales[localization.currentLocale].city;
    }
    else{
      city = localStorage.getItem('weather-city');
    }
    if(city === 'Мінск' || city === 'Менск') city = 'Minsk';
    const weatherInfo = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=a67c0757948afec45a256abdb27cb162&q=${city}&lang=${localization.currentLocale}&units=metric`)).json();
    this.indicators.forecast.style.display = 'none';
    this.indicators.weatherError.style.display = 'none';
    if(weatherInfo.cod === 200){
      this.indicators.forecast.style.display = 'block';
      const weatherIconId = weatherInfo.weather[0].id;
      const weatherDescription = weatherInfo.weather[0].description;
      const temp = Math.round(weatherInfo.main.temp);
      const wind = Math.round(weatherInfo.wind.speed);
      const humidity = weatherInfo.main.humidity;

      this.indicators.icon.classList.add(`owf`);
      this.indicators.icon.classList.add(`owf-${weatherIconId}`);

      this.indicators.description.textContent = `${weatherDescription}`;

      this.indicators.temperature.textContent = `${this.locales[localization.currentLocale].temperature}: ${temp}°C`;

      this.indicators.wind.textContent = `${this.locales[localization.currentLocale].windSpeed}: ${wind} ${this.locales[localization.currentLocale].windSpeedUnits}`;

      this.indicators.humidity.textContent = `${this.locales[localization.currentLocale].humidity}: ${humidity}%`;
    }
    else{
      this.indicators.weatherError.style.display = 'block';
      this.indicators.weatherError.textContent = (() => {
        if(weatherInfo.message === 'city not found') return this.locales[localization.currentLocale].cityNotFound;
        else if(weatherInfo.message === 'Nothing to geocode') return this.locales[localization.currentLocale].emptyInput;
        return weatherInfo.message;
      })();
    }
  }
}

export const weather = new Weather({
  controls: {
    input: document.querySelector('#weather-input')
  },
  indicators: {
    forecast: document.querySelector('.weather__forecast'),
    icon: document.querySelector('.weather__icon'),
    description: document.querySelector('.weather__description'),
    temperature: document.querySelector('.weather__temperature'),
    wind: document.querySelector('.weather__wind'),
    humidity: document.querySelector('.weather__humidity'),
    weatherError: document.querySelector('.weather__error')
  }
})