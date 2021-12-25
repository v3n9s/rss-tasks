import { filterToys } from './filter';
import loadImage from './image-loading';

const draggableToysContainer = <HTMLElement>document.querySelector('#draggable-toys');

async function getToysToDrag() {
  const toys = await filterToys();
  const favoriteToys = toys.filter((toy) => toy.favorite);
  return (favoriteToys.length !== 0 ? favoriteToys : toys).slice(0, 20);
}

export default async function appendDraggableToys() {
  const [toys] = await Promise.all([getToysToDrag(), loadImage('./assets/svg/ball.svg')]);
  draggableToysContainer.innerHTML = '';
  draggableToysContainer.append(
    ...toys.map((toy) => {
      const droppedToysAmount = document
        .querySelector('#tree-img-container')
        ?.querySelectorAll(`.draggable-toys__img[data-toy-num="${toy.num}"]`)
        .length ?? 0;
      const toyCount = +toy.count - droppedToysAmount;
      const toyElem = document.createElement('div');
      toyElem.classList.add('setting__item');
      toyElem.classList.add('draggable-toys__item');
      toyElem.dataset.toyNum = toy.num;

      const images = [...Array<undefined>(toyCount)].map(() => {
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
      toyAmountElem.innerText = `${toyCount}`;

      toyElem.append(...images, toyAmountElem);
      return toyElem;
    }),
  );
}

function renderToysAmount() {
  draggableToysContainer.querySelectorAll('.draggable-toys__item').forEach((item) => {
    const toysAmount = item.querySelectorAll('.draggable-toys__img').length;
    (<HTMLElement>item.querySelector('.setting__amount')).innerText = `${toysAmount}`;
  });
}

function preventScroll(event: TouchEvent) {
  if (event.cancelable) event.preventDefault();
}

function draggingToy(event: PointerEvent) {
  (<HTMLImageElement>event.target).style.top = `${event.clientY}px`;
  (<HTMLImageElement>event.target).style.left = `${event.clientX}px`;
}

function dropToy(event: PointerEvent) {
  const target = <HTMLImageElement>event.target;

  target.style.pointerEvents = 'none';
  const dropableElem = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-dropable]');
  const isStrictlyInsideDropable = !!dropableElem && [
    document.elementFromPoint(
      event.clientX - (target.offsetWidth / 2),
      event.clientY,
    )?.closest('[data-dropable]'),
    document.elementFromPoint(
      event.clientX - (target.offsetWidth / 2),
      event.clientY + target.offsetHeight,
    )?.closest('[data-dropable]'),
    document.elementFromPoint(
      event.clientX + (target.offsetWidth / 2),
      event.clientY + target.offsetHeight,
    )?.closest('[data-dropable]'),
    document.elementFromPoint(
      event.clientX + (target.offsetWidth / 2),
      event.clientY,
    )?.closest('[data-dropable]'),
  ].every((elem) => elem === dropableElem);
  target.style.pointerEvents = 'all';

  if (dropableElem && isStrictlyInsideDropable) {
    const outerPads = dropableElem.getBoundingClientRect();
    const pads = target.getBoundingClientRect();
    target.style.top = `${((pads.top - outerPads.top) / (<HTMLElement>dropableElem).offsetHeight) * 100}%`;
    target.style.left = `${((pads.left - outerPads.left) / (<HTMLElement>dropableElem).offsetWidth) * 100}%`;
    target.classList.add('draggable-toys__img_dropped');
    dropableElem.append(target);
  } else {
    target.classList.add('setting__img');
    const { toyNum } = target.dataset;
    if (!toyNum) throw new Error('Img doesn\'t have necessary attribute');
    const imgContainer = <HTMLElement>document.querySelector(`.setting__item[data-toy-num="${toyNum}"]`);
    if (imgContainer) imgContainer.append(target);
    else target.remove();
  }
  target.classList.remove('draggable-toys__img_dragging');
  target.removeEventListener('touchmove', preventScroll);
  target.removeEventListener('pointermove', draggingToy);
  target.removeEventListener('pointerup', dropToy);
  target.removeEventListener('pointercancel', dropToy);
  renderToysAmount();
}

function dragToy(event: PointerEvent) {
  const toyElem = <HTMLImageElement>(<HTMLElement>event.target).closest('[data-draggable]');
  if (toyElem) {
    document.body.append(toyElem);
    toyElem.setPointerCapture(event.pointerId);
    toyElem.classList.remove('setting__img');
    toyElem.classList.remove('draggable-toys__img_dropped');
    toyElem.classList.add('draggable-toys__img_dragging');
    toyElem.style.top = `${event.clientY}px`;
    toyElem.style.left = `${event.clientX}px`;
    toyElem.addEventListener('touchmove', preventScroll);
    toyElem.addEventListener('pointermove', draggingToy);
    toyElem.addEventListener('pointerup', dropToy);
    toyElem.addEventListener('pointercancel', dropToy);
    renderToysAmount();
  }
}

document.addEventListener('pointerdown', dragToy);
