// Función para cargar productos desde localStorage
function cargarProductos() {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    productosGuardados.forEach(producto => agregarProductoDOM(producto.nombre, producto.cantidad));
}

// Función para guardar productos en localStorage
function guardarProductos(productos) {
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Función para agregar productos al DOM y localStorage
function agregarProducto() {
    const producto = document.getElementById('producto').value;
    const cantidad = document.getElementById('cantidad').value;

    if (producto && cantidad) {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const nuevoProducto = { nombre: producto, cantidad: cantidad };
        productos.push(nuevoProducto);
        guardarProductos(productos);
        agregarProductoDOM(producto, cantidad);

        document.getElementById('producto').value = '';
        document.getElementById('cantidad').value = '';
    }
}

// Función para agregar productos al DOM
function agregarProductoDOM(nombre, cantidad) {
    const lista = document.getElementById('lista-de-compra');
    const item = document.createElement('li');
    
    const itemText = document.createElement('span');
    itemText.textContent = `${nombre} - ${cantidad}`;
    
    // Crear botón de eliminar
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.className = 'eliminar'; // Añadir la clase 'eliminar' al botón
    botonEliminar.onclick = function() {
        lista.removeChild(item);
        eliminarProducto(nombre, cantidad);
    };

    item.appendChild(itemText);
    item.appendChild(botonEliminar);
    lista.appendChild(item);
}

// Función para eliminar productos de localStorage
function eliminarProducto(nombre, cantidad) {
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    productos = productos.filter(producto => producto.nombre !== nombre || producto.cantidad !== cantidad);
    guardarProductos(productos);
}

// Función para cargar tareas desde localStorage
function cargarTareas() {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareasGuardadas.forEach(tarea => agregarTareaDOM(tarea.nombre, tarea.fecha, tarea.responsable, tarea.completada));
}

// Función para guardar tareas en localStorage
function guardarTareas(tareas) {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Función para agregar tareas al DOM y localStorage
function agregarTarea() {
    const tarea = document.getElementById('tarea').value;
    const fecha = document.getElementById('fecha').value;
    const responsable = document.getElementById('responsable').value;

    if (tarea && fecha && responsable) {
        const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        const nuevaTarea = { nombre: tarea, fecha: fecha, responsable: responsable, completada: false };
        tareas.push(nuevaTarea);
        guardarTareas(tareas);
        agregarTareaDOM(tarea, fecha, responsable, false);

        document.getElementById('tarea').value = '';
        document.getElementById('fecha').value = '';
        document.getElementById('responsable').selectedIndex = 0; // Reiniciar el desplegable
    }
}

// Función para agregar tareas al DOM
function agregarTareaDOM(nombre, fecha, responsable, completada) {
    const lista = document.getElementById('lista-de-tareas');
    const item = document.createElement('li');
    
    const itemText = document.createElement('span');
    itemText.textContent = `${nombre} - ${fecha} - Responsable: ${responsable}`;

    // Botón de completar tarea
    const botonCompletar = document.createElement('button');
    botonCompletar.textContent = 'Completar';
    botonCompletar.className = 'completar'; // Aseguramos que el botón tenga la clase 'completar'
    botonCompletar.onclick = function() {
        item.classList.toggle('completada');
        marcarTareaCompletada(nombre, fecha);
    };

    // Añadir la clase 'completado' si la tarea está completada
    if (completada) {
        item.classList.add('completada');
        botonCompletar.classList.add('completado');
    }

    // Botón de eliminar tarea
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.className = 'eliminar'; // Aseguramos que el botón tenga la clase 'eliminar'
    botonEliminar.onclick = function() {
        lista.removeChild(item);
        eliminarTarea(nombre, fecha);
    };

    item.appendChild(itemText);
    item.appendChild(botonCompletar);
    item.appendChild(botonEliminar);
    lista.appendChild(item);
}

// Función para marcar una tarea como completada en localStorage
function marcarTareaCompletada(nombre, fecha) {
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareas = tareas.map(tarea => {
        if (tarea.nombre === nombre && tarea.fecha === fecha) {
            tarea.completada = !tarea.completada;
        }
        return tarea;
    });
    guardarTareas(tareas);
}

// Función para eliminar tareas de localStorage
function eliminarTarea(nombre, fecha) {
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareas = tareas.filter(tarea => tarea.nombre !== nombre || tarea.fecha !== fecha);
    guardarTareas(tareas);
}

// Cargar productos y tareas al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarProductos();
    cargarTareas();
});
