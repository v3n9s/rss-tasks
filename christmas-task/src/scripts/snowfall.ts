const snowContainer = <HTMLElement>document.querySelector('.tree__main');

function createSnowflake({
  x,
}:{
  x: string
}) {
  const snowflakeElem = document.createElement('img');
  snowflakeElem.classList.add('snowflake');
  snowflakeElem.src = './assets/svg/snow.svg';
  snowflakeElem.style.top = `calc(${Math.random() * (2 - -5) - 5}%)`;
  snowflakeElem.style.left = x;
  snowflakeElem.style.animation = `${Math.random() * (10 - 7.5) + 7.5}s linear both fall`;
  snowContainer.append(snowflakeElem);
  snowflakeElem.addEventListener('animationend', () => {
    snowflakeElem.remove();
  });
}

let isSnowfall = false;

let intervalID: NodeJS.Timer;

export function getSnowfallState() {
  return isSnowfall;
}

export function toggleSnowfall(forceState?: boolean) {
  isSnowfall = forceState ?? !isSnowfall;
  if (isSnowfall) {
    intervalID = setInterval(() => {
      createSnowflake({
        x: `${((Math.random() * (snowContainer.offsetWidth - 25)) / snowContainer.offsetWidth) * 100}%`,
      });
    }, 200);
  } else {
    clearInterval(intervalID);
  }
  return isSnowfall;
}
