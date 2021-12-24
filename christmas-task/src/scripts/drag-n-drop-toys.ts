import { filterToys } from './filter';
import loadImage from './image-loading';

const draggableToysContainer = <HTMLElement>document.querySelector('#draggable-toys');

async function getToysToDrag() {
  const toys = await filterToys();
  const favoriteToys = toys.filter((toy) => toy.favorite);
  return (favoriteToys.length !== 0 ? favoriteToys : toys).slice(0, 20);
}

async function appendDraggableToys() {
  const [toys] = await Promise.all([getToysToDrag(), loadImage('./assets/svg/ball.svg')]);
  draggableToysContainer.append(
    ...toys.map((toy) => {
      const toyElem = document.createElement('div');
      toyElem.classList.add('setting__item');
      toyElem.classList.add('draggable-toys__item');
      toyElem.dataset.toyNum = toy.num;

      const images = [...Array<undefined>(+toy.count)].map(() => {
        const toyImgElem = document.createElement('img');
        toyImgElem.classList.add('setting__img');
        toyImgElem.classList.add('draggable-toys__img');
        toyImgElem.classList.add('setting__img_loading');
        toyImgElem.src = './assets/svg/ball.svg';
        toyImgElem.draggable = false;
        toyImgElem.dataset.draggable = '';
        toyImgElem.dataset.toyNum = toy.num;
        loadImage(`./assets/toys/${toy.num}.png`).then(() => {
          toyImgElem.src = `./assets/toys/${toy.num}.png`;
          toyImgElem.classList.remove('setting__img_loading');
        });
        return toyImgElem;
      });

      const toyAmountElem = document.createElement('div');
      toyAmountElem.classList.add('setting__amount');
      toyAmountElem.innerText = toy.count;

      toyElem.append(...images, toyAmountElem);
      return toyElem;
    }),
  );
}

appendDraggableToys();
