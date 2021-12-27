const container = <HTMLElement>document.querySelector('#tree-img-container');

function getRandomColor() {
  const hexademical = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  return `#${[...new Array<undefined>(6)]
    .map(() => hexademical[Math.floor(Math.random() * hexademical.length)])
    .join('')}`;
}

const lights = [
  {
    top: 19,
    left: 56,
  },
  {
    top: 20,
    left: 51,
  },
  {
    top: 21,
    left: 46,
  },
  {
    top: 22,
    left: 42,
  },
  {
    top: 23,
    left: 39,
  },
  {
    top: 31,
    left: 63,
  },
  {
    top: 33,
    left: 58,
  },
  {
    top: 34,
    left: 52,
  },
  {
    top: 35,
    left: 47,
  },
  {
    top: 36,
    left: 42,
  },
  {
    top: 37,
    left: 37,
  },
  {
    top: 38,
    left: 33,
  },
  {
    top: 39,
    left: 30,
  },
  {
    top: 43,
    left: 68,
  },
  {
    top: 45,
    left: 63,
  },
  {
    top: 46,
    left: 56,
  },
  {
    top: 47,
    left: 50,
  },
  {
    top: 48,
    left: 44,
  },
  {
    top: 48,
    left: 38,
  },
  {
    top: 49,
    left: 33,
  },
  {
    top: 50,
    left: 29,
  },
  {
    top: 50,
    left: 25,
  },
  {
    top: 53,
    left: 72,
  },
  {
    top: 54,
    left: 65,
  },
  {
    top: 55,
    left: 59,
  },
  {
    top: 57,
    left: 53,
  },
  {
    top: 57,
    left: 46,
  },
  {
    top: 58,
    left: 42,
  },
  {
    top: 59,
    left: 37,
  },
  {
    top: 59,
    left: 33,
  },
  {
    top: 60,
    left: 27,
  },
  {
    top: 61,
    left: 20,
  },
  {
    top: 63,
    left: 76,
  },
  {
    top: 65,
    left: 66,
  },
  {
    top: 66,
    left: 57,
  },
  {
    top: 68,
    left: 47,
  },
  {
    top: 68,
    left: 41,
  },
  {
    top: 69,
    left: 35,
  },
  {
    top: 69,
    left: 30,
  },
  {
    top: 69,
    left: 24,
  },
  {
    top: 70,
    left: 18,
  },
  {
    top: 72,
    left: 82,
  },
  {
    top: 73,
    left: 76,
  },
  {
    top: 74,
    left: 66,
  },
  {
    top: 76,
    left: 57,
  },
  {
    top: 77,
    left: 54,
  },
  {
    top: 78,
    left: 48,
  },
  {
    top: 78,
    left: 42,
  },
  {
    top: 78,
    left: 37,
  },
  {
    top: 78,
    left: 32,
  },
  {
    top: 79,
    left: 26,
  },
  {
    top: 79,
    left: 20,
  },
  {
    top: 80,
    left: 17,
  },
  {
    top: 80,
    left: 13,
  },
];

lights.forEach((light, ind) => {
  const elem = document.createElement('div');
  elem.classList.add('tree-light');
  elem.style.top = `${light.top}%`;
  elem.style.left = `${light.left}%`;
  elem.style.color = 'transparent';
  elem.style.animationDelay = `${ind * 100}ms`;
  container.append(elem);
});

export default function changeLightsColor(color: string) {
  document.querySelectorAll('.tree-light')
    .forEach((elem) => {
      (<HTMLElement>elem).style.color = color === 'random' ? getRandomColor() : color;
    });
}
