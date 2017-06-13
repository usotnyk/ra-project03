//import CarouselView from "./carouselView";
//import ProductView from './productView';
import App from './App';

export default class Cart {

  constructor(app){
    this.ss = window.sessionStorage;
    this.onQuantityChangedEventListener = null;
    //this.allProducts = app.allProducts;
  }

  addItemtoCart(product, qty) {

    let newProductQty = this.getProductQty(product.sku) + parseInt(qty);
    this.ss.setItem(product.sku, newProductQty.toString());
     //adding up all items in cart
    const productSkus = Object.keys(this.ss);
    let newTotalQty = productSkus.reduce((totalQty, productSku) => {
      const qty = this.getProductQty(productSku);
      // Calculate and return a new totalQty every time this function is called.
      return totalQty + qty;
    }, 0);

    this.notifyQuantityChanged(newTotalQty);
  }

  getProductQty(sku) {
    // Quantity of a sku from session storage.
    const qty = this.ss.getItem(sku);
    if (qty == null) {
      return 0;
    }
    return parseInt(qty);
  }

  notifyQuantityChanged(qty) {
    if(this.onQuantityChangedEventListener != null) {
      this.onQuantityChangedEventListener(qty);
    }
  }

  clearCart() {
    this.ss.clear();  
    this.notifyQuantityChanged(0);
  }

  onClickDeleteFromCart(product) {
    let sessionLength = this.ss.length;
    let allSkus = Object.keys(this.ss);
    this.ss.removeItem(product.sku);
    this.notifyQuantityChanged(this.getTotalQty());
  }

  onClickUpdateCart(product, qty) {
    let sessionLength = this.ss.length;
    let allSkus = Object.keys(this.ss);
    if (qty == 0) {
      this.ss.removeItem(product.sku);
    } else {
      console.log("qty is not 0");
      this.ss.setItem(product.sku, qty);
    }


    console.log(this.ss);
    this.notifyQuantityChanged(this.getTotalQty());
  }

  getTotalQty() {
    let newTotalQty = 0;
    for (let i = 0; i < this.ss.length; i++) {
      let skuKey = this.ss.key(i);
      let qtyValue = this.ss.getItem(skuKey);
      newTotalQty += parseInt(qtyValue);
    } 
    return newTotalQty;
  }

  getAllItems() {
    return this.ss;
  }

  getTotalPrice(currentProductsInSS) {
    console.log(this.ss);
    console.log(currentProductsInSS);
    let price = 0;
    const productSkus = Object.keys(this.ss);
    let totalPrice = 0;

    for (let i = 0; i < currentProductsInSS.length; i++) {
      price = currentProductsInSS[i].regularPrice;
      const qty = this.getProductQty(currentProductsInSS[i].sku);
      totalPrice +=(price * qty);
    }

    console.log(totalPrice);
    return Math.round(totalPrice * 100) / 100;
  }

};
