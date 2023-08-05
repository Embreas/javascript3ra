let itemsincart = [];
if (localStorage.getItem("cart")) {
    itemsincart = JSON.parse(localStorage.getItem("cart"));
} else {
    localStorage.setItem("cart", JSON.stringify(itemsincart));
}

function findinfo(searched, array) {
    let find = array.filter((item) =>
        item.type.toLowerCase().includes(searched.toLowerCase()) ||
        item.itemname.toLowerCase().includes(searched.toLowerCase())
    );
    if (find.length == 0) {
        match.innerHTML = "";
        let newdivcreated = document.createElement("div");
        newdivcreated.innerHTML = `<p>There's nothing to show </p>`;
        match.appendChild(newdivcreated);
        showcatalog(array);
        } else {
        match.innerHTML = "";
        showcatalog(find);
    }
}

function hitolow(array) {
    let higher2lower = [].concat(array);
    higher2lower.sort((a, b) => b.price - a.price);
    showcatalog(higher2lower);
}

function lowtohi(array) {
    let lower2higher = [].concat(array);
    lower2higher.sort((a, b) => a.price - b.price);
    showcatalog(lower2higher);
}

function alphaorder(array) {
    let alphabeth = [].concat(array);
    alphabeth.sort((a, b) => {
    return 0;
    });
    showcatalog(alphabeth);
}

let divitems = document.getElementById("items");
let saveitembtn = document.getElementById("btnsaveitem");
let finder = document.getElementById("finder");
let modalbody = document.getElementById("modal-body");
let cartbtn = document.getElementById("cartbtn");
let match = document.getElementById("match");
let orderselection = document.getElementById("orderselection");

function showcatalog(array) {
    divitems.innerHTML = "";
    for (const item of array) {
    let newitem2add = document.createElement("div");
    newitem2add.classList.add("col-12", "col-md-6", "col-lg-4", "my-4");
    newitem2add.innerHTML = 
        `<div id="${item.id}" class="card" style="width: 19rem;">
        <img class="card-img-top img-fluid" style="height: 250px;"src="img/${item.image}" alt="${item.itemname} de ${item.type}">
        <div class="card-body">
            <h4 class="card-title">${item.itemname}</h4>
            <p>Type: ${item.type}</p>
            <p class="">Price: ${item.price}</p>
            <button id="addbtn${item.id}" class="btn btn-outline-success add-item-button-container-btn">add to cart</button>
        </div>
        </div>`;
    divitems.appendChild(newitem2add);
    let addbtnvar = document.getElementById(`addbtn${item.id}`);
    addbtnvar.addEventListener("click", () => {
        add2cart(item);
        });
    }
}

function add2cart(item) {
    itemsincart.push(item);
    localStorage.setItem("cart", JSON.stringify(itemsincart));
}

function loaditemsincart(array) {
    modalbody.innerHTML = "";
    array.forEach((cartitem) => {
        modalbody.innerHTML += 
        `<div class="card border-primary mb-3" id ="cartitem${cartitem.id}" style="max-width: 480px;">
        <img class="card-img-top" height="320px" src="img/${cartitem.image}" alt="${cartitem.itemname}">
            <div class="card-body">
                <h5 class="card-title">${cartitem.itemname}</h5>
                <p class="card-text">$${cartitem.price}</p> 
                <button class= "btn btn-danger remove-item-button" id="removebtn${cartitem.id}"><img src="./img/trash-bin.png" alt=""></i></button>
            </div>    
        </div>
        `;
    });
    array.forEach((cartitem, index) => {
        document
        .getElementById(`removebtn${cartitem.id}`)
        .addEventListener("click", () => {
        let cardProducto = document.getElementById(
            `cartitem${cartitem.id}`
        );
        cardProducto.remove();
        itemsincart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(itemsincart));
        });
    });
}

function loaditem(array) {
    let inputType = document.getElementById("inputType");
    let inputName = document.getElementById("inputName");
    let inputPrice = document.getElementById("inputPrice");
    let createditem = new Item(
    array.length + 1,
    inputType.value,
    inputName.value,
    parseInt(inputPrice.value),
    "latalelogo2.png"
    );
    array.push(createditem);
    localStorage.setItem("itemshelf", JSON.stringify(array));
    showcatalog(array);
    inputType.value = "";
    inputName.value = "";
    inputPrice.value = "";
}

saveitembtn.addEventListener("click", () => {
    loaditem(itemshelf);
});
finder.addEventListener("input", () => {
    findinfo(finder.value, itemshelf);
});
cartbtn.addEventListener("click", () => {
    loaditemsincart(itemsincart);
});
orderselection.addEventListener("change", () => {
    if (orderselection.value == 1) {
    hitolow(itemshelf);
    } else if (orderselection.value == 2) {
    lowtohi(itemshelf);
    } else if (orderselection.value == 3) {
    alphaorder(itemshelf);
    } else {
    showcatalog(itemshelf);
    }
});

showcatalog(itemshelf);
