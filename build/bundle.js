/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Cart = __webpack_require__(2);

var _Cart2 = _interopRequireDefault(_Cart);

var _main = __webpack_require__(4);

var _main2 = _interopRequireDefault(_main);

var _BBService = __webpack_require__(1);

var _BBService2 = _interopRequireDefault(_BBService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

    console.log("app constructor");
    this.loadData();
    console.log("after loadData");
  }

  _createClass(App, [{
    key: 'loadData',
    value: function loadData() {
      var service = new _BBService2.default("https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=SXkiDh8lcFEAqyG6rDmJjlH4&sort=description.asc&show=accessories.sku,addToCartUrl,categoryPath.id,description,details.name,details.value,dollarSavings,features.feature,image,longDescription,manufacturer,mobileUrl,modelNumber,name,onlineAvailability,onSale,percentSavings,regularPrice,salePrice,shortDescription,sku,thumbnailImage,type,upc,url&format=json");
      service.loadData(this.onDataLoaded.bind(this), this.onError);
    }
  }, {
    key: 'onDataLoaded',
    value: function onDataLoaded(data) {
      var products = this.mapDataToProducts(data);
      console.log(products);
    }
  }, {
    key: 'mapDataToProducts',
    value: function mapDataToProducts(data) {
      console.log(data);
      return data.products;
    }
  }, {
    key: 'onError',
    value: function onError() {}
  }]);

  return App;
}();

exports.default = App;
;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BBService = function () {
  function BBService(url) {
    _classCallCheck(this, BBService);

    this.url = url;
    console.log("bbservice constructor");
  }

  _createClass(BBService, [{
    key: "loadData",
    value: function loadData(onSuccess, onError) {
      var _this = this;

      var serviceChannel = new XMLHttpRequest();

      serviceChannel.addEventListener("readystatechange", function (e) {
        var target = e.target;
        var readyState = target.readyState;
        var httpStatus = target.status;

        console.log("readyState is " + readyState);
        console.log("httpStatus is " + httpStatus);

        if (e.target.readyState == 4) {
          console.log("processing results");
          _this.processData(e, onSuccess, onError);
        }
      }, false);

      serviceChannel.open("GET", this.url, true);
      serviceChannel.send();
    }
  }, {
    key: "processData",
    value: function processData(e, onSuccess, onError) {
      console.log(e);
      console.log("e.target.status is " + e.target.status);

      if (e.target.status == 200) {
        onSuccess(this.getDataFrom(e));
      } else {
        onError();
      }
    }
  }, {
    key: "getDataFrom",
    value: function getDataFrom(e) {
      var target = e.target;
      var theData = target.responseText;
      return JSON.parse(theData);
    }
  }]);

  return BBService;
}();

exports.default = BBService;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cart = function Cart() {
    _classCallCheck(this, Cart);
};

exports.default = Cart;
;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _App = __webpack_require__(0);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _App2.default(); //importing neseccary files

console.log("sdgf");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainFunctionality = function MainFunctionality() {
  _classCallCheck(this, MainFunctionality);

  //Subscribe Alert
  $(document).ready(function () {
    var emailForm = document.getElementById("emailForm");

    emailForm.addEventListener("submit", onSubmitEmailForm, false);
  });

  function onSubmitEmailForm(eventObject) {
    window.alert("Thank you for subscribing to our updates!");
  }

  //Smooth Scrolling

  $(document).ready(function () {
    // Add smooth scrolling to all links
    $(".smooth-scroll").on('click', function (event) {

      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function () {

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
};

exports.default = MainFunctionality;
;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map