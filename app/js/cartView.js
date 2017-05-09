import Cart from './cart'

export default class CartView {
  constructor(cart, products) {
    this.cart = cart;
    this.products = products;

  }
    buildCartView(){
    this.buildModal();
  }

  buildModal() {

    let currentProductsInSS = this.getCurrentProductsInSS(this.cart.getAllItems(), this.products);
    let cartModal = document.getElementById('cart-modal');
    cartModal.style.display = "block";

    let span = document.getElementById('close-cart');
    span.onclick = function(event) {
      cartModal.style.display = "none";
    }
//refactor above and below

    window.onclick = function(event) {
      if (event.target == cartModal) {
        cartModal.style.display = "none";
      }
    }

    let clearCartBtn = document.getElementById("clear-cart-btn");
    clearCartBtn.addEventListener("click", this.clearCart.bind(this), false);
    

    let innerModalCart = document.getElementById('inner-modal-cart');

    this.getEachItemInCart(innerModalCart, currentProductsInSS);
  }

  clearCart(e) {
    this.cart.clearCart();
    let innerModalCart = document.getElementById('inner-modal-cart');
    this.displayEmptyCart(innerModalCart);
  }

  getCurrentProductsInSS (cartItems, allProducts) {
    let currentProductsInSS = [];
    for (let key in cartItems) {
      let sku = key;
      let qty = cartItems[key];
      for (let k = 0; k < allProducts.length; k++) {
        if(sku == allProducts[k].sku) {
          allProducts[k].qty = qty;
          currentProductsInSS.push(allProducts[k]);
        }
      }  
    }
    return currentProductsInSS;
  }

  getEachItemInCart(modalContainer, currentProductsInSS) {
    if (currentProductsInSS.length == 0) {
      this.displayEmptyCart(modalContainer);
    } else {
      for (let i=0; i<currentProductsInSS.length; i++) {
        this.renderCartModalContent(modalContainer, currentProductsInSS[i]);
      }
    }
  }

  displayEmptyCart(modalContainer) {
    console.log("empty cart message");
    modalContainer.innerHTML ='';
    let newParagraph = document.createElement("h4");
    let productParagraph = document.createTextNode("You shopping cart is currently empty!")
    newParagraph.appendChild(productParagraph);
    modalContainer.appendChild(newParagraph);
    let clearCartBtn = document.getElementById('clear-cart-btn');
    clearCartBtn.style.display = "none";
    let checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.style.display = "none";
  }

  renderCartModalContent(modalContainer, currentProduct) {
    let newSection = document.createElement("section");
    newSection.setAttribute("class", "flex");
    modalContainer.appendChild(newSection);

    let newImage = document.createElement("img");
    newImage.src = currentProduct.image;
    newImage.setAttribute("class", "modal-cart-img");
    newSection.appendChild(newImage);

    newSection.appendChild(document.createElement("hr"));

    let newName = document.createElement("p");
    let productName = document.createTextNode(currentProduct.name);
    newName.appendChild(productName);
    newSection.appendChild(newName);

    newSection.appendChild(document.createElement("hr"));

    let newPrice = document.createElement("h4");
    let productPrice = document.createTextNode("$" + currentProduct.regularPrice);
    newPrice.appendChild(productPrice);
    newSection.appendChild(newPrice);

    newSection.appendChild(document.createElement("hr"));

    let newQty = document.createElement("div");
    let productQty = document.createTextNode("Quantity " + currentProduct.qty);
    newQty.appendChild(productQty);
    newSection.appendChild(newQty);

    let innerDiv = document.createElement("div");
    innerDiv.setAttribute("class", "flex flex-column");
    newSection.appendChild(innerDiv);

    let updateButton = document.createElement("button");
    updateButton.setAttribute("type","button");
    updateButton.setAttribute("class", "update-btn");
    updateButton.setAttribute("data-sku", currentProduct.sku);
    updateButton.appendChild(document.createTextNode("UPDATE"));
    innerDiv.appendChild(updateButton);

    let removeButton = document.createElement("button");
    removeButton.setAttribute("type","button");
    removeButton.setAttribute("class", "remove-btn");
    removeButton.setAttribute("data-sku", currentProduct.sku);
    removeButton.appendChild(document.createTextNode("REMOVE"));
    innerDiv.appendChild(removeButton);

    let clearCartBtn = document.getElementById('clear-cart-btn');
    clearCartBtn.style.display = "initial";
    let checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.style.display = "initial";

  }



}