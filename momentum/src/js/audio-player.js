class AudioPlayer{
  isPaused = true;
  currTrackInd = 0;
  playList = ['Aqua Caelestis', 'Ennio Morricone', 'River Flows In You', 'Summer Wind']
  constructor({controls, indicators}){
    this.controls = controls;
    this.indicators = indicators;
    this.controls.play.addEventListener('click', () => this.togglePlay());
    this.controls.prev.addEventListener('click', () => this.goToAudioTrack('prev'));
    this.controls.next.addEventListener('click', () => this.goToAudioTrack('next'));
    this.controls.audio.addEventListener('ended', () => this.goToAudioTrack('next'));
    this.controls.list.addEventListener('click', (event) => {
      if(event.target.matches('.play-list__item')) this.goToAudioTrack(+event.target.dataset.playlistIndex);
    });
    this.showPlayList();
    this.renderState();
    this.indicators.audio.volume = 0.05;
  }
  showPlayList(){
    this.indicators.list.innerHTML = this.playList.map((name, ind) => `<li class="play-list__item" data-playlist-index=${ind}>${name}</li>`).join('');
  }
  togglePlay(){
    this.isPaused = !this.isPaused;
    this.renderState();
  }
  goToAudioTrack(track){
    if(track === this.currTrackInd) return;
    if(track === 'prev') this.currTrackInd = (this.currTrackInd + this.playList.length - 1) % this.playList.length;
    else if(track === 'next') this.currTrackInd = (this.currTrackInd + 1) % this.playList.length;
    else this.currTrackInd = track;
    this.indicators.audio.src = `./assets/sounds/${this.playList[this.currTrackInd]}.mp3`;
    this.renderState();
  }
  renderState(){
    if(this.isPaused){
      this.controls.play.src = './assets/svg/play.svg';
      this.indicators.audio.pause();
    }
    else{
      this.controls.play.src = './assets/svg/pause.svg';
      this.indicators.audio.play();
    }
    document.querySelectorAll('.play-list__item').forEach((elem, ind) => {
      elem.style.filter = ind === this.currTrackInd ? 'drop-shadow(0px 0px 2px #fff)' : '';
    })
  }
}

export const audioPlayer = new AudioPlayer({
  controls: {
    prev: document.querySelector('#audio-player-prev'),
    play: document.querySelector('#audio-player-play'),
    pause: document.querySelector('#audio-player-pause'),
    next: document.querySelector('#audio-player-next'),
    audio: document.querySelector('.audio-player__audio'),
    list: document.querySelector('.play-list')
  },
  indicators: {
    audio: document.querySelector('.audio-player__audio'),
    list: document.querySelector('.play-list')
  }
});