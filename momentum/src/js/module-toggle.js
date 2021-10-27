import {localization} from './localization.js';

class ModuleToggle{
  locales = {
    'en': {
      'english': 'English',
      'belarusian': 'Belarusian',
      '12hours': '12 Hours',
      '24hours': '24 Hours',
      'time': 'Clocks',
      'date': 'Calendar',
      'greeting': 'Greeting',
      'quotes': 'Quotes',
      'audio-player': 'Audio player',
      'weather': 'Weather forecast'
    },
    'be': {
      'english': 'Англійская',
      'belarusian': 'Беларуская',
      '12hours': '12 гадзін',
      '24hours': '24 гадзіны',
      'time': 'Гадзіннік',
      'date': 'Каляндар',
      'greeting': 'Прывітанне',
      'quotes': 'Цытаты',
      'audio-player': 'Аўдыяплэер',
      'weather': 'Прагноз надвор\'я'
    }
  }
  constructor({controls, indicators}){
    this.controls = controls;
    this.indicators = indicators;
    document.addEventListener('localechange', () => this.localeChanged());
    Object.entries(this.controls).forEach((property) => property[1].addEventListener('change', () => this.saveModulesState(property[0], property[1].checked)));
    Object.entries(this.controls).forEach((property) => property[1].checked = JSON.parse(localStorage.getItem(property[0])) ?? true);
    this.localeChanged();
  }
  localeChanged(){
    this.indicators['lang-be'].textContent = this.locales[localization.currentLocale]['belarusian'];
    this.indicators['lang-en'].textContent = this.locales[localization.currentLocale]['english'];
    this.indicators['clock-system-24'].textContent = this.locales[localization.currentLocale]['24hours'];
    this.indicators['clock-system-12'].textContent = this.locales[localization.currentLocale]['12hours'];
    this.indicators['time'].textContent = this.locales[localization.currentLocale]['time'];
    this.indicators['date'].textContent = this.locales[localization.currentLocale]['date'];
    this.indicators['greeting'].textContent = this.locales[localization.currentLocale]['greeting'];
    this.indicators['quotes'].textContent = this.locales[localization.currentLocale]['quotes'];
    this.indicators['audio-player'].textContent = this.locales[localization.currentLocale]['audio-player'];
    this.indicators['weather'].textContent = this.locales[localization.currentLocale]['weather'];
  }
  saveModulesState(name, isVisible){
    localStorage.setItem(name, isVisible);
  }
}

export const moduleToggle = new ModuleToggle({
  controls: {
    'time': document.querySelector('#time-toggle'),
    'date': document.querySelector('#date-toggle'),
    'greeting': document.querySelector('#greeting-toggle'),
    'quotes': document.querySelector('#quotes-toggle'),
    'audio-player': document.querySelector('#audio-player-toggle'),
    'weather': document.querySelector('#weather-toggle')
  },
  indicators: {
    'lang-be': document.querySelector('#localization-be-label'),
    'lang-en': document.querySelector('#localization-en-label'),
    'clock-system-24': document.querySelector('#clock-system-24-label'),
    'clock-system-12': document.querySelector('#clock-system-12-label'),
    'time': document.querySelector('#time-toggle-label'),
    'date': document.querySelector('#date-toggle-label'),
    'greeting': document.querySelector('#greeting-toggle-label'),
    'quotes': document.querySelector('#quotes-toggle-label'),
    'audio-player': document.querySelector('#audio-player-toggle-label'),
    'weather': document.querySelector('#weather-toggle-label')
  }
});