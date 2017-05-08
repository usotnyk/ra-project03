import App from './App';

export default class CartIcon {
  constructor(app) {
    this.cart = app.cart;
    this.cart.onQuantityChangedEventListener = this.onQuanityChanged;
  }

  onQuanityChanged(qty) {
    console.log("qty changed to " + qty);
    let counter = document.getElementById('counter');
    counter.setAttribute('class', 'counter-top');
    counter.innerHTML = qty.toString();
  }
}