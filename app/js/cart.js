//import CarouselView from "./carouselView";
//import ProductView from './productView';
import App from './App';

export default class Cart {

    constructor(app){
      this.ss = window.sessionStorage;
      //this.app = app;
      this.onQuantityChangedEventListener = null;
    }

    addItemtoCart(product, qty) {

      let sessionLength = this.ss.length;
      let allSkus = Object.keys(this.ss);
      let match = 0;
      let newTotalQty = 0;

      if (sessionLength == 0) {
        this.ss.setItem(product.sku, qty.toString());
      } else {
      
        for (let i=0; i<allSkus.length; i++) {

          if (product.sku == allSkus[i].toString()) {
            let oldQty = this.ss.getItem(product.sku);
            oldQty = parseInt(oldQty);
            let newQty = oldQty + qty;
            newQty = newQty.toString();
            this.ss.setItem(product.sku, newQty);
            match = 1;
            break;
          }
        }

        if (match == 0) {
          //adding new SKU and qty if no match found
            this.ss[product.sku] = qty.toString();
        }
        console.log(this.ss);

      }

      //adding up all items in cart
      for (let i = 0; i < this.ss.length; i++) {
        let skuKey = this.ss.key(i);
        let qtyValue = this.ss.getItem(skuKey);
        newTotalQty += parseInt(qtyValue);
      }
        //console.log(newTotalQty);
      
        this.notifyQuantityChanged(newTotalQty);
    }

    notifyQuantityChanged(qty) {
      if(this.onQuantityChangedEventListener != null) {
        this.onQuantityChangedEventListener(qty);
      }
    }

    clearCart(e) {
      this.cart.ss.clear();  
      this.cart.notifyQuantityChanged(0);
      let innerModalCart = document.getElementById('inner-modal-cart');
      this.displayEmptyCart(innerModalCart);
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
};
