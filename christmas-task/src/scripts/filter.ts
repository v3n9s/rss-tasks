import getToys from './downloader';

async function filterToys() {
  const shapes = (<HTMLInputElement[]>([...document.querySelectorAll('[name="criteria-shape"]:checked')]))
    .map((elem) => elem.value);
  const colors = (<HTMLInputElement[]>([...document.querySelectorAll('[name="criteria-color"]:checked')]))
    .map((elem) => elem.value);
  const toys = await getToys();
  return toys
    .filter((toy) => shapes.includes(toy.shape))
    .filter((toy) => colors.includes(toy.color));
}

async function appendToysToHTML() {
  const toys = await filterToys();
  const toysContainer = document.querySelector('.toys__items');
  if (!toysContainer) throw new Error('Toys container not found');
  toysContainer.innerHTML = toys
    .map((toy) => `
    <div class="toy" data-toy-id="${toy.num}">
      <h4 class="toy__name">${toy.name}</h4>
      <img class="toy__img" src="./assets/toys/${toy.num}.png">
      <p class="toy__property">Amount: ${toy.count}</p>
      <p class="toy__property">Year bought: ${toy.year}</p>
      <p class="toy__property">Shape: ${toy.shape}</p>
      <p class="toy__property">Color: ${toy.color}</p>
      <p class="toy__property">Size: ${toy.size}</p>
      <p class="toy__property">is favorite: ${toy.favorite ? 'yes' : 'no'}</p>
    </div>
    `)
    .join('');
}

document.querySelector('.toys__filters')?.addEventListener('change', () => {
  appendToysToHTML();
});

appendToysToHTML();
