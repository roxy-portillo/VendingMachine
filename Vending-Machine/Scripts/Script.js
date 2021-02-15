var order = [];
var dispatched = [];
var creating = false;
var data = [
    {
        id: 1,
        image: "https://pngimg.com/uploads/cocacola/cocacola_PNG22.png",
        name: "Coca Cola",
        price: 1,
        preptime: 2
    },
    {
        id: 2,
        image: "https://pngimg.com/uploads/doritos/doritos_PNG26.png",
        name: "Doritos",
        price: 0.50,
        preptime: 5
    },
    {
        id: 3,
        image: "https://pngimg.com/uploads/m_m/m_m_PNG33.png",
        name: "M&Ms",
        price: 0.75,
        preptime: 7
    },
];


$(document).ready(function () {
    createMachine();
    $('#load').hide();
});

function createMachine() {
    var items = ``;
    for (let i = 0; i < data.length; i++) {
        let tag = `
                        <div class ="vending">
                            <img src="${data[i].image}" alt="${data[i].name}" />
                            <strong>${data[i].name} ${'$' + data[i].price}</strong>
                            <button class ="btn btn-outline-primary" onclick="orderItem(${data[i].id})">Order</button>
                        </div>
                `;
        $('#items-vending').append(tag);
    }
}

function orderItem(id) {
    if (creating === false) {
        let orderI = order.filter((d) => d.id === id)[0];
        if (orderI) {
            order = order.map((val) => {
                if (val.id === id) {
                    val.quantity = val.quantity + 1;
                }
                return val;
            });
            updateOrder(id);
        } else {
            let value = data.filter((d) => d.id === id)[0];
            if (value) {
                let obj = {
                    id: value.id,
                    name: value.name,
                    quantity: 1,
                    price: value.price
                };
                order.push(obj);
                createOrder(id);
            }
        }
    }
}

function updateOrder(id) {
    let value = order.filter((d) => d.id === id)[0];
    let textId = `#order-item-id-${id}`;
    console.log(textId);
    if (value) {
        $(textId).text(value.quantity);
    }
}

function createOrder(id) {
    let value = order.filter((d) => d.id === id)[0];
    let tag = `
            <div class ="item-order" id="item-order-id-${id}">
                <strong>${value.name}</strong>
                <strong>Quantity: <span id="order-item-id-${id}">${value.quantity}</span></strong> 
                <strong>Price ${'$' + value.price} </strong> 
            </div>
        `;
    $('#item-order').append(tag);

}








