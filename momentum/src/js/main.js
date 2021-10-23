import '../css/styles.scss';

import {TimeAndGreeting} from './time-and-greeting.js';
import {BackgroundImage} from './background-image.js';

const timeAndGreeting = new TimeAndGreeting({
  indicators: {
    date: document.querySelector('#date-indicator'),
    time: document.querySelector('#time-indicator'),
    greetingPhrase: document.querySelector('#greeting-phrase'),
    username: document.querySelector('#user-name')
  },
  controls: {
    username: document.querySelector('#user-name')
  }
})

const backgroundImage = new BackgroundImage({
  indicators: {
    sliderContainer: document.querySelector('#slider-container'),
    sliderImage: document.querySelector('#slider-image')
  },
  controls: {
    prev: document.querySelector('#slider-controls-prev'),
    next: document.querySelector('#slider-controls-next')
  }
})