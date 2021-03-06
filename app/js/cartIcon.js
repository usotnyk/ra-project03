import App from './App';

export default class CartIcon {
  constructor(app) {
    this.cart = app.cart;
    this.cart.onQuantityChangedEventListener = this.onQuanityChanged.bind(this);
    this.init();
  }

  init() {
    let qty = this.cart.getTotalQty();
    let counter = document.getElementById('counter');
    counter.setAttribute('class', 'counter-top');
    if(qty > 0) {
      counter.innerHTML = qty.toString();
    } else {
      counter.style.display = "none";
    }
  }

  onQuanityChanged(qty) {
    let counter = document.getElementById('counter');
    counter.setAttribute('class', 'counter-top');
    if(qty > 0) {
      counter.style.display = "initial";
      counter.innerHTML = qty.toString();
    } else {
      counter.style.display = "none";
    }
    
  }
}