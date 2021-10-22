class Localization{
  supportedLocales = ['en', 'be']
  constructor(){
    this.currentLocale = this.supportedLocales.includes(navigator.language.slice(0,2)) ? navigator.language.slice(0,2) : 'en';
  }
  changeLocaleTo(localeTag){
    this.currentLocale = localeTag;
    document.dispatchEvent(new CustomEvent('localechange'))
  }
}

export const localization = new Localization();