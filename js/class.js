class Item {
    constructor(id, type, itemname, price, image) {
        this.id = id,
        this.type = type,
        this.itemname = itemname,
        this.price = price,
        this.image = image
    }
    mostrarData() {
        console.log(`El itemname es ${this.itemname}, el type es ${this.type} y su price es ${this.price}`)
    }
}

const item1 = new Item (1, "Consumable", "Exp Potion", 100, "ltitem001.jpg")
const item2 = new Item (2, "Coupon", "Kitty Premium Package", 150, "LTitem002.jpg")
const item3 = new Item (3, "Event", "Gambler's Package X", 150, "LTitem003.jpg")
const item4 = new Item (4, "Event", "Gambler's Package XI", 200, "LTitem004.jpg")
const item5 = new Item (5, "Event", "Gambler's Package XII", 250, "LTitem005.jpg")
const item6 = new Item (6, "Consumable", "Gardener Pack", 100, "LTitem006.jpg")

let itemshelf = []

if (localStorage.getItem("itemshelf")) {
    itemshelf = JSON.parse(localStorage.getItem("itemshelf"))
}else{
    itemshelf.push(item1, item2, item3, item4, item5, item6)
    localStorage.setItem("itemshelf", JSON.stringify(itemshelf))
}