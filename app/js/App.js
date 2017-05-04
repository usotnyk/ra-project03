import Cart from './Cart';
import MainFunctionality from './main';
import BBService from './BBService';
import Product from './product';
import AllProducts from "./allProducts";

export default class App {
  constructor() {
    this.allProducts = new AllProducts();
    this.init();


  }

  init() {
    this.loadData();
    this.addMainFunctionality();
}
  loadData() {
    let service = new BBService("https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=SXkiDh8lcFEAqyG6rDmJjlH4&sort=description.asc&show=accessories.sku,addToCartUrl,categoryPath.id,description,details.name,details.value,dollarSavings,features.feature,image,longDescription,manufacturer,mobileUrl,modelNumber,name,onlineAvailability,onSale,percentSavings,regularPrice,salePrice,shortDescription,sku,thumbnailImage,type,upc,url&format=json");
    service.loadData(this.onDataLoaded.bind(this), this.onError);
  }

  onDataLoaded(data) {
    let products = this.mapDataToProducts(data);
  }

  mapDataToProducts(data) {
    // this.allProducts = new AllProducts();
    console.log(this.allProducts.productList);
    let dataArray = data.products;
    console.log(dataArray);

    for (let i=0; i<dataArray.length; i++) {

      let newProduct = new Product();

      newProduct.sku = dataArray[i].sku;
      newProduct.name = dataArray[i].name;
      newProduct.image = dataArray[i].image;
      newProduct.longDescription = dataArray[i].longDescription;
      newProduct.shortDescription = dataArray[i].shortDescription;
      newProduct.regularPrice = dataArray[i].regularPrice;

      this.allProducts.productList.push(newProduct);
    }

    console.log(this.allProducts);
    return this.allProducts;
  
  }

  onError() {

  }

  addMainFunctionality () {
    let mainFunctionality = new MainFunctionality();
  }

}; /*End of App class*/
