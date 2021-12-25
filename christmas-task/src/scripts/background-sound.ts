let isSound = false;

const audioElem = document.createElement('audio');
audioElem.src = './assets/audio/audio.mp3';
audioElem.volume = 0.5;

export function getSoundState() {
  return isSound;
}

let awaitPlay = new Promise<void>((res) => {
  res();
});

export function toggleSound(forceState?: boolean) {
  isSound = forceState ?? !isSound;
  if (isSound) awaitPlay = audioElem.play();
  else awaitPlay.then(() => audioElem.pause());
}
