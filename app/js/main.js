import $ from 'jquery';
import Flickity from 'flickity';


export default class MainFunctionality {

  constructor(){
    $(document).ready(function() {
        var emailForm = document.getElementById("emailForm");

        emailForm.addEventListener("submit", onSubmitEmailForm, false);
      });

        function onSubmitEmailForm (eventObject) {
          window.alert("Thank you for subscribing to our updates!")
      }

      $(document).ready(function(){
        $(".smooth-scroll").on('click', function(event) {

          if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
          
          $('html, body').animate({
            scrollTop: $(hash).offset().top
            }, 800, function(){

              window.location.hash = hash;

            });
          }
        });

        let elem = document.querySelector('.main-carousel');
        let flkty = new Flickity( elem, {
        // options
        cellAlign: 'left',
        contain: true
        });

      /*$('.main-carousel').flickity({
        cellAlign: 'left',
        contain: true,
        freeScroll: true,
        wrapAround: true
      });*/

    });

  }
};

