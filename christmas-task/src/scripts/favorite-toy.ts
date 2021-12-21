import appendToysToHTML from './filter';

function toggleFavoriteState(toyNum: string) {
  let favToys = <string[]>JSON.parse(localStorage.getItem('favToys') || '[]');
  if (favToys.includes(toyNum)) {
    favToys = favToys.filter((num) => num !== toyNum);
  } else {
    favToys.push(toyNum);
  }
  localStorage.setItem('favToys', JSON.stringify(favToys));
  appendToysToHTML();
}

document.querySelector('.toys__items')?.addEventListener('click', (event) => {
  const toyElem = <HTMLElement>(<HTMLElement>event.target).closest('[data-toy-id]');
  if (toyElem) {
    const toyNum = toyElem.dataset.toyId;
    if (toyNum) toggleFavoriteState(toyNum);
  }
});
