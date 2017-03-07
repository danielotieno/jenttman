module.exports = function Sesscart(oldCart) {

  this.items      = oldCart.items || {};
  this.totalQty   = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(id, size, fashionPrice,fashionid, fashionname, fashionphoto){
    var storedItem    = this.items[id];
    if(!storedItem){
      storedItem  = this.items[id] = {sizeid:id, size:size, fashionid:fashionid, fashionname: fashionname, fashionphoto:fashionphoto,qty:0, price:0};
    }
    storedItem.qty++;
    storedItem.price  = parseFloat(fashionPrice * storedItem.qty);
    this.totalQty++;
    this.totalPrice+=parseFloat(fashionPrice);
  };

  this.addqty = function(id, fashionPrice){
    var storedItem = this.items[id];
    storedItem.qty++;
    storedItem.price  = parseFloat(fashionPrice * storedItem.qty);
    this.totalQty++;
    this.totalPrice+=parseFloat(fashionPrice);
  };

  this.remove = function(id, fashionPrice){
    var storedItem = this.items[id];
    if(storedItem.qty == 1){
      this.totalQty--;
      this.totalPrice-=parseFloat(fashionPrice);
      delete this.items[id];
    }
    else{
      storedItem.qty--;
      storedItem.price = parseFloat(fashionPrice * storedItem.qty);
      this.totalQty--;
      this.totalPrice-=parseFloat(fashionPrice);
    }
  };

  this.removeobject = function(id){
    var storedItem = this.items[id];
    this.totalQty-=parseFloat(storedItem.qty);
    this.totalPrice-=parseFloat(storedItem.price);
    console.log("Store item price for reduction"+storedItem.price);
    delete this.items[id];
  }
  
  this.generateArray = function(){
    var arr = [];
    for(var id in this.items){
      arr.push(this.items[id]);
    }
    return arr;
  };
};
