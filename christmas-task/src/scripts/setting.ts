import loadImage from './image-loading';
import { getSnowfallState, toggleSnowfall } from './snowfall';
import { getSoundState, toggleSound } from './background-sound';
import changeLightsColor from './tree-lights';

interface setting{
  selector: string
  imgUrl: string
  items: string[]
  action: string
}

interface savedState{
  [ind: string]: string | boolean
}

const treeImgElem = <HTMLImageElement>document.querySelector('#tree-img');

function changeTreeImg(url: string) {
  treeImgElem.src = url;
}

const backgroundImgElem = <HTMLImageElement>document.querySelector('#tree-bg-img');

function changeBackgroundTreeImg(url: string) {
  backgroundImgElem.src = url;
}

const snowIndicator = <HTMLImageElement>document.querySelector('#snow-indicator');

const soundIndicator = <HTMLImageElement>document.querySelector('#sound-indicator');

function addSetting({
  selector,
  imgUrl,
  items,
  action,
}: setting) {
  const container = document.querySelector(selector);
  if (!container) throw new Error(`There is not container for '${selector}' selector`);
  container.append(
    ...items.map((url) => {
      const item = document.createElement('div');
      item.classList.add('setting__item');
      item.dataset.action = action;
      item.dataset.imgUrl = url;
      const itemImg = document.createElement('img');
      itemImg.classList.add('setting__img');
      itemImg.classList.add('setting__img_loading');
      itemImg.src = imgUrl;
      loadImage(url).then(() => {
        itemImg.classList.remove('setting__img_loading');
        itemImg.src = url;
      });
      item.append(itemImg);
      return item;
    }),
  );
}

const trees: setting = {
  selector: '#setting-tree',
  imgUrl: './assets/svg/tree.svg',
  items: [
    './assets/tree/1.png',
    './assets/tree/2.png',
    './assets/tree/3.png',
    './assets/tree/4.png',
    './assets/tree/5.png',
    './assets/tree/6.png',
  ],
  action: 'tree-img',
};

addSetting(trees);

const background: setting = {
  selector: '#setting-background',
  imgUrl: './assets/svg/rss.svg',
  items: [
    './assets/bg/1.jpg',
    './assets/bg/2.jpg',
    './assets/bg/3.jpg',
    './assets/bg/4.jpg',
    './assets/bg/5.jpg',
    './assets/bg/6.jpg',
    './assets/bg/7.jpg',
    './assets/bg/8.jpg',
    './assets/bg/9.jpg',
    './assets/bg/10.jpg',
  ],
  action: 'tree-bg-img',
};

addSetting(background);

function renderState() {
  if (getSnowfallState()) {
    snowIndicator.classList.add('setting__img_on');
  } else {
    snowIndicator.classList.remove('setting__img_on');
  }
  if (getSoundState()) {
    soundIndicator.classList.add('setting__img_on');
    soundIndicator.src = './assets/svg/audio.svg';
  } else {
    soundIndicator.classList.remove('setting__img_on');
    soundIndicator.src = './assets/svg/mute.svg';
  }
}

function saveState({
  key,
  value,
}: {
  key: string
  value: string | boolean
}) {
  const state = <savedState>JSON.parse(localStorage.getItem('tree-settings') ?? '{}');
  state[key] = value;
  localStorage.setItem('tree-settings', JSON.stringify(state));
}

function loadState() {
  const state = <savedState>JSON.parse(localStorage.getItem('tree-settings') ?? '{}');
  if ('tree-img' in state) changeTreeImg(<string>state['tree-img']);
  if ('tree-bg-img' in state) changeBackgroundTreeImg(<string>state['tree-bg-img']);
  if ('is-snowfall' in state) {
    toggleSnowfall(<boolean>state['is-snowfall']);
    renderState();
  }
  if ('lights-color' in state) changeLightsColor(<string>state['lights-color']);
}

loadState();

document.querySelector('.tree')?.addEventListener('click', (event) => {
  const target = <HTMLElement>(<HTMLElement>event.target).closest('[data-action]');
  if (target) {
    if (target.dataset.action === 'tree-img' && target.dataset.imgUrl) {
      changeTreeImg(target.dataset.imgUrl);
      saveState({ key: 'tree-img', value: target.dataset.imgUrl });
    } else if (target.dataset.action === 'tree-bg-img' && target.dataset.imgUrl) {
      changeBackgroundTreeImg(target.dataset.imgUrl);
      saveState({ key: 'tree-bg-img', value: target.dataset.imgUrl });
    } else if (target.dataset.action === 'toggle-snow') {
      toggleSnowfall();
      renderState();
      saveState({ key: 'is-snowfall', value: getSnowfallState() });
    } else if (target.dataset.action === 'toggle-sound') {
      toggleSound();
      renderState();
      saveState({ key: 'is-sound', value: getSoundState() });
    } else if (target.dataset.action === 'change-lights-color' && target.dataset.color) {
      changeLightsColor(target.dataset.color);
      saveState({ key: 'lights-color', value: target.dataset.color });
    }
  }
});

document.body.addEventListener('click', () => {
  const state = <savedState>JSON.parse(localStorage.getItem('tree-settings') ?? '{}');
  const isTreeView = (<HTMLInputElement>document.querySelector('#tree-radio')).checked;
  if (isTreeView && 'is-sound' in state) {
    toggleSound(<boolean>state['is-sound']);
    renderState();
  }
});
