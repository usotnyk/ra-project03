import Flickity from 'flickity';
import ProductView from './productView'
import App from "./App" 


export default class CarouselView {
  constructor(app, products) {
    this.products = products;
    this.app = app;
    this.cart = app.cart;
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
    let imageContainer = document.createElement("div");
    imageContainer.setAttribute("class", "image-container");
    cellContainer.appendChild(imageContainer);
    let productImage = this.createProductImage(currentProduct);
    imageContainer.appendChild(productImage);
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
    newViewButton.addEventListener("click", this.onClickOpenQuickView.bind(this), false);
    return newViewButton;

  }

  createCartButton(currentProduct) {
    let newCartButton = document.createElement("button");
    newCartButton.setAttribute("data-sku", `${currentProduct["sku"]}`);
    newCartButton.setAttribute("class", "cart-btn");
    newCartButton.setAttribute("id", `cartCarousel${currentProduct["sku"]}`);
    newCartButton.appendChild(document.createTextNode("ADD TO CART"));
    newCartButton.addEventListener("click",this.onClickAddToCart.bind(this),false);
    return newCartButton;
  }

  onClickAddToCart(e) {
    let currentProduct = this.findProductBySku(e.target.getAttribute("data-sku")); 
    this.cart.addItemtoCart(currentProduct, 1);
  }

  onClickOpenQuickView(e) {
    let currentProduct = this.findProductBySku(e.target.getAttribute("data-sku"));
    let productView = new ProductView(this.app, currentProduct);
    productView.buildProductView();
  }

  findProductBySku(sku) {
    for (let i=0; i<this.products.productList.length; i++) {
      if (this.products.productList[i].sku == sku) {
        return this.products.productList[i];
      }
    }
  }

  createCarousel(node) {
    document.getElementById("flickity-carousel").appendChild(node);


    let elem = document.querySelector('.main-carousel');
    let flkty = new Flickity( elem, {
    contain: true
    });
  }

}

