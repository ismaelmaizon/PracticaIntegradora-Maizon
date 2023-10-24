

// Realiza una solicitud GET a la API para obtener la lista de productos
fetch('http://localhost:8080/api/products')
  .then(response => response.json())
  .then(data => {
    // Obtén la lista de productos desde la respuesta de la API
    const productos = data;
    console.log('products.js');
    console.log(productos.statusCode);
    // Compila la plantilla Handlebars
    const source = document.getElementById('lista-productos').innerHTML;
    const template = Handlebars.compile(source)

    // Itera a través de los productos y genera el HTML
    const productosHTML = productos.map(producto => template(producto)).join('');

    // Agrega el HTML generado al DOM
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = productosHTML;
})
.catch( error => console.error('Error al obtener datos de la API:', error));
