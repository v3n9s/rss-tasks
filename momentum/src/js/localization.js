class Localization{
  supportedLocales = ['en', 'be']
  constructor({controls}){
    this.controls = controls;
    this.currentLocale = localStorage.getItem('appLocale') ?? 'en';
    this.controls[this.currentLocale].checked = true;
  }
  changeLocaleTo(localeTag){
    this.currentLocale = this.supportedLocales.includes(localeTag) ? localeTag : 'en';
    document.dispatchEvent(new CustomEvent('localechange'));
    localStorage.setItem('appLocale', this.currentLocale);
  }
}

export const localization = new Localization({
  controls: {
    'en': document.querySelector('#localization-en'),
    'be': document.querySelector('#localization-be')
  }
});

document.querySelector('#localization-select').addEventListener('change', () => localization.changeLocaleTo(document.querySelector('input[name=localization]:checked').value));