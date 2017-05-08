import Cart from './cart'

export default class CartView {
  constructor(cart, products) {
    this.cart = cart;
    this.products = products;

  }
    buildCartView(){
    this.buildModal();
  }

  buildModal() {
    //console.log(this.cart.getAllItems());
    //console.log(this.products);
    let currentProductsInSS = this.getCurrentProductsInSS(this.cart.getAllItems(), this.products);
    let cartModal = document.getElementById('cart-modal');
    cartModal.style.display = "block";

    let span = document.getElementById('close-cart');
    span.onclick = function(event) {
      cartModal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == cartModal) {
        cartModal.style.display = "none";
      }
    }

    let innerModalCart = document.getElementById('inner-modal-cart');

    this.createCartModalContent(innerModalCart, currentProductsInSS);
  }

  getCurrentProductsInSS (cartItems, allProducts) {
    //console.log("inside getCurrentProductsInSS");
    let currentProductsInSS = [];
    //console.log(allProducts);
    //console.log(cartItems);
    for (let key in cartItems) {
      let sku = key;
      let qty = cartItems[key];
      //console.log(sku);
      //console.log(qty);
      for (let k = 0; k < allProducts.length; k++) {
        if(sku == allProducts[k].sku) {
          //console.log("match is found in " + sku);
          allProducts[k].qty = qty;
          currentProductsInSS.push(allProducts[k]);
        }
      }  
    }
    console.log(currentProductsInSS);
    return currentProductsInSS;
  }

  createCartModalContent() {}
}