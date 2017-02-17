var cart = [];
function showCart(){
  if(cart.length>0){
    $(".myCart_quantity").text(cart.length);
  }
}
function saveCart() {
  if ( window.localStorage){
    localStorage.cart = JSON.stringify(cart);
  }
}
$(document).ready(function(){
  if(localStorage.cart){
    cart = JSON.parse(localStorage.cart);
    showCart();
  }
  $(".sizes").on('click' , function(){
    if($(this).hasClass("checked")){
      $(this).removeClass('checked', false);
    }else{
      $(".sizes").removeClass('checked', false);
      $(this).addClass('checked', true);
    }
  });
  $(".simpleCart_empty").on('click' , function(){
    localStorage.clear();
    cart.length = 0;
    saveCart();
    $(".myCart_quantity").text("0");
  });
  $(".sizebutton").on('click' , function(){
    if($("span").hasClass("checked")){
      var fashion_id = $(".checked").data("fashion-id");
      var fashion_name = $(".checked").data("fashion-name");
      var size_selected = $(".checked").data("size-name");
      var fashion_image = $(".checked").data("fashion-image");
      var fashion_price = $(".checked").data("fashion-price");
      //Check if is in cart and prevent further addition to cart 
      for (var i in cart) {
        if(cart[i].Fashion_id == fashion_id){
          alert("Fashion already exists in cart");
          return;
        }
      }
      var item = {Fashion_id: fashion_id,Fashion_name:fashion_name, Fashion_price:fashion_price, Fashion_image:fashion_image, Size_name: size_selected};
      cart.push(item);
      saveCart();
      showCart();
    }else{
      alert("no size checked");
    }
  });
});
