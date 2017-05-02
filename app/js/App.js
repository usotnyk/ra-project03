import Cart from './Cart';
import MainFunctionality from './main';


export default class App{
  constructor(owner){

    console.log("this cart belongs to " + owner);
    let BBCart = new Cart ("BBCart");
    BBCart.totalCost(2, 5);

    let mainJS = new MainFunctionality();
  }

};

