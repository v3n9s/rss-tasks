import {localization} from './localization.js';

class ModuleToggle{
  locales = {
    'en': {
      'english': 'English',
      'belarusian': 'Belarusian',
      '12hours': '12 Hours',
      '24hours': '24 Hours',
      'datetime-and-greeting': 'Calendar and greeting',
      'quotes': 'Quotes',
      'audio-player': 'Audio player',
      'weather': 'Weather forecast'
    },
    'be': {
      'english': 'Англійская',
      'belarusian': 'Беларуская',
      '12hours': '12 гадзін',
      '24hours': '24 гадзіны',
      'datetime-and-greeting': 'Каляндар і прывітанне',
      'quotes': 'Цытаты',
      'audio-player': 'Аўдыяплэер',
      'weather': 'Прагноз надвор\'я'
    }
  }
  constructor({controls, indicators}){
    this.controls = controls;
    this.indicators = indicators;
    document.addEventListener('localechange', () => this.localeChanged());
    Object.values(this.controls).forEach((checkbox) => checkbox.addEventListener('change', () => this.saveModulesState()));
    this.controls['datetime-and-greeting'].checked = JSON.parse(localStorage.getItem('datetime-and-greeting')) ?? true;
    this.controls['quotes'].checked = JSON.parse(localStorage.getItem('quotes')) ?? true;
    this.controls['audio-player'].checked = JSON.parse(localStorage.getItem('audio-player')) ?? true;
    this.controls['weather'].checked = JSON.parse(localStorage.getItem('weather')) ?? true;
    this.localeChanged();
  }
  localeChanged(){
    this.indicators['lang-be'].textContent = this.locales[localization.currentLocale]['belarusian'];
    this.indicators['lang-en'].textContent = this.locales[localization.currentLocale]['english'];
    this.indicators['clock-system-24'].textContent = this.locales[localization.currentLocale]['24hours'];
    this.indicators['clock-system-12'].textContent = this.locales[localization.currentLocale]['12hours'];
    this.indicators['datetime-and-greeting'].textContent = this.locales[localization.currentLocale]['datetime-and-greeting'];
    this.indicators['quotes'].textContent = this.locales[localization.currentLocale]['quotes'];
    this.indicators['audio-player'].textContent = this.locales[localization.currentLocale]['audio-player'];
    this.indicators['weather'].textContent = this.locales[localization.currentLocale]['weather'];
  }
  saveModulesState(){
    localStorage.setItem('datetime-and-greeting', this.controls['datetime-and-greeting'].checked);
    localStorage.setItem('quotes', this.controls['quotes'].checked);
    localStorage.setItem('audio-player', this.controls['audio-player'].checked);
    localStorage.setItem('weather', this.controls['weather'].checked);
  }
}

export const moduleToggle = new ModuleToggle({
  controls: {
    'datetime-and-greeting': document.querySelector('#datetime-and-greeting-toggle'),
    'quotes': document.querySelector('#quotes-toggle'),
    'audio-player': document.querySelector('#audio-player-toggle'),
    'weather': document.querySelector('#weather-toggle')
  },
  indicators: {
    'lang-be': document.querySelector('#localization-be-label'),
    'lang-en': document.querySelector('#localization-en-label'),
    'clock-system-24': document.querySelector('#clock-system-24-label'),
    'clock-system-12': document.querySelector('#clock-system-12-label'),
    'datetime-and-greeting': document.querySelector('#datetime-and-greeting-toggle-label'),
    'quotes': document.querySelector('#quotes-toggle-label'),
    'audio-player': document.querySelector('#audio-player-toggle-label'),
    'weather': document.querySelector('#weather-toggle-label')
  }
});