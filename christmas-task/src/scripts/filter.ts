import getToys from './downloader';
import { amountRange, yearRange } from './double-range-input';
import loadImage from './image-loading';
import appendDraggableToys from './drag-n-drop-toys';

export async function filterToys() {
  const shapes = (<HTMLInputElement[]>([...document.querySelectorAll('[name="criteria-shape"]:checked')]))
    .map((elem) => elem.value);
  const colors = (<HTMLInputElement[]>([...document.querySelectorAll('[name="criteria-color"]:checked')]))
    .map((elem) => elem.value);
  const amount = {
    min: +(<HTMLInputElement>document.querySelector('#criteria-amount-min')).value,
    max: +(<HTMLInputElement>document.querySelector('#criteria-amount-max')).value,
  };
  const year = {
    min: +(<HTMLInputElement>document.querySelector('#criteria-year-min')).value,
    max: +(<HTMLInputElement>document.querySelector('#criteria-year-max')).value,
  };
  const sort = {
    property: ['name', 'year'][(<HTMLSelectElement>document.querySelector('#criteria-sort-property')).selectedIndex],
    method: ['asc', 'desc'][(<HTMLSelectElement>document.querySelector('#criteria-sort-method')).selectedIndex],
  };
  let toys = await getToys();
  toys = toys
    .filter((toy) => shapes.includes(toy.shape))
    .filter((toy) => colors.includes(toy.color))
    .filter((toy) => +toy.count >= amount.min && +toy.count <= amount.max)
    .filter((toy) => +toy.year >= year.min && +toy.year <= year.max)
    .sort((a, b) => {
      if (sort.property === 'name') {
        for (let i = 0; i < a.name.length || i < b.name.length; i += 1) {
          if (a.name.charCodeAt(i) - b.name.charCodeAt(i) !== 0) {
            return a.name.charCodeAt(i) - b.name.charCodeAt(i);
          }
        }
        return a.name.length - b.name.length;
      }
      return +a.year - +b.year;
    });
  return sort.method === 'asc' ? toys : toys.reverse();
}

export async function appendToysToHTML() {
  appendDraggableToys();
  const toys = await filterToys();
  const toysContainer = document.querySelector('.toys__items');
  if (!toysContainer) throw new Error('Toys container not found');
  toysContainer.innerHTML = toys
    .map((toy) => `
    <div class="toy${toy.favorite ? ' toy_favorite' : ''}" data-toy-id="${toy.num}">
      <h4 class="toy__name">${toy.name}</h4>
      <div class="toy__img-container">
        <img class="toy__img toy__img_loading">
      </div>
      <p class="toy__property">Amount: ${toy.count}</p>
      <p class="toy__property">Year bought: ${toy.year}</p>
      <p class="toy__property">Shape: ${toy.shape}</p>
      <p class="toy__property">Color: ${toy.color}</p>
      <p class="toy__property">Size: ${toy.size}</p>
      <p class="toy__property">is favorite: ${toy.favorite ? 'yes' : 'no'}</p>
    </div>
    `)
    .join('') || '<p class="toys__items-placeholder">No toys matching selected criteries</p>';
  toysContainer.querySelectorAll('.toy')
    .forEach((toyElem) => {
      const ind = (<HTMLElement>toyElem).dataset.toyId;
      const imgElem = toyElem.querySelector('.toy__img');
      if (!ind) throw new Error('toy ind not found');
      if (!imgElem) throw new Error('img elem not found');
      loadImage(`./assets/toys/${ind}.png`)
        .then((url) => {
          (<HTMLImageElement>imgElem).classList.remove('toy__img_loading');
          (<HTMLImageElement>imgElem).src = url;
        });
    });
}

function resetFilter() {
  document.querySelectorAll('[name="criteria-shape"]').forEach((elem) => {
    (<HTMLInputElement>elem).checked = true;
  });

  document.querySelectorAll('[name="criteria-color"]').forEach((elem) => {
    (<HTMLInputElement>elem).checked = true;
  });

  const amountMin = <HTMLInputElement>document.querySelector('#criteria-amount-min');
  const amountMax = <HTMLInputElement>document.querySelector('#criteria-amount-max');
  amountMin.value = amountMin.min;
  amountMax.value = amountMax.max;
  amountRange.renderBackground();

  const yearMin = <HTMLInputElement>document.querySelector('#criteria-year-min');
  const yearMax = <HTMLInputElement>document.querySelector('#criteria-year-max');
  yearMin.value = yearMin.min;
  yearMax.value = yearMax.max;
  yearRange.renderBackground();
}

document.querySelector('.toys__filters')?.addEventListener('change', () => {
  appendToysToHTML();
});

document.querySelector('#criteria-reset')?.addEventListener('click', () => {
  resetFilter();
  appendToysToHTML();
});

appendToysToHTML();
