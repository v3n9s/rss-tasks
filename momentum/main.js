(()=>{"use strict";const e=new class{supportedLocales=["en","be"];constructor({controls:e}){this.controls=e,this.currentLocale=localStorage.getItem("appLocale")??"en",this.controls[this.currentLocale].checked=!0}changeLocaleTo(e){this.currentLocale=this.supportedLocales.includes(e)?e:"en",document.dispatchEvent(new CustomEvent("localechange")),localStorage.setItem("appLocale",this.currentLocale)}}({controls:{en:document.querySelector("#localization-en"),be:document.querySelector("#localization-be")}});function t(e){return e.getHours()>=18?3:e.getHours()>=12?2:e.getHours()>=6?1:e.getHours()>=0?0:void 0}document.querySelector("#localization-select").addEventListener("change",(()=>e.changeLocaleTo(document.querySelector("input[name=localization]:checked").value)));const s=new class{dayNames={en:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],be:["Нядзеля","Панядзелак","Аўторак","Серада","Чацвер","Пятніца","Субота"]};monthNames={en:["January","February","March","April","May","June","July","August","September","October","November","December"],be:["Студзень","Люты","Сакавік","Красавік","Травень","Чэрвень","Ліпень","Жнівень","Верасень","Кастрычнік","Лістапад","Снежань"]};greetingPhrases={en:["Good night","Good morning","Good afternoon","Good evening"],be:["Дабранач","Добрай раніцы","Добры дзень","Добры вечар"]};namePlaceholder={en:"Enter your name",be:"Увядзіце свае імя"};is12Hour=!1;constructor({indicators:e,controls:t}){this.indicators=e,this.controls=t,this.controls.username.addEventListener("change",(e=>this.saveUsername(this.controls.username.value))),document.addEventListener("localechange",(()=>this.localeChanged())),this.loadUsername(),this.toggleClockSystem(JSON.parse(localStorage.getItem("is12Hour"))),this.controls.clockSystem[this.is12Hour?"is12":"is24"].checked=!0,this.localeChanged(),this.renderState(),setInterval((()=>this.renderState()),1e3)}toggleClockSystem(e){this.is12Hour=e??!this.is12Hour,localStorage.setItem("is12Hour",this.is12Hour),this.renderState()}saveUsername(e){localStorage.setItem("username",e)}loadUsername(){this.indicators.username.value=localStorage.getItem("username")}localeChanged(){this.indicators.username.placeholder=`[${this.namePlaceholder[e.currentLocale]}]`,this.renderState()}renderState(){const s=new Date;this.indicators.time.textContent=s.toLocaleTimeString(e.currentLocale,{hour12:this.is12Hour}),this.indicators.date.textContent=`${this.dayNames[e.currentLocale][s.getDay()]}, ${this.monthNames[e.currentLocale][s.getMonth()]} ${s.getDate()}`,this.indicators.greetingPhrase.textContent=this.greetingPhrases[e.currentLocale][t(s)]}}({indicators:{date:document.querySelector("#date-indicator"),time:document.querySelector("#time-indicator"),greetingPhrase:document.querySelector("#greeting-phrase"),username:document.querySelector("#user-name")},controls:{username:document.querySelector("#user-name"),clockSystem:{is12:document.querySelector("#clock-system-12"),is24:document.querySelector("#clock-system-24")}}});document.querySelector("#clock-system-select").addEventListener("change",(()=>s.toggleClockSystem(JSON.parse(document.querySelector("input[name=clock-system]:checked").value)))),new class{isBusy=!1;dayQuarterNames=["night","morning","afternoon","evening"];constructor({indicators:e,controls:t}){this.currentSlideInd=0,this.slidesCount=20,this.indicators=e,this.controls=t,this.controls.prev.addEventListener("click",(()=>this.goToSlide("prev"))),this.controls.next.addEventListener("click",(()=>this.goToSlide("next"))),this.goToSlide(Math.floor(20*Math.random()))}goToSlide(e){if(this.isBusy)return;let s;this.isBusy=!0,s="prev"===e?(this.currentSlideInd-1+this.slidesCount)%this.slidesCount:"next"===e?(this.currentSlideInd+1)%this.slidesCount:e;const o=`${s+1<10?"0"+(s+1):s+1}.jpg`,i=`https://raw.githubusercontent.com/v3n9s/stage1-tasks/assets/images/${this.dayQuarterNames[t(new Date)]}/${o}`,r=document.createElement("img");r.classList.add("slider__image"),r.style.animation="showImage 1s ease",r.src=i,this.indicators.sliderContainer.classList.add("slider__container_loading"),r.addEventListener("load",(()=>{this.isBusy=!1,this.indicators.sliderContainer.append(r),this.indicators.sliderContainer.classList.remove("slider__container_loading")})),r.addEventListener("animationend",(()=>{this.indicators.sliderImage.src=i,this.indicators.sliderImage.style.opacity="1",r.remove()})),this.currentSlideInd=s}}({indicators:{sliderContainer:document.querySelector("#slider-container"),sliderImage:document.querySelector("#slider-image")},controls:{prev:document.querySelector("#slider-controls-prev"),next:document.querySelector("#slider-controls-next")}}),new class{locales={en:{placeholder:"Enter your city",emptyInput:"Enter city above",cityNotFound:"City not found",city:"Minsk",temperature:"Temperature",windSpeed:"Wind speed",windSpeedUnits:"m/s",humidity:"Humidity"},be:{placeholder:"Увядзіце ваш горад",emptyInput:"Увядзіце горад",cityNotFound:"Горад не знойдзены",city:"Мінск",temperature:"Тэмпература",windSpeed:"Хуткасць ветру",windSpeedUnits:"м/с",humidity:"Вільготнасць"}};constructor({controls:e,indicators:t}){this.controls=e,this.indicators=t,this.controls.input.value=localStorage.getItem("weather-city")??"Minsk",document.addEventListener("localechange",(()=>this.getWeather())),this.controls.input.addEventListener("change",(()=>{this.saveCity(this.controls.input.value),this.getWeather()})),this.getWeather()}saveCity(e){localStorage.setItem("weather-city",e)}async getWeather(){let t;null===localStorage.getItem("weather-city")?(this.controls.input.value=this.locales[e.currentLocale].city,t=this.locales[e.currentLocale].city):t=localStorage.getItem("weather-city"),"Мінск"!==t&&"Менск"!==t||(t="Minsk"),this.controls.input.placeholder=`[${this.locales[e.currentLocale].placeholder}]`;const s=await(await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=a67c0757948afec45a256abdb27cb162&q=${t}&lang=${e.currentLocale}&units=metric`)).json();if(this.indicators.forecast.style.display="none",this.indicators.weatherError.style.display="none",200===s.cod){this.indicators.forecast.style.display="block";const t=s.weather[0].id,o=s.weather[0].description,i=Math.round(s.main.temp),r=Math.round(s.wind.speed),a=s.main.humidity;this.indicators.icon.classList.add("owf"),this.indicators.icon.classList.add(`owf-${t}`),this.indicators.description.textContent=`${o}`,this.indicators.temperature.textContent=`${this.locales[e.currentLocale].temperature}: ${i}°C`,this.indicators.wind.textContent=`${this.locales[e.currentLocale].windSpeed}: ${r} ${this.locales[e.currentLocale].windSpeedUnits}`,this.indicators.humidity.textContent=`${this.locales[e.currentLocale].humidity}: ${a}%`}else this.indicators.weatherError.style.display="block",this.indicators.weatherError.textContent=(()=>"city not found"===s.message?this.locales[e.currentLocale].cityNotFound:"Nothing to geocode"===s.message?this.locales[e.currentLocale].emptyInput:s.message)()}}({controls:{input:document.querySelector("#weather-input")},indicators:{forecast:document.querySelector(".weather__forecast"),icon:document.querySelector(".weather__icon"),description:document.querySelector(".weather__description"),temperature:document.querySelector(".weather__temperature"),wind:document.querySelector(".weather__wind"),humidity:document.querySelector(".weather__humidity"),weatherError:document.querySelector(".weather__error")}}),new class{likedQuotes=JSON.parse(localStorage.getItem("liked-quotes"))??[];currentQuoteInd;constructor({controls:e,indicators:t}){this.controls=e,this.indicators=t,this.getQuotes()}async getQuotes(){this.quotesList=await(await fetch("./assets/data/quotes.json")).json(),this.quotesLoaded()}quotesLoaded(){this.controls.showQuote.addEventListener("click",(()=>this.showQuote(Math.floor(Math.random()*this.quotesList.length)))),this.controls.likeQuote.addEventListener("click",(()=>this.likeQuote())),this.controls.quotesList.addEventListener("click",(e=>this.deleteQuote(e))),this.showQuote(Math.floor(Math.random()*this.quotesList.length)),this.showLikedQuotes()}showQuote(e){this.controls.likeQuote.style.display="none",this.indicators.quoteCheck.style.display="none",this.currentQuoteInd=e,this.indicators.quoteText.textContent=this.quotesList[e].quote,this.indicators.quoteAuthor.textContent=this.quotesList[e].author,this.likedQuotes.includes(e)?this.indicators.quoteCheck.style.display="block":this.controls.likeQuote.style.display="block"}likeQuote(){this.likedQuotes.push(this.currentQuoteInd),localStorage.setItem("liked-quotes",JSON.stringify(this.likedQuotes)),this.showLikedQuotes(),this.showQuote(this.currentQuoteInd)}showLikedQuotes(){this.indicators.quotesList.innerHTML=this.likedQuotes.map(((e,t)=>this.getQuoteItem(t,this.quotesList[e].author,this.quotesList[e].quote))).join("")}getQuoteItem(e,t,s){return`<li class="quotes-list__item"><img class="quotes__icon quotes-list__delete" id="quote-delete" data-quote-ind="${e}" src="./assets/svg/trash.svg" alt="delete"><div class="quotes-list__author">${e+1}.${t}:</div><div class="quotes-list__text">${s}</div></div>`}deleteQuote(e){if(!e.target.matches("#quote-delete"))return;const t=+e.target.dataset.quoteInd;this.likedQuotes=this.likedQuotes.filter(((e,s)=>s!==t)),localStorage.setItem("liked-quotes",JSON.stringify(this.likedQuotes)),this.showQuote(this.currentQuoteInd),this.showLikedQuotes()}}({controls:{showQuote:document.querySelector("#quote-reload"),likeQuote:document.querySelector("#quote-like"),quotesList:document.querySelector(".quotes-list")},indicators:{quotesList:document.querySelector(".quotes-list"),quoteText:document.querySelector("#quote-text"),quoteAuthor:document.querySelector("#quote-author"),quoteCheck:document.querySelector("#quote-check")}}),new class{isPaused=!0;isMuted=!1;currTrackInd=0;playList=["Aqua Caelestis","Ennio Morricone","River Flows In You","Summer Wind"];constructor({controls:e,indicators:t}){this.controls=e,this.indicators=t,this.controls.progress.addEventListener("input",(()=>this.seekTo())),this.controls.toggleVolume.addEventListener("click",(()=>this.toggleVolume())),this.controls.volume.addEventListener("input",(()=>this.changeVolume())),this.controls.play.addEventListener("click",(()=>this.togglePlay())),this.controls.prev.addEventListener("click",(()=>this.goToAudioTrack("prev"))),this.controls.next.addEventListener("click",(()=>this.goToAudioTrack("next"))),this.controls.audio.addEventListener("ended",(()=>this.goToAudioTrack("next"))),this.indicators.audio.src="./assets/sounds/Aqua Caelestis.mp3",this.controls.audio.addEventListener("loadeddata",(()=>this.showTotalTime())),this.controls.audio.addEventListener("timeupdate",(()=>this.renderState())),this.controls.list.addEventListener("click",(e=>{e.target.matches(".play-list__item")&&this.goToAudioTrack(+e.target.dataset.playlistIndex)})),this.showPlayList(),this.renderState(),this.indicators.audio.volume=.25}showPlayList(){this.indicators.list.innerHTML=this.playList.map(((e,t)=>`<li class="play-list__item" data-playlist-index=${t}><div class="play-list__play-pause"></div>${e}</li>`)).join("")}togglePlay(){this.isPaused=!this.isPaused,this.isPaused?this.indicators.audio.pause():this.indicators.audio.play(),this.renderState()}seekTo(){this.indicators.audio.currentTime=+this.controls.progress.value/100*this.indicators.audio.duration||0}toggleVolume(){this.isMuted=!this.isMuted,this.indicators.audio.muted=this.isMuted,this.renderState()}changeVolume(){"0"===this.controls.volume.value?this.isMuted=!0:this.isMuted=!1,this.indicators.audio.volume=this.controls.volume.value/100*.5,this.renderState()}async goToAudioTrack(e){e!==this.currTrackInd?(this.currTrackInd="prev"===e?(this.currTrackInd+this.playList.length-1)%this.playList.length:"next"===e?(this.currTrackInd+1)%this.playList.length:e,this.indicators.audio.src=`./assets/sounds/${this.playList[this.currTrackInd]}.mp3`,this.isPaused||await this.indicators.audio.play(),this.renderState()):this.togglePlay()}showTotalTime(){this.indicators.total.textContent=`${Math.floor(this.indicators.audio.duration/60)}:${Math.round(this.indicators.audio.duration%60)}`}renderState(){this.isPaused?this.controls.play.src="./assets/svg/play.svg":this.controls.play.src="./assets/svg/pause.svg",this.isMuted?this.controls.toggleVolume.src="./assets/svg/muted.svg":this.controls.toggleVolume.src="./assets/svg/unmuted.svg",this.indicators.progress.value=this.controls.audio.currentTime/this.controls.audio.duration*100||0;let e=Math.round(this.indicators.audio.currentTime%60)<10?"0"+Math.round(this.indicators.audio.currentTime%60):Math.round(this.indicators.audio.currentTime%60),t=Math.floor(this.indicators.audio.currentTime/60);60===e&&(e="00",t++),this.indicators.currentTime.textContent=`${t}:${e}`,document.querySelectorAll(".play-list__item").forEach(((e,t)=>{t===this.currTrackInd?(e.style.filter="drop-shadow(0px 0px 2px #fff)",this.indicators.name.textContent=this.playList[this.currTrackInd]):e.style.filter=""})),document.querySelectorAll(".play-list__play-pause").forEach(((e,t)=>{t!==this.currTrackInd||this.isPaused?e.style.backgroundImage='url("./assets/svg/play.svg")':e.style.backgroundImage='url("./assets/svg/pause.svg")'}))}}({controls:{progress:document.querySelector("#audio-player-progress"),toggleVolume:document.querySelector("#audio-player-toggle-volume"),volume:document.querySelector("#audio-player-volume"),prev:document.querySelector("#audio-player-prev"),play:document.querySelector("#audio-player-play"),pause:document.querySelector("#audio-player-pause"),next:document.querySelector("#audio-player-next"),audio:document.querySelector(".audio-player__audio"),list:document.querySelector(".play-list")},indicators:{name:document.querySelector("#audio-player-name"),audio:document.querySelector(".audio-player__audio"),list:document.querySelector(".play-list"),progress:document.querySelector("#audio-player-progress"),currentTime:document.querySelector("#audio-player-current"),total:document.querySelector("#audio-player-total")}}),new class{locales={en:{english:"English",belarusian:"Belarusian","12hours":"12 Hours","24hours":"24 Hours",time:"Clocks",date:"Calendar",greeting:"Greeting",quotes:"Quotes","audio-player":"Audio player",weather:"Weather forecast"},be:{english:"Англійская",belarusian:"Беларуская","12hours":"12 гадзін","24hours":"24 гадзіны",time:"Гадзіннік",date:"Каляндар",greeting:"Прывітанне",quotes:"Цытаты","audio-player":"Аўдыяплэер",weather:"Прагноз надвор'я"}};constructor({controls:e,indicators:t}){this.controls=e,this.indicators=t,document.addEventListener("localechange",(()=>this.localeChanged())),Object.entries(this.controls).forEach((e=>e[1].addEventListener("change",(()=>this.saveModulesState(e[0],e[1].checked))))),Object.entries(this.controls).forEach((e=>e[1].checked=JSON.parse(localStorage.getItem(e[0]))??!0)),this.localeChanged()}localeChanged(){this.indicators["lang-be"].textContent=this.locales[e.currentLocale].belarusian,this.indicators["lang-en"].textContent=this.locales[e.currentLocale].english,this.indicators["clock-system-24"].textContent=this.locales[e.currentLocale]["24hours"],this.indicators["clock-system-12"].textContent=this.locales[e.currentLocale]["12hours"],this.indicators.time.textContent=this.locales[e.currentLocale].time,this.indicators.date.textContent=this.locales[e.currentLocale].date,this.indicators.greeting.textContent=this.locales[e.currentLocale].greeting,this.indicators.quotes.textContent=this.locales[e.currentLocale].quotes,this.indicators["audio-player"].textContent=this.locales[e.currentLocale]["audio-player"],this.indicators.weather.textContent=this.locales[e.currentLocale].weather}saveModulesState(e,t){localStorage.setItem(e,t)}}({controls:{time:document.querySelector("#time-toggle"),date:document.querySelector("#date-toggle"),greeting:document.querySelector("#greeting-toggle"),quotes:document.querySelector("#quotes-toggle"),"audio-player":document.querySelector("#audio-player-toggle"),weather:document.querySelector("#weather-toggle")},indicators:{"lang-be":document.querySelector("#localization-be-label"),"lang-en":document.querySelector("#localization-en-label"),"clock-system-24":document.querySelector("#clock-system-24-label"),"clock-system-12":document.querySelector("#clock-system-12-label"),time:document.querySelector("#time-toggle-label"),date:document.querySelector("#date-toggle-label"),greeting:document.querySelector("#greeting-toggle-label"),quotes:document.querySelector("#quotes-toggle-label"),"audio-player":document.querySelector("#audio-player-toggle-label"),weather:document.querySelector("#weather-toggle-label")}})})();