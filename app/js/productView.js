import CarouselView from "./carouselView";
import App from "./App" 

export default class ProductView {
  constructor(sku, products) {
      this.sku = sku;
      this.products = products;
  }

  buildProductView(){
    this.buildModal();
  }

  buildModal() {

    let modal = document.getElementById('view-modal');
    modal.style.display = "block";

    let span = document.getElementById('close');
    span.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    let innerModal = document.getElementById('inner-modal');
    let theProduct = this.findProductFromSku(this.sku);

    this.createModalContent(innerModal, theProduct);
  }

  findProductFromSku(sku) {
    for (let i=0; i<this.products.length; i++) {
      if (this.products[i].sku == sku) {
        return this.products[i];
      }
    }
  }

  createModalContent(modalContainer, currentProduct) {
    modalContainer.innerHTML ='';
    let newSection = document.createElement("section");
    newSection.setAttribute("class", "flex");
    let newImage = document.createElement("img");
    newImage.src = currentProduct.image;
    newSection.appendChild(newImage);
    modalContainer.appendChild(newSection);

    let innerDiv = document.createElement("div");
    newSection.appendChild(innerDiv);

    let newName = document.createElement("h3");
    let productName = document.createTextNode(currentProduct.name);
    newName.appendChild(productName);
    innerDiv.appendChild(newName);

    let newPrice = document.createElement("h4");
    let productPrice = document.createTextNode(currentProduct.regularPrice);
    newPrice.appendChild(productPrice);
    innerDiv.appendChild(newPrice);

    let newCartButton = document.createElement("button");
    newCartButton.setAttribute("data-sku", currentProduct.sku);
    newCartButton.setAttribute("type","button");
    newCartButton.setAttribute("class", "cart-btn");
    newCartButton.setAttribute("id", `cartView${currentProduct["sku"]}`)
    newCartButton.appendChild(document.createTextNode("ADD TO CART"));
    newCartButton.addEventListener("click",this.onClickAddToCart.bind(this),false);
    innerDiv.appendChild(newCartButton);

    modalContainer.appendChild(document.createElement("hr"));

    let newDescription = document.createElement("p");
    let productDescription = document.createTextNode(currentProduct.longDescription);
    newDescription.appendChild(productDescription);
    modalContainer.appendChild(newDescription);
  }

  onClickAddToCart(e) {
    console.log("adding item to cart from productView");
    let currentSku = e.target.getAttribute("data-sku");
    console.log("item " + currentSku + " added to cart");
  }
}