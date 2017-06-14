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

    window.onclick = function(event) {
      if (event.target == cartModal) {
        cartModal.style.display = "none";
      }
    }

    let clearCartBtn = document.getElementById("clear-cart-btn");
    clearCartBtn.addEventListener("click", this.clearCart.bind(this), false);
    
    let innerModalCart = document.getElementById('inner-modal-cart');
    innerModalCart.innerHTML = "";
    let totalPrice = this.getTotalPrice();
    this.getEachItemInCart(innerModalCart, currentProductsInSS);
    if (totalPrice > 0) {
      this.renderPriceTotal(innerModalCart, totalPrice);
    }
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

    let newName = document.createElement("p");
    let productName = document.createTextNode(currentProduct.name);
    newName.appendChild(productName);
    newSection.appendChild(newName);

    let newPrice = document.createElement("h4");
    let productPrice = document.createTextNode("$" + currentProduct.regularPrice);
    newPrice.appendChild(productPrice);
    newSection.appendChild(newPrice);

    let newQty = document.createElement("div");
    newQty.setAttribute("class", "cart-quantity-container");
    let qtyTitleContainer = document.createElement("span");
    let qtyTitle = document.createTextNode("Quantity");
    qtyTitleContainer.appendChild(qtyTitle);
    
    let inputField = document.createElement("input");
    inputField.setAttribute("type", "number");
    inputField.setAttribute("value", currentProduct.qty);
    inputField.setAttribute("id", "qty"+currentProduct.sku);
    newQty.appendChild(qtyTitleContainer);
    newQty.appendChild(inputField);
    newSection.appendChild(newQty);

    let innerDiv = document.createElement("div");
    innerDiv.setAttribute("class", "flex flex-column");
    newSection.appendChild(innerDiv);

    let updateButton = document.createElement("button");
    updateButton.setAttribute("type","button");
    updateButton.setAttribute("class", "btn update-btn");
    updateButton.setAttribute("data-sku", currentProduct.sku);
    updateButton.appendChild(document.createTextNode("UPDATE"));
    updateButton.addEventListener("click", this.onClickUpdateCart.bind(this),false);
    innerDiv.appendChild(updateButton);

    let removeButton = document.createElement("button");
    removeButton.setAttribute("type","button");
    removeButton.setAttribute("class", "btn remove-btn");
    removeButton.setAttribute("data-sku", currentProduct.sku);
    removeButton.appendChild(document.createTextNode("REMOVE"));
    removeButton.addEventListener("click", this.onClickDeleteFromCart.bind(this),false);
    innerDiv.appendChild(removeButton);

    let clearCartBtn = document.getElementById('clear-cart-btn');
    clearCartBtn.style.display = "initial";
    let checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.style.display = "initial";

  }

  renderPriceTotal(modalContainer, price) {
    let newTotal = document.createElement("div");
    newTotal.setAttribute("class", "total-container");

    let newTotalTittleContainer = document.createElement("span");
    let newTotalTitle = document.createTextNode("Total:");
    newTotalTittleContainer.appendChild(newTotalTitle);
    newTotal.appendChild(newTotalTittleContainer);

    let newTotalQtyContainer = document.createElement("span");
    let newTotalQty = document.createTextNode("$"+price);
    newTotalQtyContainer.appendChild(newTotalQty);
    newTotal.appendChild(newTotalQtyContainer);

    modalContainer.appendChild(newTotal);
  }

  onClickDeleteFromCart(e) {
    let currentProduct = this.findProductBySku(e.target.getAttribute("data-sku")); 
    this.cart.onClickDeleteFromCart(currentProduct);
    this.buildModal();
  }

  onClickUpdateCart(e) {
    let currentProductSku = e.target.getAttribute("data-sku");
    let currentProduct = this.findProductBySku(e.target.getAttribute("data-sku")); 
    let newQty = document.getElementById("qty"+currentProductSku).value;
    this.cart.onClickUpdateCart(currentProduct, newQty);
    this.buildModal();

  }

  findProductBySku(sku) {
    for (let i=0; i<this.products.length; i++) {
      if (this.products[i].sku == sku) {
        return this.products[i];
      }
    }
  }

  getTotalPrice() {
    let currentProductsInSS = this.getCurrentProductsInSS(this.cart.getAllItems(), this.products);
    return this.cart.getTotalPrice(currentProductsInSS);
  }

}