import loadImage from './image-loading';

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

document.querySelector('.tree')?.addEventListener('click', (event) => {
  const target = <HTMLElement>(<HTMLElement>event.target).closest('[data-action]');
  if (target) {
    if (target.dataset.action === 'tree-img' && target.dataset.imgUrl) {
      changeTreeImg(target.dataset.imgUrl);
    }
  }
});
