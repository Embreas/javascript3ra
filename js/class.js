class Libro {
    constructor(id, autor, titulo, precio, imagen) {
        this.id = id,
        this.autor = autor,
        this.titulo = titulo,
        this.precio = precio,
        this.imagen = imagen
    }
    mostrarData() {
        console.log(`El titulo es ${this.titulo}, el autor es ${this.autor} y su precio es ${this.precio}`)
    }
}

const libro1 = new Libro (1, "Jorge Luis Borges", "Aleph", 900, "ltitem001.jpg")
const libro2 = new Libro (2, "Gabriel Garcia Marquez", "Cien años de soledad", 4500, "LTitem002.jpg")
const libro3 = new Libro (3, "Isabel Allende", "Paula", 2800, "LTitem003.jpg")
const libro4 = new Libro (4, "Jorge Luis Borges", "Ficciones", 1400, "LTitem004.jpg")
const libro5 = new Libro (5, "Mario Benedetti", "Andamios", 2200, "LTitem005.jpg")
const libro6 = new Libro (6, "Mario Vargas Llosa", "La ciudad y los perros", 2000, "LTitem006.jpg")

let itemshelf = []

if (localStorage.getItem("itemshelf")) {
    itemshelf = JSON.parse(localStorage.getItem("itemshelf"))
}else{
    itemshelf.push(libro1, libro2, libro3, libro4, libro5, libro6)
    localStorage.setItem("itemshelf", JSON.stringify(itemshelf))
}