import Cart from './Cart';
import MainFunctionality from './main';
import BBService from './BBService';
import Product from './product';
import AllProducts from "./allProducts";
import CarouselView from "./carouselView";

export default class App {
  constructor() {
    this.allProducts = new AllProducts();
    this.init();

  }

  init() {
    this.loadData();
    this.addMainFunctionality();
    //this.buildCarousel();
}
  loadData() {
    let service = new BBService("https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=SXkiDh8lcFEAqyG6rDmJjlH4&format=json");
    service.loadData(this.onDataLoaded.bind(this), this.onError);
  }

  onDataLoaded(data) {
    this.allProducts.productList = this.mapDataToProducts(data);
    let carouselView = new CarouselView(this.allProducts);
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

}; /*End of App class*/
