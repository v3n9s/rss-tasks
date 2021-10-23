import {getDayQuarter} from './time-and-greeting.js';

export class BackgroundImage{
  isBusy = false;
  dayQuarterNames = ['night', 'morning', 'afternoon', 'evening']
  constructor({indicators, controls}){
    this.currentSlideInd = 0;
    this.slidesCount = 20;
    this.indicators = indicators;
    this.controls = controls;
    this.controls.prev.addEventListener('click', () => this.goToSlide('prev'));
    this.controls.next.addEventListener('click', () => this.goToSlide('next'));
    this.goToSlide(Math.floor(Math.random() * 20));
  }
  goToSlide(slideName){
    if(this.isBusy) return;
    this.isBusy = true;
    let slideInd;
    if(slideName === 'prev') slideInd = (this.currentSlideInd - 1 + this.slidesCount) % this.slidesCount;
    else if(slideName === 'next') slideInd = (this.currentSlideInd + 1) % this.slidesCount;
    else slideInd = slideName;

    const imageName = `${(slideInd + 1) < 10 ? '0'+(slideInd + 1) : (slideInd + 1)}.jpg`;
    const imageUrl = `https://raw.githubusercontent.com/v3n9s/stage1-tasks/assets/images/${this.dayQuarterNames[getDayQuarter(new Date())]}/${imageName}`;

    const tempImage = document.createElement('img');
    tempImage.classList.add('slider__image');
    tempImage.style.animation = 'showImage 1s ease';
    tempImage.src = imageUrl;
    this.indicators.sliderContainer.classList.add('slider__container_loading');

    tempImage.addEventListener('load', () => {
      this.isBusy = false;
      this.indicators.sliderContainer.append(tempImage);
      this.indicators.sliderContainer.classList.remove('slider__container_loading');
    })
    
    tempImage.addEventListener('animationend', () => {
      this.indicators.sliderImage.src = imageUrl;
      this.indicators.sliderImage.style.opacity = '1';
      tempImage.remove();
    })

    this.currentSlideInd = slideInd;
  }
}