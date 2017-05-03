import Cart from './Cart';
import MainFunctionality from './main';
import BBService from './BBService';

export default class App {
  constructor() {
    console.log("app constructor");
    this.loadData();
    console.log("after loadData");
  }

  loadData() {
    let service = new BBService("https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=SXkiDh8lcFEAqyG6rDmJjlH4&sort=description.asc&show=accessories.sku,addToCartUrl,categoryPath.id,description,details.name,details.value,dollarSavings,features.feature,image,longDescription,manufacturer,mobileUrl,modelNumber,name,onlineAvailability,onSale,percentSavings,regularPrice,salePrice,shortDescription,sku,thumbnailImage,type,upc,url&format=json");
    service.loadData(this.onDataLoaded.bind(this), this.onError);
  }

  onDataLoaded(data) {
    let products = this.mapDataToProducts(data);
    console.log(products);
  }

  mapDataToProducts(data) {
    console.log(data);
    return data.products;    
  }

  onError() {

  }
};
