import loadImage from './image-loading';
import toggleSnowfall from './snowfall';

interface setting{
  selector: string
  imgUrl: string
  items: string[]
  action: string
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

document.querySelector('.tree')?.addEventListener('click', (event) => {
  const target = <HTMLElement>(<HTMLElement>event.target).closest('[data-action]');
  if (target) {
    if (target.dataset.action === 'tree-img' && target.dataset.imgUrl) {
      changeTreeImg(target.dataset.imgUrl);
    } else if (target.dataset.action === 'tree-bg-img' && target.dataset.imgUrl) {
      changeBackgroundTreeImg(target.dataset.imgUrl);
    } else if (target.dataset.action === 'toggle-snow') {
      if (toggleSnowfall()) {
        snowIndicator.classList.add('setting__img_on');
      } else {
        snowIndicator.classList.remove('setting__img_on');
      }
    }
  }
});
