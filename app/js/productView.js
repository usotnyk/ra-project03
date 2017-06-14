import CarouselView from "./carouselView";
import App from "./App" 

export default class ProductView {
  constructor(app, product) {
      this.product = product;
      this.cart = app.cart;
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
    this.createModalContent(innerModal, this.product);
  }

  createModalContent(modalContainer, currentProduct) {
    modalContainer.innerHTML ='';
    let newSection = document.createElement("section");
    newSection.setAttribute("class", "flex");
    modalContainer.appendChild(newSection);

    let newImage = document.createElement("img");
    newImage.src = currentProduct.image;
    newImage.setAttribute("class", "modal-img");
    newSection.appendChild(newImage);
    
    let innerDiv = document.createElement("div");
    innerDiv.setAttribute("class", "productview-info-container");
    newSection.appendChild(innerDiv);

    let newName = document.createElement("h3");
    let productName = document.createTextNode(currentProduct.name);
    newName.appendChild(productName);
    innerDiv.appendChild(newName);

    let newPrice = document.createElement("h4");
    let productPrice = document.createTextNode("$" + currentProduct.regularPrice);
    newPrice.appendChild(productPrice);
    innerDiv.appendChild(newPrice);

    let newCartButton = document.createElement("button");
    newCartButton.setAttribute("data-sku", currentProduct.sku);
    newCartButton.setAttribute("type","button");
    newCartButton.setAttribute("class", "btn cart-btn");
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
    this.cart.addItemtoCart(this.product, 1);
  }
}