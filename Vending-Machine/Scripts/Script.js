var order = [];
var dispatchedItems = [];
var preparing = false;
var secs = 0;
var total = 0.00;


var products = [
    {
        id: 1,
        image: "https://pngimg.com/uploads/cocacola/cocacola_PNG22.png",
        gif: "https://i.pinimg.com/originals/85/0c/a5/850ca573b4bec3e1a24f25c8e5b153e1.gif",
        name: "Coca Cola",
        price: 1,
        time: 6
    },
    {
        id: 2,
        image: "https://pngimg.com/uploads/doritos/doritos_PNG26.png",
        gif: "https://thumbs.gfycat.com/TallFloweryKakarikis-small.gif",
        name: "Doritos",
        price: 0.50,
        time: 4
    },
    {
        id: 3,
        image: "https://pngimg.com/uploads/m_m/m_m_PNG33.png",
        gif: "https://media3.giphy.com/media/VIE6l8y8dEEPmBKzNK/giphy.gif",
        name: "M&Ms",
        price: 0.75,
        time: 3
    },
];


$(document).ready(function () {
    createMachine();
    $('#load').hide();
});

function createMachine() {
    for (let i = 0; i < products.length; i++) {
        let tag = `
                        <div class ="vending">
                            <img src="${products[i].image}" alt="${products[i].name}" />
                            <strong>${products[i].name} </strong>
                            <strong>${'$' + products[i].price}</strong>
                            <button class ="btn btn-outline-primary" onclick="orderItem(${products[i].id})">Order</button>
                        </div>
                `;
        $('#items-vending').append(tag);
    }
}

function orderItem(id) {
    
    if (preparing === false) {
        $('#items-gif').empty();
        $('#item-finished').empty();
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
            let value = products.filter((d) => d.id === id)[0];
            if (value) {
                let obj = {
                    id: value.id,
                    name: value.name,
                    image: value.image,
                    quantity: 1,
                    price: value.price,
                    gif: value.gif,
                    time: value.time
                };
                order.push(obj);
                dispatchedItems.push(obj);
                orderCreated(id);
            }
        }
    } else setTimeout(orderItem, secs, id);
}

function updateOrder(id) {
    let value = order.filter((d) => d.id === id)[0];
    let textId = `#order-item-id-${id}`;
    if (value) {
        $(textId).text(value.quantity);
        let obj = {
            id: value.id,
            name: value.name,
            image: value.image,
            quantity: 1,
            price: value.price,
            gif: value.gif,
            time: value.time
        };
        order.push(obj);
       dispatchedItems.push(obj);
       orderCreated(id);      
    }
}

function orderCreated(id) {
    let value = order.filter((d) => d.id === id)[0];
    total = 0.00;
    preparingOrder(value.id);
    let tag = `
            <div class ="item-order" id="item-order-id-${id}">
                <strong>${value.name}</strong>
                <strong>${'$' + value.price} </strong>                
            </div>
           `;
    $('#item-order').append(tag);
}
    
function preparingOrder(id) {
    preparing = true;
    showTotal();
    document.getElementById("items-gif").style.display = "flex";
    let value = order.filter((d) => d.id === id)[0];
        counter(id);
        let tag = `
            <div class ="item-order" id="item-order-id-${id}">
                 <img src="${value.gif}". alt="${value.name}" />              
            </div>
           `;
        $('#items-gif').append(tag);      
}

function showTotal() {
    for (let i = 0; i < order.length; i++) {
        total += order[i].price;
    }
    document.getElementById("total-amount").innerHTML = "$" + total;
}

function dispatched(id) {
    preparing = false;
    let value = order.filter((d) => d.id === id)[0];
        let tag = `
                        <div class ="dispatching">
                            <strong>${value.name} </strong>
                            <strong>${'$' + value.price}</strong>
                        </div>
                `;
        $('#items-dispatched').append(tag);
}

function counter(id) {
    let value = order.filter((d) => d.id === id)[0];
    time = value.time;
    var downloadTimer = setInterval(function () {
        if (time <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "Finished";
            dispatched(id);
            document.getElementById("items-gif").style.display = "none";
            let tag = `
            <div class ="item-prep">
                   <img src="${value.image}" alt="${value.name}" />             
            </div>
           `;
            $('#item-finished').append(tag);
        } else {
            document.getElementById("countdown").innerHTML = time + " seconds left";
        }
        secs = time;
        time -= 1;      
    }, 1000);
}