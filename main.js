// cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart= document.querySelector('#close-cart');
// open Cart
cartIcon.onclick = () =>{
    cart.classList.add('active')
};
// close Cart
closeCart.onclick = () =>{
    cart.classList.remove('active')
}
// cart making js
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}
// making function
function ready(){
    // remove item from chart
    var removeCartButtons = document.getElementsByClassName(' cart-remove')
    console.log(removeCartButtons)
    for (var i=0; i< removeCartButtons.length ; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    // QuantityChange
    var quantityInput = document.getElementsByClassName('cart-quantity')
    for (var i=0; i< quantityInput.length ; i++){
        var input = quantityInput[i]
        input.addEventListener('change', quantityChanged)
    }
    //   Add to cart
    var addCart = document.getElementsByClassName('add-chart')
    for (var i=0; i< addCart.length ; i++){
        var button = addCart[i]
        button.addEventListener('click', addCartClick)
    }
    // BUY BUTTON WORK
    document.getElementsByClassName('btn-buy')[0].addEventListener('click' ,buyButtonClick)
}
// buy button
function buyButtonClick(){
    alert("Your Order is placed")
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal();
}
// remove items from chart
function removeCartItem(event){
    var buttonclick = event.target;
    buttonclick.parentElement.remove();
    updateTotal();
}
//  Quantity Changed
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value)|| input.value <=0){
        input.value =1;
    }
    updateTotal();
}
// add to Cart
function addCartClick(event){
    var button = event.target;
    var showProdut =button.parentElement
    var title = showProdut.getElementsByClassName('product-title')[0].innerText;
    var price = showProdut.getElementsByClassName('price')[0].innerText;
    var ProductImg = showProdut.getElementsByClassName('product-img')[0].src;
addProductToCart(title, price, ProductImg);
updateTotal();
}

function addProductToCart(title, price, ProductImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemName = cartItems.getElementsByClassName('cart-produc-title');
    
    for (var i = 0; i < cartItemName.length; i++) {
        if (cartItemName[i].innerText == title) {
            alert("You have already added this item to the cart");
            return;
        }
    }

    var cartBoxContent = `
        <img src="${ProductImg}" alt="" class="cart-img">
        <div class="details-box">
            <div class="cart-produc-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- remove cart -->
        <i class='bx bxs-trash cart-remove'></i>
    `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    // Add event listeners using cartShopBox
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

// update total
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = parseFloat(quantityElement.value);
        total = total + price * quantity;
    }

    // If price contains some cents value
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = "$" + total;
}
