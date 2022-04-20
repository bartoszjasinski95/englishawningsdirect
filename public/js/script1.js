let cartIcon = document.querySelectorAll('.cart-icon');
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart');


// Open cart
cartIcon.forEach(box => {
    box.addEventListener('click', function handleClick(event) {
        cart.classList.add('active');
    });
  });
closeCart.onclick = () =>{
    cart.classList.remove('active');
};



//Cart Working JS
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

//Making function
function ready(){
    //Remove Items From Cart
    var removeCartButtons =document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem);
    }

    // Quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged);

    }
    // Add to Cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener('click', addCartClicked)
    }
    //Buy button work
    
}


// Remove Items From Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
// quantityChanges

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

$('form').on('submit', (e) => {
	$('form').attr('action', "/sample");
	$('form').attr('method', "POST")
	$('form').submit();
});;

var i = 0;
//Add to cart
function addCartClicked(event){
	
	if(i >= 3){
		alert("maximum limit of 3");
	}
	else {
		var username = document.getElementById("username");
		if (username.value === ""){
			alert("Please enter the number first");
			username.focus();
		}
		else {
			var button= event.target
			var shopProducts = button.parentElement
			var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
			var price = shopProducts.getElementsByClassName('price')[0].innerText;
			var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
			addProductToCart(title, price, productImg,);
			updatetotal(username.value);
		}
	}
	
    
}
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var CartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (let i = 0; i < CartItemsNames.length; i++) {
        if (CartItemsNames[i].innerText == title) {
            alert("You have already add this item to cart");
            return;
        }
    
    }
	i++;
var cartBoxContent = `
                    <img src="${productImg}" alt="" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                        <input name="samples" type="text" value="${title}" style="display: none">
                    </div>
                    <!--Remove cart-->
                    <i class='bx bxs-trash-alt cart-remove'></i> `;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
cartShopBox
.getElementsByClassName("cart-quantity")[0]
.addEventListener("change", quantityChanged);
}


//Update Total 

function updatetotal(str) {   
        document.querySelector(".total-title").innerHTML = str;    
        document.getElementById("price").value = str;    
}