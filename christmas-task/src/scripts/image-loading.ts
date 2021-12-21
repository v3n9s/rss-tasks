export default function loadImage(url: string) {
  return new Promise((res: (arg: string) => void) => {
    const tempImg = document.createElement('img');
    tempImg.src = url;
    tempImg.addEventListener('load', () => {
      res(tempImg.src);
      tempImg.remove();
    });
  });
}
