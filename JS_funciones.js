/* ------------------------------------------------------------------------------------------------- */
// FUNCIÓN PARA EL SUBMENU

    document.addEventListener("DOMContentLoaded", () => {
        const menuItem = document.querySelector(".menu-item");
        const subMenu = document.querySelector(".submenu");
    
        menuItem.addEventListener("click", (event) => {
            event.stopPropagation(); // Evita que se cierre inmediatamente
            menuItem.classList.toggle("active");
        });
    
        // Ocultar menú al tocar fuera
        document.addEventListener("click", (event) => {
            if (!menuItem.contains(event.target)) {
                menuItem.classList.remove("active");
            }
        });
    });

/* ------------------------------------------------------------------------------------------------- */
// FUNCIÓN PARA CAMBIAR COLOR / GRIS EN TELEFONO MOVIL
  
    document.querySelectorAll('.gif').forEach(img => {
        // Para pantallas táctiles
        img.addEventListener('touchstart', function() {
          this.classList.add('color'); // Activa el color al tocar
        });
      
        img.addEventListener('touchend', function() {
          this.classList.remove('color'); // Vuelve a escala de grises al soltar
        });
      
        img.addEventListener('touchcancel', function() {
          this.classList.remove('color'); // Evita que se quede "pegado" el color
        });
      
        // Para PC (Opcional)
        img.addEventListener('mouseenter', function() {
          this.classList.add('color');
        });
      
        img.addEventListener('mouseleave', function() {
          this.classList.remove('color');
        });
      });
      
/* ------------------------------------------------------------------------------------------------- */
// FUNCIÓN PARA TABLA EN PANTALLA COMPLETA
      
      document.addEventListener("DOMContentLoaded", () => {
        const btnPantallaCompleta = document.getElementById("btnPantallaCompleta");
        const tablaContainer = document.querySelector(".container");

        btnPantallaCompleta.addEventListener("click", () => {
            if (!document.fullscreenElement) {
                tablaContainer.classList.add("fullscreen");

                // Agregar botón de salir de pantalla completa
                const btnCerrar = document.createElement("button");
                btnCerrar.id = "btnCerrarPantalla";
                btnCerrar.innerText = "Salir de Pantalla Completa";
                tablaContainer.prepend(btnCerrar);

                btnCerrar.addEventListener("click", () => {
                    tablaContainer.classList.remove("fullscreen");
                    btnCerrar.remove();
                });
            }
        });
    });



/* ------------------------------------------------------------------------------------------------- */
// FUNCIÓN PARA OCULTAR / MOSTRAR EJERCICIOS SELECCIONADOS

// Función para guardar la selección en localStorage y actualizar la visibilidad
function actualizarSeleccion() {
    const checkboxes = document.querySelectorAll('.eleccion input[type="checkbox"]');
    let seleccionados = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            seleccionados.push(checkbox.value);
        }
    });

    localStorage.setItem('ejerciciosSeleccionados', JSON.stringify(seleccionados));
    actualizarVisibilidad(); // Refrescar la visibilidad en tiempo real
}

// Función para mostrar/ocultar ejercicios según la selección guardada
function actualizarVisibilidad() {
    const seleccionados = JSON.parse(localStorage.getItem('ejerciciosSeleccionados')) || [];
    
    document.querySelectorAll('.ejercicio').forEach(ejercicio => {
        if (seleccionados.includes(ejercicio.id)) {
            ejercicio.style.display = 'block';
        } else {
            ejercicio.style.display = 'none';
        }
    });

    // Restaurar checkboxes al cargar la página
    document.querySelectorAll('.eleccion input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = seleccionados.includes(checkbox.value);
    });
}

// Agregar evento "change" a cada checkbox para que la selección se actualice automáticamente
document.addEventListener("DOMContentLoaded", () => {
    actualizarVisibilidad();
    document.querySelectorAll('.eleccion input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener("change", actualizarSeleccion);
    });
});
