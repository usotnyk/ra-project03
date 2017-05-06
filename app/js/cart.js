import CarouselView from "./carouselView";
import ProductView from './productView';

export default class Cart{

    constructor(ss){
      this.ss = window.sessionStorage;
      console.log("creating cart");
      console.log(this.ss);
    }

    addItemtoCart() {
      console.log("saving item in cart from cart.js");
    }

};