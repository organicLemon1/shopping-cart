let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')

let basket = JSON.parse(localStorage.getItem("data")) || []

function calculate() {
    let cartIcon = document.getElementById('cartAmount')
    cartIcon.innerHTML = basket.map((x) => x.quantity).reduce((x, y) => x + y, 0)
}

calculate()

let generateCartItems = () => {
    if(basket.length !== 0) {
        return shoppingCart.innerHTML = basket.map((x) => {
            let {id, quantity} = x
            let search = shopItemsData.find((y) => y.id === id) || []
            return `
                <div class="cart-item">
                    <img width="100px" src=${search.img}>
                    <div class="details">
                        <div class="title-price-x">
                            <div class="title-price">
                                <h3>${search.name}</h3>
                                <h3 class="cart-item-price">$${search.price}</h3>
                            </div>
                            <img onclick="removeItem('${id}')" src="images/x.svg">
                        </div>
                        <div class="buttons">
                            <img onclick="decrement('${id}')" src="images/dash.svg" alt="">
                            <div id="quantity-${id}" class="quantity">${quantity}</div>
                            <img onclick="increment('${id}')" src="images/plus.svg" alt="">
                        </div>
                        <h3>
                            $${search.price * quantity}
                        </h3>
                    </div>
                </div>
            `
        }).join("")
    } else {
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
                <button class="HomeBtn">Back to Home</button>
            </a>
        `
        shoppingCart.innerHTML = ``
    }
}

generateCartItems()

let increment = (id) => {
    let search = basket.find((x) => x.id === id)
    if(search === undefined) {
        basket.push({
            id: id,
            quantity: 1,
        })
    } else {
        search.quantity++
    }
    
    update(id)
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket))
}

let decrement = (id) => {
    let search = basket.find((x) => x.id === id)
    if(search === undefined || search.quantity === 0) return
    else {
        search.quantity--
    }
    
    update(id)
    basket = basket.filter((x) => x.quantity !== 0)
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(`quantity-${id}`).innerHTML = search.quantity
    calculate()
    totalAmount()
}

let removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id)
    localStorage.setItem("data", JSON.stringify(basket))
    generateCartItems()
    totalAmount()
    calculate()
}

let totalAmount = () => {
    if(basket.length !== 0) {
        let amount = basket.map((x) => {
            let {id, quantity} = x
            let search = shopItemsData.find((y) => y.id === id) || []
            return search.price * quantity
        }).reduce((x, y) => x + y, 0)
        label.innerHTML = `
            <h2>Total Bill: $${amount}</h2>
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `
    } else {
        return
    }
}

totalAmount()

let clearCart = () => {
    basket = []
    generateCartItems()
    calculate()
    localStorage.setItem("data", JSON.stringify(basket))
}