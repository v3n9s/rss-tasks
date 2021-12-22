import loadImage from './image-loading';

interface setting{
  selector: string
  imgUrl: string
  items: string[]
}

function addSetting({ selector, imgUrl, items }: setting) {
  const container = document.querySelector(selector);
  if (!container) throw new Error(`There is not container for '${selector}' selector`);
  container.append(
    ...items.map((url) => {
      const item = document.createElement('div');
      item.classList.add('setting__item');
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
};

addSetting(trees);
