/* Aquí se crea una instancia de Swiper y se le pasa un selector CSS (en este caso, ".mySwiper") que identifica el contenedor HTML donde se desea crear el carrusel. Todas las opciones de configuración se pasan como un objeto dentro de la instancia de Swiper. */
const swiper = new Swiper('.mySwiper', {
    grabCursor: true, /*Este parámetro permite cambiar el cursor del mouse a "agarre" cuando se coloca sobre el carrusel, lo que da una indicación visual de que el carrusel se puede arrastrar con el mouse.*/
    slidesPerView: 1, /*Esto configura la cantidad de diapositivas (o elementos) que se mostrarán en la vista a la vez. En este caso, se muestra una diapositiva a la vez.*/
    spaceBetween: 70,/*Establece el espacio entre las diapositivas en píxeles. En este caso, hay 70 píxeles de espacio entre las diapositivas.*/

    /*Esto configura la paginación del carrusel, que es una serie de puntos o miniaturas que indican en qué diapositiva te encuentras y permiten la navegación. En este caso, la paginación se configura con los siguientes parámetros:*/
    pagination: {
        el: ".custom-pagination",/*Indica que la paginación se mostrará en un elemento HTML con la clase CSS "custom-pagination".*/
        clickable: true,/*Permite hacer clic en los puntos de paginación para navegar a una diapositiva específica.*/
    },
    /*Esta parte de la configuración permite definir diferentes cantidades de diapositivas por vista en función del ancho de la ventana del navegador. Esto hace que el carrusel sea sensible al tamaño de la pantalla. En este caso, se han definido dos puntos de ruptura:*/

    breakpoints: {
        567: {
            slidesPerView: 2,/*Cuando el ancho de la ventana es igual o superior a 567 píxeles, se mostrarán 2 diapositivas por vista.*/
        },
        996: {
            slidesPerView: 3,/*Cuando el ancho de la ventana es igual o superior a 996 píxeles, se mostrarán 3 diapositivas por vista.*/
        },
    },
});


/*getProducts es una función asíncrona que obtiene los datos de productos desde un archivo JSON. La función está marcada como async porque utiliza el operador await para esperar respuestas asincrónicas, como la respuesta de la función fetch. Cuando se llama a esta función, intenta cargar los datos desde un archivo "products.json" y, si tiene éxito, los devuelve en forma de arreglo de productos.*/
const getProducts = async () => {
    try {
        const results = await fetch("../data/products.json");
        const data = await results.json();
        const products = data.products;
        return products;
        } catch (error) {
            console.log(error);
    }
};

/*productsWrapper es una variable que almacena una referencia al elemento HTML con el id "products". Este elemento probablemente se utiliza para mostrar los productos en la página.*/
const productsWrapper = document.getElementById("products");


/*window.addEventListener("DOMContentLoaded", async function () { ... }) agrega un oyente de eventos para esperar a que se cargue completamente el contenido de la página antes de ejecutar el código dentro de la función. Cuando se dispara el evento "DOMContentLoaded", se ejecuta la función asíncrona anónima que contiene el código principal del programa.*/
window.addEventListener("DOMContentLoaded", async function () {

    let products = await getProducts();
        /* Dentro de la función del evento "DOMContentLoaded", primero se llama a getProducts para obtener la lista de productos. Los productos se almacenan en la variable products.*/
    products = products.filter((product) => product.category === "Dresses");
    /*Luego, se utiliza Array.prototype.filter para filtrar los productos. En este caso, se filtran los productos que tienen una propiedad category igual a "Dresses". Como resultado, products ahora contiene solo los productos que pertenecen a la categoría "Dresses".*/
    displayProductItems(products); 
    loadData();
});

const displayProductItems = (items) => {
    let displayProduct = items.map(
        (product) => `
        <div class="swiper-slide">
            <div class="product">
                <div class="top d-flex">
                    <img src=${product.url} alt="" />
                        <div class="icon d-flex">
                    <i class="bx bxs-heart"></i>
                    </div>
            </div>
            <div class="bottom">
                <h4>${product.title}</h4>
                <div class="d-flex">
                    <div class="price">$${product.price}</div>
                <div class="rating">
                    <i class="bx bxs-star"></i>
                    <i class="bx bxs-star"></i>
                    <i class="bx bxs-star"></i>
                    <i class="bx bxs-star"></i>
                    <i class="bx bxs-star"></i>
                </div>
                </div>
            </div>
        </div>
        </div >
        `
    );

    displayProduct = displayProduct.join("");
    productsWrapper.innerHTML = displayProduct;
}

