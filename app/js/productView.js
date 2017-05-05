import CarouselView from "./carouselView";
import App from "./App" 

export default class ProductView {
  constructor(sku, products) {
      this.sku = sku;
      this.products = products;
  }

  buildProductView(){
    console.log('builing ProductView with sku ' + this.sku);
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
    console.log(theProduct);
    this.createModalContent(innerModal, theProduct);
  }

  findProductFromSku(sku) {
    console.log("product based on sku" + sku);
    console.log(this.products);
    for (let i=0; i<this.products.length; i++) {
      if (this.products[i].sku == sku) {
        return this.products[i];
      }
    }
  }

  createModalContent(modalContainer, currentProduct) {
    modalContainer.innerHTML ='';

    console.log("inside createModalContent")
    let newTitle = document.createElement("h3");
    let productSku = document.createTextNode(currentProduct.sku);
    newTitle.appendChild(productSku);
    modalContainer.appendChild(newTitle);
  }
}