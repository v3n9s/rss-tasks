import { appendToysToHTML } from './filter';
import showAlert from './custom-alert';

function toggleFavoriteState(toyNum: string) {
  let favToys = <string[]>JSON.parse(localStorage.getItem('favToys') || '[]');
  if (favToys.includes(toyNum)) {
    favToys = favToys.filter((num) => num !== toyNum);
  } else if (favToys.length === 20) {
    showAlert('You can\'t add more than 20 toys to favorites');
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
