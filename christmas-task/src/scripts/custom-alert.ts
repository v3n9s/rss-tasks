const container = <HTMLElement>document.querySelector('#alert-list');

export default function showAlert(text: string) {
  const alert = document.createElement('div');
  alert.classList.add('custom-alert__item');
  alert.innerText = text;
  container.prepend(alert);
  alert.addEventListener('animationend', () => {
    alert.remove();
  });
}
