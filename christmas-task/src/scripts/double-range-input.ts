class DoubleRangeInput {
  from: HTMLInputElement;

  to: HTMLInputElement;

  background: HTMLElement;

  indicators: {
    from: HTMLElement,
    to: HTMLElement,
  };

  constructor(
    from: HTMLInputElement,
    to: HTMLInputElement,
    background: HTMLElement,
    indicators: {
      from: HTMLElement,
      to: HTMLElement,
    },
  ) {
    this.from = from;
    this.to = to;
    this.background = background;
    this.indicators = indicators;

    const onInput = () => {
      this.renderBackground();
      this.renderValues();
    };

    this.from.addEventListener('input', () => {
      this.preventEntryToRight();
      this.setHigherZIndexTo(this.from);
      onInput();
    });

    this.to.addEventListener('input', () => {
      this.preventEntryToLeft();
      this.setHigherZIndexTo(this.to);
      onInput();
    });
  }

  renderBackground() {
    const from = ((+this.from.value - +this.from.min) / (+this.from.max - +this.from.min)) * 100;
    const to = ((+this.to.value - +this.to.min) / (+this.to.max - +this.to.min)) * 100;
    this.background.style.backgroundImage = `linear-gradient(90deg, #fff ${from}%, #2c8dff ${from}% ${to}%, #fff ${to}%)`;
  }

  preventEntryToLeft() {
    if (+this.to.value < +this.from.value) this.to.value = this.from.value;
  }

  preventEntryToRight() {
    if (+this.from.value > +this.to.value) this.from.value = this.to.value;
  }

  renderValues() {
    this.indicators.from.innerText = this.from.value;
    this.indicators.to.innerText = this.to.value;
  }

  setHigherZIndexTo(rangeElem: HTMLInputElement) {
    this.from.classList.remove('criteria-control__range_last');
    this.to.classList.remove('criteria-control__range_last');
    rangeElem.classList.add('criteria-control__range_last');
  }
}

export const amountRange = new DoubleRangeInput(
  <HTMLInputElement>document.querySelector('#criteria-amount-min'),
  <HTMLInputElement>document.querySelector('#criteria-amount-max'),
  <HTMLElement>document.querySelector('#criteria-amount-background'),
  {
    from: <HTMLElement>document.querySelector('#criteria-amount-min-indicator'),
    to: <HTMLElement>document.querySelector('#criteria-amount-max-indicator'),
  },
);

amountRange.renderBackground();

export const yearRange = new DoubleRangeInput(
  <HTMLInputElement>document.querySelector('#criteria-year-min'),
  <HTMLInputElement>document.querySelector('#criteria-year-max'),
  <HTMLElement>document.querySelector('#criteria-year-background'),
  {
    from: <HTMLElement>document.querySelector('#criteria-year-min-indicator'),
    to: <HTMLElement>document.querySelector('#criteria-year-max-indicator'),
  },
);

yearRange.renderBackground();
