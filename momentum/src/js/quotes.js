class Quotes{
  likedQuotes = JSON.parse(localStorage.getItem('liked-quotes')) ?? [];
  currentQuoteInd;
  constructor({controls, indicators}){
    this.controls = controls;
    this.indicators = indicators;
    this.getQuotes();
  }
  async getQuotes(){
    this.quotesList = await (await fetch('./assets/data/quotes.json')).json();
    this.quotesLoaded();
  }
  quotesLoaded(){
    this.controls.showQuote.addEventListener('click', () => this.showQuote(Math.floor(Math.random() * this.quotesList.length)));
    this.controls.likeQuote.addEventListener('click', () => this.likeQuote());
    this.controls.quotesList.addEventListener('click', (event) => this.deleteQuote(event));
    this.showQuote(Math.floor(Math.random() * this.quotesList.length));
    this.showLikedQuotes();
  }
  showQuote(quoteInd){
    this.controls.likeQuote.style.display = 'none';
    this.indicators.quoteCheck.style.display = 'none';
    this.currentQuoteInd = quoteInd;
    this.indicators.quoteText.textContent = this.quotesList[quoteInd].quote;
    this.indicators.quoteAuthor.textContent = this.quotesList[quoteInd].author;
    this.likedQuotes.includes(quoteInd) ? this.indicators.quoteCheck.style.display = 'block' : this.controls.likeQuote.style.display = 'block';
  }
  likeQuote(){
    this.likedQuotes.push(this.currentQuoteInd);
    localStorage.setItem('liked-quotes', JSON.stringify(this.likedQuotes));
    this.showLikedQuotes();
    this.showQuote(this.currentQuoteInd);
  }
  showLikedQuotes(){
    this.indicators.quotesList.innerHTML = this.likedQuotes.map((val, ind) => this.getQuoteItem(ind, this.quotesList[val].author, this.quotesList[val].quote)).join('');
  }
  getQuoteItem(ind, author, text){
    return `<li class="quotes-list__item"><img class="quotes__icon quotes-list__delete" id="quote-delete" data-quote-ind="${ind}" src="./assets/svg/trash.svg" alt="delete"><div class="quotes-list__author">${ind+1}.${author}:</div><div class="quotes-list__text">${text}</div></div>`;
  }
  deleteQuote(event){
    if(!event.target.matches('#quote-delete')) return;
    const quoteInd = +event.target.dataset.quoteInd
    this.likedQuotes = this.likedQuotes.filter((val, ind) => ind !== quoteInd);
    localStorage.setItem('liked-quotes', JSON.stringify(this.likedQuotes));
    this.showQuote(this.currentQuoteInd);
    this.showLikedQuotes();
  }
}

export const quotes = new Quotes({
  controls: {
    showQuote: document.querySelector('#quote-reload'),
    likeQuote: document.querySelector('#quote-like'),
    quotesList: document.querySelector('.quotes-list')
  },
  indicators: {
    quotesList: document.querySelector('.quotes-list'),
    quoteText: document.querySelector('#quote-text'),
    quoteAuthor: document.querySelector('#quote-author'),
    quoteCheck: document.querySelector('#quote-check')
  }
});