import getToys from './downloader';

async function filterToys() {
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
  const toys = await getToys();
  return toys
    .filter((toy) => shapes.includes(toy.shape))
    .filter((toy) => colors.includes(toy.color))
    .filter((toy) => +toy.count >= amount.min && +toy.count <= amount.max)
    .filter((toy) => +toy.year >= year.min && +toy.year <= year.max);
}

async function appendToysToHTML() {
  const toys = await filterToys();
  const toysContainer = document.querySelector('.toys__items');
  if (!toysContainer) throw new Error('Toys container not found');
  toysContainer.innerHTML = toys
    .map((toy) => `
    <div class="toy" data-toy-id="${toy.num}">
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
    .join('');

  toysContainer.querySelectorAll('.toy')
    .forEach((toyElem) => {
      const ind = ((<HTMLElement>toyElem).dataset.toyId ?? '0');
      const imgContainerElem = toyElem.querySelector('.toy__img-container');
      const imgElem = toyElem.querySelector('.toy__img');
      if (!imgContainerElem || !imgElem) throw new Error('img elem not found');
      const tempImg = document.createElement('img');
      tempImg.src = `./assets/toys/${ind}.png`;
      tempImg.addEventListener('load', () => {
        (<HTMLImageElement>imgElem).classList.remove('toy__img_loading');
        (<HTMLImageElement>imgElem).src = tempImg.src;
        tempImg.remove();
      });
    });
}

document.querySelector('.toys__filters')?.addEventListener('change', () => {
  appendToysToHTML();
});

appendToysToHTML();
