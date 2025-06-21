let shop = document.getElementById('shop')

let basket = JSON.parse(localStorage.getItem("data")) || []

let generateShop = () => {

    return (shop.innerHTML = shopItemsData.map((x) => {
        let {id, name, price, desc, img} = x
        let search = basket.find((x) => x.id === id) || []
        return `
            <div id="item-${id}" class="item">
                <img width="200px" src=${img} alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h3>$${price}</h3>
                        <div class="buttons">
                            <img onclick="decrement('${id}')" src="images/dash.svg" alt="">
                            <div id="quantity-${id}" class="quantity">${search.quantity === undefined? 0: search.quantity}</div>
                            <img onclick="increment('${id}')" src="images/plus.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join(""))
}

generateShop();

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
    localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(`quantity-${id}`).innerHTML = search.quantity
    calculate()
}

function calculate() {
    let cartIcon = document.getElementById('cartAmount')
    cartIcon.innerHTML = basket.map((x) => x.quantity).reduce((x, y) => x + y, 0)
}

calculate()