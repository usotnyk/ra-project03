import Cart from './cart';
import CartIcon from './cartIcon';
import CartView from './cartView'
import MainFunctionality from './main';
import BBService from './BBService';
import Product from './product';
import AllProducts from "./allProducts";
import CarouselView from "./carouselView";

export default class App {
  constructor() {
    this.allProducts = new AllProducts();
    this.cart = new Cart();
    this.cartIcon = new CartIcon(this);
    this.init();
  }

  init() {
    this.loadData();
    this.addMainFunctionality();
    this.registerCartViewEventListener();
  }
  
  loadData() {
    let service = new BBService("https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=SXkiDh8lcFEAqyG6rDmJjlH4&format=json");
    service.loadData(this.onDataLoaded.bind(this), this.onError);
  }

  onDataLoaded(data) {
    this.allProducts.productList = this.mapDataToProducts(data);
    let carouselView = new CarouselView(this, this.allProducts);
    carouselView.buildCarousel();
  }

  mapDataToProducts(data) {

    let dataArray = data.products;
    let products = Array();

    for (let i=0; i<dataArray.length; i++) {

      let newProduct = new Product();

      newProduct.sku = dataArray[i].sku;
      newProduct.name = dataArray[i].name;
      newProduct.image = dataArray[i].image;
      newProduct.longDescription = dataArray[i].longDescription;
      newProduct.shortDescription = dataArray[i].shortDescription;
      newProduct.regularPrice = dataArray[i].regularPrice;

      products.push(newProduct);
    }
    return products;
  }

  onError() {

  }

  addMainFunctionality() {
    let mainFunctionality = new MainFunctionality();
  }

  registerCartViewEventListener() {
    let cartIcon = document.getElementById('cart-icon');
    cartIcon.addEventListener('click', this.onClickOpenCartView.bind(this), false)
  }

  onClickOpenCartView(e) {
    let cartView = new CartView(this.cart, this.allProducts.productList);
    cartView.buildCartView();
  }

}; /*End of App class*/
