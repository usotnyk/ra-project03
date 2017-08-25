export default class CheckoutView {
  constructor(totalPrice) {
    this.totalPrice = totalPrice;
    this.init();

  }

  init() {
    this.buildCheckout();
  }

  buildCheckout() {
    let checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.style.display = "block";
    
    let span = document.getElementById('close-checkout');
    span.onclick = function(event) {
      checkoutModal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == checkoutModal) {
        checkoutModal.style.display = "none";
      }
    }  
    //debugger;
    this.renderCheckout(this.totalPrice);
  }

  renderCheckout(totalPrice) {
    let totalAmountSpan = document.getElementById('total-pay-span');
    //debugger;
    totalAmountSpan.innerHTML = "";
    let totalAmount = document.createTextNode(totalPrice);
    totalAmountSpan.appendChild(totalAmount);
    this.integrateStripe();
  }

  integrateStripe() {
    // Create a Stripe client
    let stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

    // Create an instance of Elements
    let elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: 'inherit',
        fontSize: '1.1em',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element
    let card = elements.create('card', {
      hidePostalCode: true,
      style: style
    });

    // Add an instance of the card Element into the `card-element` <div>
    card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function(event) {
      let displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    // Handle form submission
    let form = document.getElementById('payment-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      stripe.createToken(card).then(function(result) {
        if (result.error) {
          // Inform the user if there was an error
          let errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server
          //stripeTokenHandler(result.token);
          let successContainer = document.getElementById("success");
          successContainer.style.display = "block";
        }
      });
    });

  } //end of integrateStripe


} //end of class