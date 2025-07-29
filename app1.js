let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'Caesar Salad',
        image: 'D1.PNG',
        price: 2500
    },
    {
        id: 2,
        name: 'Murgh Tandoori',
        image: 'D2.PNG',
        price: 1500
    },
    {
        id: 3,
        name: 'Salmon Salad',
        image: 'D3.PNG',
        price: 4000
    },
    {
        id: 4,
        name: 'Pumpkin Soup',
        image: 'D4.PNG',
        price: 1700
    },
    {
        id: 5,
        name: 'Maxican Salad',
        image: 'D5.PNG',
        price: 3000
    },
    {
        id: 6,
        name: 'Margherita Pizza',
        image: 'D6.PNG',
        price: 2600
    }
];

let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">₹${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Order</button>`;
        list.appendChild(newDiv);
    });
}
initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    console.log("Cart items:", listCards);

    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += products[key].price * value.quantity;
            count += value.quantity;

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>₹${(products[key].price * value.quantity).toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = `Total Amount: ₹${totalPrice.toLocaleString()} (This is the total amount)`;
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
