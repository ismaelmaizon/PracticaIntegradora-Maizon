const socket = io();


const title= document.getElementById('title')
const description= document.getElementById('description')
const price= document.getElementById('price')
const stock= document.getElementById('stock')

/*
Swal.fire({
    title: 'producto',
    input: 'text',
    inputValidator: (value) => {
        return !value && 'necesitas escribir tu nombre'
    },
    allowOutsideClick: false
}).then((result) => { 
    user = result.value;
    socket.emit('authenticatedUser', user)
})
*/
/*
socket.on('productos', async (data) =>{
    console.log(data);

    data.forEach((pr)=> {
        title.innerHTML = 'Titulo: '+ pr.title
        description.innerHTML = 'Descripcion: '+ pr.description
        price.innerHTML = 'Precio: $'+ pr.price
        stock.innerHTML = 'Stock: '+ pr.stock
    })


})*/

socket.on('productos', async (data) => {
    console.log(data);

    // Limpiar el contenido existente antes de renderizar nuevos productos
    title.innerHTML = '';

    data.forEach((pr) => {
        // Crear un div para cada producto
        const productDiv = document.createElement('div');

        // Crear elementos para cada propiedad del producto
        const titleElement = document.createElement('div');
        titleElement.innerHTML = 'Titulo: ' + pr.title;

        const descriptionElement = document.createElement('div');
        descriptionElement.innerHTML = 'Descripcion: ' + pr.description;

        const priceElement = document.createElement('div');
        priceElement.innerHTML = 'Precio: $' + pr.price;

        const stockElement = document.createElement('div');
        stockElement.innerHTML = 'Stock: ' + pr.stock;

        // Agregar los elementos al div del producto
        productDiv.appendChild(titleElement);
        productDiv.appendChild(descriptionElement);
        productDiv.appendChild(priceElement);
        productDiv.appendChild(stockElement);

        // Agregar el div del producto al contenedor principal
        title.appendChild(productDiv);
    });
});

