let productosEnCarrito = [];

if (localStorage.getItem("carrito")) {
  productosEnCarrito = JSON.parse(localStorage.getItem("carrito"));
} else {
  localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
}

function buscarInfo(buscado, array) {
  let busqueda = array.filter(
    (item) =>
      item.type.toLowerCase().includes(buscado.toLowerCase()) ||
      item.itemname.toLowerCase().includes(buscado.toLowerCase())
  );

  if (busqueda.length == 0) {
    coincidencia.innerHTML = "";
    let nuevoDiv = document.createElement("div");
    nuevoDiv.innerHTML = `<p> No hay coincidencias</p>`;
    coincidencia.appendChild(nuevoDiv);
    mostrarCatalogo(array);
  } else {
    coincidencia.innerHTML = "";
    mostrarCatalogo(busqueda);
  }
}

function ordenarMayorMenor(array) {
  let mayorMenor = [].concat(array);
  mayorMenor.sort((a, b) => b.price - a.price);
  mostrarCatalogo(mayorMenor);
}

function ordenarMenorMayor(array) {
  let menorMayor = [].concat(array);
  menorMayor.sort((a, b) => a.price - b.price);
  mostrarCatalogo(menorMayor);
}

function ordenarAlfabeticamente(array) {
  let alfabeticamente = [].concat(array);
  alfabeticamente.sort((a, b) => {
    return 0;
  });
  mostrarCatalogo(alfabeticamente);
}

let divProductos = document.getElementById("productos");
let btnGuardarLibro = document.getElementById("guardarLibroBtn");
let buscador = document.getElementById("buscador");
let btnVerCatalogo = document.getElementById("verCatalogo");
let btnOcultarCatalogo = document.getElementById("ocultarCatalogo");
let modalBody = document.getElementById("modal-body");
let botonCarrito = document.getElementById("botonCarrito");
let coincidencia = document.getElementById("coincidencia");
let selectOrden = document.getElementById("selectOrden");

function mostrarCatalogo(array) {
  divProductos.innerHTML = "";

  for (const item of array) {
    let nuevoLibro = document.createElement("div");
    nuevoLibro.classList.add("col-12", "col-md-6", "col-lg-4", "my-4");
    nuevoLibro.innerHTML = `<div id="${item.id}" class="card" style="width: 18rem;">
        <img class="card-img-top img-fluid" style="height: 200px;"src="img/${item.image}" alt="${item.itemname} de ${item.type}">
        <div class="card-body">
            <h4 class="card-title">${item.itemname}</h4>
            <p>Type: ${item.type}</p>
            <p class="">Price: ${item.price}</p>
        <button id="agregarBtn${item.id}" class="btn btn-outline-success">Agregar al carrito</button>
        </div>
</div>`;
    divProductos.appendChild(nuevoLibro);
    let btnAgregar = document.getElementById(`agregarBtn${item.id}`);

    btnAgregar.addEventListener("click", () => {
      agregarAlCarrito(item);
    });
  }
}

function agregarAlCarrito(item) {
  productosEnCarrito.push(item);
  localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
}

function cargarProductosCarrito(array) {
  modalBody.innerHTML = "";

  array.forEach((productoCarrito) => {
    modalBody.innerHTML += `<div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
      <img class="card-img-top" height="300px" src="img/${productoCarrito.image}" alt="${productoCarrito.itemname}">
      <div class="card-body">
              <h4 class="card-title">${productoCarrito.itemname}</h4>
          
              <p class="card-text">$${productoCarrito.price}</p> 
              <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
      </div>    
  </div>
`;
  });

  array.forEach((productoCarrito, indice) => {
    document
      .getElementById(`botonEliminar${productoCarrito.id}`)
      .addEventListener("click", () => {
        let cardProducto = document.getElementById(
          `productoCarrito${productoCarrito.id}`
        );
        cardProducto.remove();
        productosEnCarrito.splice(indice, 1);
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
      });
  });
}

function cargarLibro(array) {
  let inputType = document.getElementById("inputType");
  let inputName = document.getElementById("inputName");
  let inputPrice = document.getElementById("inputPrice");

  let itemCreado = new Item(
    array.length + 1,
    inputType.value,
    inputName.value,
    parseInt(inputPrice.value),
    "latalelogo2.png"
  );
  array.push(itemCreado);
  localStorage.setItem("itemshelf", JSON.stringify(array));
  mostrarCatalogo(array);
  inputType.value = "";
  inputName.value = "";
  inputPrice.value = "";
}

btnGuardarLibro.addEventListener("click", () => {
  cargarLibro(itemshelf);
});

buscador.addEventListener("input", () => {
  buscarInfo(buscador.value, itemshelf);
});

botonCarrito.addEventListener("click", () => {
  cargarProductosCarrito(productosEnCarrito);
});

selectOrden.addEventListener("change", () => {
  if (selectOrden.value == 1) {
    ordenarMayorMenor(itemshelf);
  } else if (selectOrden.value == 2) {
    ordenarMenorMayor(itemshelf);
  } else if (selectOrden.value == 3) {
    ordenarAlfabeticamente(itemshelf);
  } else {
    mostrarCatalogo(itemshelf);
  }
});

mostrarCatalogo(itemshelf);
