import Flickity from 'flickity';
import ProductView from './productView'


export default class CarouselView {
  constructor(products) {
    this.products = products;
  }

  buildCarousel() {
    this.createCarouselElements();
  }

  createCarouselElements() {
    let documentFragment = new DocumentFragment();
    let startDiv = document.createElement("div");
    startDiv.setAttribute("class", "main-carousel");

    
    for (let i=0; i <this.products.productList.length; i++) {
      let newCarouselCell = document.createElement("div");
      newCarouselCell.setAttribute("class", "carousel-cell");
      this.createCellContent(newCarouselCell, this.products.productList[i]);
      startDiv.appendChild(newCarouselCell);

    }
    this.createCarousel(startDiv);
  }

  createCellContent(cellContainer, currentProduct) {
    let productImage = this.createProductImage(currentProduct);
    cellContainer.appendChild(productImage);
    cellContainer.appendChild(document.createElement("hr"));
    let productName = this.createProductName(currentProduct);
    cellContainer.appendChild(productName);
    let productPrice = this.createProductPrice(currentProduct);
    cellContainer.appendChild(productPrice);

    let quickViewButton = this.createViewButton(currentProduct);
    cellContainer.appendChild(quickViewButton);

    let cartButton = this.createCartButton(currentProduct);
    cellContainer.appendChild(cartButton);
  }

  createProductImage(currentProduct) {
    let newProductImage = document.createElement("img");
    newProductImage.src = `${currentProduct["image"]}`;
    newProductImage.setAttribute("alt", `${currentProduct["name"]}`)
    return newProductImage;
  }

  createProductName(currentProduct) {
    let newProductName = document.createElement("h4");
    let newProductNameContent = document.createTextNode(`${currentProduct["name"]}`)
    newProductName.appendChild(newProductNameContent);
    return newProductName;
  }

  createProductPrice(currentProduct) {
    let newProductPrice = document.createElement("h3");
    let newProductPriceContent = document.createTextNode(`${currentProduct["regularPrice"]}`);
    newProductPrice.appendChild(newProductPriceContent);
    return newProductPrice;
  }

  createViewButton(currentProduct) {
    let newViewButton = document.createElement("button");
    newViewButton.setAttribute("data-sku", `${currentProduct["sku"]}`);
    newViewButton.setAttribute("class", "view-btn");
    newViewButton.setAttribute("id", `view${currentProduct["sku"]}`);
    newViewButton.appendChild(document.createTextNode("QUICK VIEW"));
    newViewButton.addEventListener("click",this.onClickOpenQuickView.bind(this),false);
    return newViewButton;

  }

  createCartButton(currentProduct) {
    let newCartButton = document.createElement("button");
    newCartButton.setAttribute("data-sku", `${currentProduct["sku"]}`);
    newCartButton.setAttribute("class", "cart-btn");
    newCartButton.setAttribute("id", `cartCarousel${currentProduct["sku"]}`);
    newCartButton.appendChild(document.createTextNode("ADD TO CART"));
    //newCartButton.addEventListener("click",this.onClickAddToCart.bind(this),false);
    return newCartButton;
  }

  onClickOpenQuickView(e) {
    //console.log(e.target.getAttribute("data-sku"));
    let productView = new ProductView(e.target.getAttribute("data-sku"), this.products.productList);
    productView.buildProductView();
  }

  createCarousel(node) {
    document.getElementById("flickity-carousel").appendChild(node);


    let elem = document.querySelector('.main-carousel');
    let flkty = new Flickity( elem, {
    contain: true
    });
  }

}

