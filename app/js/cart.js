export default class Cart{

    constructor(cartName){

        console.log(cartName + " is imported from cart.js");
        this.init();
    }

    init() {
        this.totalCost= function (amount, price) {
            let totalCost = amount*price;
            console.log(totalCost);
        }
    }

};