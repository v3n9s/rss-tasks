import '../css/styles.scss';

import {TimeAndGreeting} from './time-and-greeting.js';

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