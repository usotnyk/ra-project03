import App from './App';

export default class CartIcon {
  constructor(app) {
    this.cart = app.cart;
    this.cart.onQuantityChangedEventListener = this.onQuanityChanged;
    this.init();
  }

  init() {
    console.log("this is from cartIcon");
    console.log(this.cart.getTotalQty());
    let qty = this.cart.getTotalQty();
    let counter = document.getElementById('counter');
    counter.setAttribute('class', 'counter-top');
    if(qty > 0) {
      counter.innerHTML = qty.toString();
      console.log("counter should be visible");
    } else {
      counter.style.display = "none";
    }
  }

  onQuanityChanged(qty) {
    //console.log("qty changed to " + qty);
    let counter = document.getElementById('counter');
    counter.setAttribute('class', 'counter-top');
    if(qty > 0) {
      counter.innerHTML = qty.toString();
    } else {
      counter.style.display = "none";
    }
    
  }
}