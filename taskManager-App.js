class Task {
  constructor(nombre, categoria) {
    this.nombre = nombre;
    this.categoria = categoria;
    this.completada = false;
    this.id = crypto.randomUUID(); //libreria de js para generar ids ramdon
    this.urgente = false;
  }

  generarFicha() {
    const esUrgente = this.categoria === "urgente" || this.urgente;

    if (this.categoria === "trabajo") {
      return `${this.nombre} 💼`;
    } else if (this.categoria === "estudio") {
      return `${this.nombre} 📚`;
    } else if (this.categoria === "personal") {
      return `${this.nombre} 🏠`;
    } else if (esUrgente) {
      return `${this.nombre} 🔴`;
    } else {
      return `${this.nombre} ${this.categoria} 🏷️`;
    }
  }
}
let totalTask = document.getElementById("total-task");
let toDoTask = document.getElementById("to-do-task");
let inputTarea = document.getElementById("tarea-input");
let listaTarea = document.getElementById("lista-tarea");
let inputCategoria = document.getElementById("categoria");
let otraCategoriaInput = document.getElementById("otra-categoria-input");
let inputError = document.getElementById("input-vacio");
let botonAgregar = document.getElementById("agregarTarea");
let botonEliminarCompletadas = document.getElementById("eliminarCompletadas");

let tareas = [];
let contador = 0;
const MOSTRARERROR = "mostrarError";

botonAgregar.addEventListener("click", () => {
  agregarTarea();

});

inputCategoria.addEventListener("change", () => {
  if (inputCategoria.value === "otra") {
    otraCategoriaInput.classList.add("visible");
  } else {
    otraCategoriaInput.classList.remove("visible");
  }
});

function agregarTarea() {
  let nombreTarea = inputTarea.value.trim();
  let categoriaSeleccionada = inputCategoria.value;
  let categoriaFinal = "";

  if (categoriaSeleccionada === "otra") {
    if (!otraCategoriaInput.value.trim()) {
      visualizarError();
      inputError.textContent = "Escribe una categoría personalizada";
      return;
    }
    categoriaFinal = otraCategoriaInput.value.trim();
  } else {
    categoriaFinal = categoriaSeleccionada;
  }

  // Validación general
  if (nombreTarea && categoriaFinal) {
    const nuevaTarea = new Task(nombreTarea, categoriaFinal);
    ocultarError();
    tareas.push(nuevaTarea);
    mostrarTareas();
    contadorTareas();
    limpiarInput();
  } else {
    visualizarError();
  }
}
//?actualizar funcion,  calcular total,calcular completadas, actualizar ambos spans
function contadorTareas() {
  totalTask.textContent = tareas.length;
  const tareascompletadas = tareas.filter((tarea) => tarea.completada).length;
  toDoTask.textContent = tareascompletadas;

  if (tareascompletadas > 0) {
    botonEliminarCompletadas.classList.add("visible");
  } else {
    botonEliminarCompletadas.classList.remove("visible");
  }
}



function mostrarTareas() {
  listaTarea.innerHTML = "";

  if (tareas.length > 0) {
    listaTarea.classList.add("agregarTarea");
  } else {
    listaTarea.classList.remove("agregarTarea");
  }

  for (const tarea of tareas) {
    const tareaElement = document.createElement("div");

    const tarjetaTarea = `
  <div class="tarjeta-tarea ${tarea.urgente ? "tarea-urgente" : ""}">
    <div class="nombre-tarea ${tarea.completada ? "tarea-completada" : ""}">
      <p>${tarea.generarFicha()}</p>
    </div>
          <button onClick="marcarTareaHecha('${tarea.id}')">✅Hecha</button>
          <button onClick="marcarTareaUrgente('${tarea.id}')">🔴Urgente</button>
          <button onClick="eliminarTarea('${tarea.id}')">🗑️Eliminar</button>
      </div>`;
    tareaElement.innerHTML = tarjetaTarea;
    listaTarea.appendChild(tareaElement)
  }
}

function visualizarError() {
  inputError.classList.add(MOSTRARERROR)
  inputError.textContent = "¡Ingrese el nombre de la tarea y la categoria!";
}

function ocultarError() {
  inputError.classList.remove(MOSTRARERROR)
}

function limpiarInput() {
  inputTarea.value = "";
  inputCategoria.value = "";
  otraCategoriaInput.value = ""
  otraCategoriaInput.classList.remove("visible")
}

function marcarTareaHecha(idTarea) {
  //buscamos la tarea con find y se la asignamos a una const
  const tareaHecha = tareas.find((tarea) => tarea.id === idTarea);
  //si existe y esta incompleta cambia su estado a true
  if (tareaHecha && !tareaHecha.completada) {
    tareaHecha.completada = true;

    console.log(
      "la tarea con id " +
      tareaHecha.id +
      "esta en estado " +
      tareaHecha.completada,
    );
  }
  //aplicamos filter para conocer las tareas completadas y conocer el tamaño de los elemtnos que si cumplen la condicion
  contadorTareas();
  //renderizamos el html
  mostrarTareas();
}

function marcarTareaUrgente(idTarea) {
  const tareaUrgente = tareas.find((tarea) => idTarea === tarea.id);
  if (!tareaUrgente) {
    return;
  }

  tareaUrgente.urgente = true;
  console.log("la tarea con id " + tareaUrgente.id + "es urgente");
  mostrarTareas();
  return tareaUrgente;
}

function eliminarTarea(idTarea) {
  //confirmar respuesta de si desea eliminar la tarea
  const respuesta = confirm("¿Desea eliminar la tarea?");

  if (!respuesta) {
    return;
  }
  //se realiza filter con las tareas que no se quieren eliminar
  tareas = tareas.filter((tarea) => tarea.id !== idTarea);
  //se asigna al contador el tmañao de las tareas completadas actuales
  contadorTareas();

  mostrarTareas();
}
//? “Limpiar completadas” (con confirm y contador de cuantas se van a eliminar)
function limpiarCompletadas() {
  const tareascompletadas = tareas.filter((tarea) => tarea.completada).length;
  let estado = confirm(
    `Hay ${tareascompletadas} completadas, ¿desea eliminarlas?`,
  );
  if (!estado) {
    return;
  }
  tareas = tareas.filter((tarea) => !tarea.completada);
  contadorTareas();
  mostrarTareas();
}

/*
se debe crear los acciones para marcar la tarea con estadoscompletada o urgente, adicionalmente
la accion de eliminar💼📚🏠🔴🏷️❌
*/
