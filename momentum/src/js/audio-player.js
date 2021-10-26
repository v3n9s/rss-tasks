class AudioPlayer{
  isPaused = true;
  isMuted = false;
  currTrackInd = 0;
  playList = ['Aqua Caelestis', 'Ennio Morricone', 'River Flows In You', 'Summer Wind']
  constructor({controls, indicators}){
    this.controls = controls;
    this.indicators = indicators;
    this.controls.progress.addEventListener('input', () => this.seekTo());
    this.controls.toggleVolume.addEventListener('click', () => this.toggleVolume());
    this.controls.volume.addEventListener('input', () => this.changeVolume());
    this.controls.play.addEventListener('click', () => this.togglePlay());
    this.controls.prev.addEventListener('click', () => this.goToAudioTrack('prev'));
    this.controls.next.addEventListener('click', () => this.goToAudioTrack('next'));
    this.controls.audio.addEventListener('ended', () => this.goToAudioTrack('next'));
    this.indicators.audio.src = `./assets/sounds/Aqua Caelestis.mp3`;
    this.controls.audio.addEventListener('loadeddata', () => this.showTotalTime());
    this.controls.audio.addEventListener('timeupdate', () => this.renderState());
    this.controls.list.addEventListener('click', (event) => {
      if(event.target.matches('.play-list__item')) this.goToAudioTrack(+event.target.dataset.playlistIndex);
    });
    this.showPlayList();
    this.renderState();
    this.indicators.audio.volume = 0.25;
  }
  showPlayList(){
    this.indicators.list.innerHTML = this.playList.map((name, ind) => `<li class="play-list__item" data-playlist-index=${ind}><div class="play-list__play-pause"></div>${name}</li>`).join('');
  }
  togglePlay(){
    this.isPaused = !this.isPaused;
    this.isPaused ? this.indicators.audio.pause() : this.indicators.audio.play();
    this.renderState();
  }
  seekTo(){
    this.indicators.audio.currentTime = ((+this.controls.progress.value / 100) * this.indicators.audio.duration) || 0;
  }
  toggleVolume(){
    this.isMuted = !this.isMuted;
    this.indicators.audio.muted = this.isMuted;
    this.renderState();
  }
  changeVolume(){
    if(this.controls.volume.value === '0') this.isMuted = true;
    else this.isMuted = false;
    this.indicators.audio.volume = (this.controls.volume.value / 100) * 0.5;
    this.renderState();
  }
  async goToAudioTrack(track){
    if(track === this.currTrackInd){
      this.togglePlay();
      return;
    }
    if(track === 'prev') this.currTrackInd = (this.currTrackInd + this.playList.length - 1) % this.playList.length;
    else if(track === 'next') this.currTrackInd = (this.currTrackInd + 1) % this.playList.length;
    else this.currTrackInd = track;
    this.indicators.audio.src = `./assets/sounds/${this.playList[this.currTrackInd]}.mp3`;
    if(!this.isPaused) await this.indicators.audio.play();
    this.renderState();
  }
  showTotalTime(){
    this.indicators.total.textContent = `${Math.floor(this.indicators.audio.duration / 60)}:${Math.round(this.indicators.audio.duration % 60)}`;
  }
  renderState(){
    if(this.isPaused){
      this.controls.play.src = './assets/svg/play.svg';
    }
    else{
      this.controls.play.src = './assets/svg/pause.svg';
    }
    if(this.isMuted){
      this.controls.toggleVolume.src = './assets/svg/muted.svg';
    }
    else{
      this.controls.toggleVolume.src = './assets/svg/unmuted.svg';
    }
    this.indicators.progress.value = ((this.controls.audio.currentTime / this.controls.audio.duration) * 100) || 0;
    let seconds = Math.round(this.indicators.audio.currentTime % 60) < 10 ? '0'+Math.round(this.indicators.audio.currentTime % 60) : Math.round(this.indicators.audio.currentTime % 60);
    let minutes = Math.floor(this.indicators.audio.currentTime / 60);
    if(seconds === 60){
      seconds = '00';
      minutes++;
    }
    this.indicators.currentTime.textContent = `${minutes}:${seconds}`;
    document.querySelectorAll('.play-list__item').forEach((elem, ind) => {
      if(ind === this.currTrackInd){
        elem.style.filter = 'drop-shadow(0px 0px 2px #fff)';
        this.indicators.name.textContent = this.playList[this.currTrackInd];
      }
      else{
        elem.style.filter = '';
      }
    })
    document.querySelectorAll('.play-list__play-pause').forEach((elem, ind) => {
      if(ind === this.currTrackInd && !this.isPaused){
        elem.style.backgroundImage = 'url("./assets/svg/pause.svg")';
      }
      else{
        elem.style.backgroundImage = 'url("./assets/svg/play.svg")';
      }
    })
  }
}

export const audioPlayer = new AudioPlayer({
  controls: {
    progress: document.querySelector('#audio-player-progress'),
    toggleVolume: document.querySelector('#audio-player-toggle-volume'),
    volume: document.querySelector('#audio-player-volume'),
    prev: document.querySelector('#audio-player-prev'),
    play: document.querySelector('#audio-player-play'),
    pause: document.querySelector('#audio-player-pause'),
    next: document.querySelector('#audio-player-next'),
    audio: document.querySelector('.audio-player__audio'),
    list: document.querySelector('.play-list')
  },
  indicators: {
    name: document.querySelector('#audio-player-name'),
    audio: document.querySelector('.audio-player__audio'),
    list: document.querySelector('.play-list'),
    progress: document.querySelector('#audio-player-progress'),
    currentTime: document.querySelector('#audio-player-current'),
    total: document.querySelector('#audio-player-total')
  }
});