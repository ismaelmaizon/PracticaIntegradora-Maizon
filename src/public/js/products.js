

// Realiza una solicitud GET a la API para obtener la lista de productos
fetch('http://localhost:8080/api/products')
  .then(response => response.json())
  .then(data => {
    // Obtén la lista de productos desde la respuesta de la API
    const productos = data.product.docs;
    console.log('products.js');
    console.log(productos);
    // Compila la plantilla Handlebars
    const source = document.getElementById('producto-template').innerHTML;
    const template = Handlebars.compile(source)

    // Itera a través de los productos y genera el HTML
    const productosHTML = productos.map(producto => template(producto)).join('');

    // Agrega el HTML generado al DOM
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = productosHTML;
})
.catch( error => console.error('Error al obtener datos de la API:', error));

/*
<h1 style="color: red" >hola {{user.name}} </h1>
    <div>
        <h1>Tu perfil (sin datos sensibles)</h1>
        <p>{{user.name}}</p>
        <p>{{user.email}}</p>
        <p>{{user.age}}</p>
        <p>{{user.role}}</p>
        <a href="/api/sessions/current"><button>Info del usuario</button></a>
        <a href="/api/sessions/logout"><button>Salir</button></a>   
    </div>


*/ 