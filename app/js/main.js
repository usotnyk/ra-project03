export default class MainFunctionality {
  constructor(){
  

    //Subscribe Alert
    $(document ).ready(function() {
      var emailForm = document.getElementById("emailForm");

      emailForm.addEventListener("submit", onSubmitEmailForm, false);
    });

      function onSubmitEmailForm (eventObject) {
        window.alert("Thank you for subscribing to our updates!")
    }

    //Smooth Scrolling

    $(document).ready(function(){
      // Add smooth scrolling to all links
      $(".smooth-scroll").on('click', function(event) {

        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
       
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });

    //Slider - Flickity

      $('.main-carousel').flickity({
      // options
      cellAlign: 'left',
      contain: true,
      freeScroll: true,
      wrapAround: true
      });

    });
  }
};