const filters = [...document.querySelectorAll('.filters div')];
/*Esto selecciona todos los elementos <div> que son descendientes de un elemento con la clase CSS "filters" en la página web.*/
/*Luego, crea una matriz (filters) que contiene estos elementos <div> como elementos individuales. La expresión 
[...document.querySelectorAll('.filters div')] se utiliza para convertir la colección NodeList resultante de document.querySelectorAll en una matriz para facilitar su manipulación.*/
filters.forEach((filter) => 
/*Esto itera sobre todos los elementos <div> en la matriz filters utilizando un bucle forEach.*/
{
    filters[2].classList.add('active');
/*Agrega la clase CSS "active" al tercer elemento (índice 2) en la matriz filters. Esto es un ajuste predeterminado para activar el filtro "Dresses" cuando la página se carga.*/

    filter.addEventListener('click', async (e) => 
    /*Agrega un evento "click" a cada elemento <div> en la matriz filters. Esto significa que cuando se hace clic en uno de estos elementos, se ejecutará el código dentro de la función de manejo de eventos.*/
    {
    const id = e.target.getAttribute('data-filter'); /*Esto obtiene el valor del atributo data-filter del elemento en el que se hizo clic. Se supone que estos atributos contienen el tipo de filtro que se desea aplicar, como "Jewellery", "Accessories", "Dresses", etc.*/
    const target = e.target;/* Almacena una referencia al elemento en el que se hizo clic en la variable target.*/
    const products = await getProducts(); /*Carga los productos (probablemente utilizando la función getProducts) y los almacena en la variable products.*/
    filters.forEach((btn) => {
        btn.classList.remove('active');
    });/*Elimina la clase "active" de todos los elementos en la matriz filters, lo que desactiva cualquier filtro activo anterior.*/
    target.classList.add('active');/*Agrega la clase "active" al elemento en el que se hizo clic, marcándolo como el filtro activo actual.*/

    /*Filtra los productos en la variable products según la categoría seleccionada (id) y almacena los productos filtrados en menuCategory.*/
    let menuCategory = products.filter((product) => {
        if (product.category === id) {
        return product;
        }
    });

    displayProductItems(menuCategory); /*Llama a la función displayProductItems para mostrar los productos de la categoría seleccionada en la página.*/
    swiper.update();/*Actualiza la instancia de Swiper (swiper) para reflejar los cambios en el carrusel después de aplicar el filtro.*/
    });
});


/* -----------------PRODUCTOS------------------------ */

const categoriesProducts = document.querySelector('.categories .products');
const loadMore = document.querySelector('.loadmore');

let currentIndex = 0;

async function loadData() {
    let maxResult = 8;
    let products = await getProducts();

    if(currentIndex >= products.length) {
        loadMore.disable = true;
        loadMore.innerText = "No hay mas productos";
        return;
    }

    for (var i = 0; i < maxResult; i++) {
        const product = products[i + currentIndex];
        categoriesProducts.insertAdjacentHTML(
            'beforeend',
            `
            <div class="product">
            <div class="top d-flex">
                <img 
                src=${product.url} 
                alt="product" 
                loading="lazy"
                />
                <div class="icon d-flex">
                    <i class="bx bxs-heart"></i>
                </div>
            </div>
            <div class="bottom">
                <div class="d-flex">
                    <h4>${product.title}</h4>
                    <a href="" class="btn cart-btn">Add to Cart</a>
                </div>
                <div class="d-flex">
                    <div class="price">${product.price}</div>
                        <div class="rating">
                            <i class="bx bxs-star"></i>
                            <i class="bx bxs-star"></i>
                            <i class="bx bxs-star"></i>
                            <i class="bx bxs-star"></i>
                            <i class="bx bxs-star"></i>
                        </div>
                </div>
            </div>
        </div>
            `
        );
    }

    currentIndex += maxResult;
}

loadMore.addEventListener('click', loadData);

/* --------EXPLICACION DEL CODIGO-----------

Este código es JavaScript y HTML combinados para crear una funcionalidad que carga productos en una página web cuando se hace clic en el botón "Load More". A continuación, te explico el código paso a paso:

const categoriesProducts = document.querySelector('.categories .products'); y const loadMore = document.querySelector('.loadmore');: Estas líneas de código obtienen referencias a elementos HTML en el documento. categoriesProducts obtiene un elemento con la clase "categories" que contiene un elemento con la clase "products". loadMore obtiene un elemento con la clase "loadmore".

let currentIndex = 0;: Esta variable se utiliza para realizar un seguimiento del índice actual de productos que se han cargado en la página.

async function loadData() { ... }: Esto define una función llamada loadData que se ejecutará cuando se haga clic en el botón "Load More". La función es asíncrona (async) porque realiza una operación asincrónica para obtener datos de productos.

let maxResult = 8;: Esta variable define el número máximo de productos a cargar cada vez que se hace clic en el botón "Load More".

let products = await getProducts();: Se utiliza await para esperar a que la función getProducts() devuelva los datos de los productos. La función getProducts() probablemente realiza una solicitud asincrónica (por ejemplo, una solicitud a un servidor) para obtener los datos.

if (currentIndex >= products.length) { ... }: Esta condición verifica si ya se han cargado todos los productos disponibles. Si es así, desactiva el botón "Load More" y muestra un mensaje indicando que no hay más productos disponibles.

El bucle for se utiliza para generar elementos HTML para los productos. Recorre los datos de productos y utiliza insertAdjacentHTML para agregar el HTML al elemento categoriesProducts.

El HTML dentro de insertAdjacentHTML crea una estructura de producto con información, como imagen, título, precio y calificación, que se obtiene de los datos de productos.

currentIndex += maxResult; se utiliza para actualizar el índice actual después de cargar los productos.

loadMore.addEventListener('click', loadData); agrega un oyente de eventos al botón "Load More" para que cuando se haga clic en él, se ejecute la función loadData, que carga más productos en la página.

En resumen, este código permite cargar más productos en una página web a medida que se hace clic en el botón "Load More", utilizando datos de productos obtenidos asincrónicamente a través de la función getProducts().



 */

