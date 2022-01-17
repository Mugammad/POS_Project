let cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];

function readCart(cart){
    document.querySelector('#cartItems').innerHTML = ""
    cart.forEach((cartItem, position) => {
        document.querySelector('#cartItems').innerHTML += `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${cartItem.img}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${cartItem.name}</h5>
                            <input type="number" min=1 value=${parseInt(cartItem.qty)} id="cartQty-${position}" onchange="qtyChange(${position})">
                            <h6>R${parseInt(cartItem.price)*parseInt(cartItem.qty)}</h6>
                            <button class="btn btn-danger" onclick="removeCartItem(${position})">remove</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        
    });

    calculateTotal()
}

readCart(cart)

function removeCartItem(position){
    document.querySelector('#total').innerHTML = ''
    cart.splice(position,1)
    localStorage.setItem("cart", JSON.stringify(cart))
    readCart(cart)
}

function qtyChange(position){
    let qtyChanged = document.querySelector(`#cartQty-${position}`).value
    cart[position].qty = qtyChanged
    localStorage.setItem("cart", JSON.stringify(cart))
    readCart(cart)
}

function calculateTotal(){
    let total = 0
    try{
        if(cart[0] == null ) throw "Your cart is empty"
        cart.forEach(item => {
            total += parseInt(item.price)*parseInt(item.qty)
        })
        document.querySelector('#total').innerHTML = `
            <h1>Your total is: R${total.toFixed(2)}</h1>
        `
    }catch(err){
        document.querySelector('#total').innerHTML = `
            <h1>${err}</h1>
        `
        document.querySelector('#checkout').hidden = true
    }
}

function clearCart(){
    cart = []
    localStorage.setItem("cart", JSON.stringify(cart))
    readCart(cart)
}