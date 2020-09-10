if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  var removeButton = document.getElementsByClassName("btn-danger");

  for (var i = 0; i < removeButton.length; i++) {
    var button = removeButton[i];
    button.addEventListener("click", removeCart);
  }
  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  //quantityInputs =document.addEventListener('change',quantityChanged);
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  var addCartButton = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addCartButton.length; i++) {
    var button = addCartButton[i];
    button.addEventListener("click", addToCartClicked);
  }
  document.getElementsByClassName("btn-purchase")[0].addEventListener('click',Purchase);
}
function Purchase(e,total){
    
    alert('Thank you for your purchase ');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();

}
function addToCartClicked(e) {
  var button = e.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var img = shopItem.getElementsByClassName("shop-item-image")[0].src;
  var price = shopItem.getElementsByClassName("shop-item-price ")[0].innerText;
  addToCartItem(title, img, price);
  updateCartTotal();
}
function addToCartItem(title, img, price) {
  var cartRow = document.createElement("div");
  cartRow.classList.add('cart-row');
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = document.getElementsByClassName("cart-item-title");
  for(var i=0;i<cartItemNames.length;i++){
      if(cartItemNames[i].innerText == title){
          alert('This is already added to the cart')
          return
      }
  }
  var cartRowConTents = `
        <div class="cart-item cart-column">
            <img src="${img}" class="cart-item-image" width="100" height="100" alt="">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column float-right">
            <input type="number" class="cart-quantity-input" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowConTents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCart);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged);
}
function quantityChanged(e) {
  var input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}
function removeCart(e) {
  var buttonClicked = e.target;
  buttonClicked.parentElement.parentElement.remove();
  console.log(buttonClicked);
  updateCartTotal();
}

function updateCartTotal() {
  var cartItem = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItem.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var PriceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(PriceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
 document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
