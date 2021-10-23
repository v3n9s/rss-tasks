import {localization} from './localization.js';

export class TimeAndGreeting{
  dayNames = {
    'en': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'be': ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота']
  }
  monthNames = {
    'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    'be': ['Студзень', 'Люты', 'Сакавік', 'Красавік', 'Травень', 'Чэрвень', 'Ліпень', 'Жнівень', 'Верасень', 'Кастрычнік', 'Лістапад', 'Снежань']
  }
  greetingPhrases = {
    'en': ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],
    'be': ['Дабранач', 'Добрай раніцы', 'Добры дзень', 'Добры вечар']
  }
  namePlaceholder = {
    'en': 'Enter your name',
    'be': 'Увядзіце свае імя'
  }
  is12Hour = false;
  constructor({indicators, controls}){
    this.indicators = indicators;
    this.controls = controls;

    this.controls.username.addEventListener('change', (event) => this.saveUsername(this.controls.username.value));
    document.addEventListener('localechange', () => this.localeChanged())
    this.loadUsername();
    this.renderState();
    setInterval(() => this.renderState(), 1000);
  }
  toggleClockSystem(){
    this.is12Hour = !this.is12Hour;
  }
  saveUsername(name){
    localStorage.setItem('username', name);
  }
  loadUsername(){
    this.indicators.username.value = localStorage.getItem('username');
  }
  localeChanged(){
    this.indicators.username.placeholder = `[${this.namePlaceholder[localization.currentLocale]}]`;
    this.renderState();
  }
  renderState(){
    const date = new Date();

    this.indicators.time.textContent = date.toLocaleTimeString(localization.currentLocale, {hour12: this.is12Hour});
    this.indicators.date.textContent = `${this.dayNames[localization.currentLocale][date.getDay()]}, ${this.monthNames[localization.currentLocale][date.getMonth()]} ${date.getDate()}`;

    this.indicators.greetingPhrase.textContent = this.greetingPhrases[localization.currentLocale][getDayQuarter(date)];
  }
}

export function getDayQuarter(date){
  if(date.getHours() >= 18) return 3;
  else if(date.getHours() >= 12) return 2;
  else if(date.getHours() >= 6) return 1;
  else if(date.getHours() >= 0) return 0;
}