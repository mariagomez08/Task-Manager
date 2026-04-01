/*
se debe crear un objeto que represente una tarea, con las siguientes propiedades:
- id: un identificador único para cada tarea
- nombre: el nombre de la tarea
- categoria: la categoría a la que pertenece la tarea
- completada: un booleano que indique si la tarea ha sido completada o no
- urgente: un booleano que indique si la tarea es urgente o no
*/

class Task {
  constructor(nombre, categoria) {
    this.nombre = nombre;
    this.categoria = categoria;
    this.completada = false;
    this.id = crypto.randomUUID(); //libreria de js para generar ids ramdon
    this.urgente = false;
  }

  generarFicha() {
    if (this.categoria === "trabajo") {
      return `${this.nombre} 💼`;
    } else if (this.categoria === "estudio") {
      return `${this.nombre} 📚`;
    } else if (this.categoria === "personal") {
      return `${this.nombre} 🏠`;
    } else if (this.categoria === "urgente") {
      this.urgente = true;
      return `${this.nombre} 🔴`;
    }
  }
}
let totalTask = document.getElementById("total-task");
let toDoTask = document.getElementById("to-do-task");
let inputTarea = document.getElementById("tarea-input");
let listaTarea = document.getElementById("lista-tarea");
let categoria = document.getElementById("categoria");
let inputError = document.getElementById("input-vacio");
let botonAgregar = document.getElementById("agregarTarea");
let tareas = [];
let contador = 0;
const MOSTRARERROR = "mostrarError";

botonAgregar.addEventListener("click", () => {
  agregarTarea();
});
function agregarTarea() {
  let nombreTarea = inputTarea.value;
  let categoriaTarea = categoria.value;

  if (nombreTarea.trim() && categoriaTarea.trim()) {
    const nuevaTarea = new Task(nombreTarea, categoriaTarea);
    ocultarError();
    tareas.push(nuevaTarea);
    mostrarTareas();
    contadorTareas();

    console.log("Tarea agregada:", nombreTarea);
    alert(
      "✅ " + nombreTarea + " Tarea agregada con categoria " + categoriaTarea,
    );
    limpiarInput();
  } else {
    visualizarError();
  }
}

function contadorTareas() {
  let totaltareas = 0;
  totaltareas = tareas.length;
  totalTask.textContent = totaltareas;
}

function mostrarTareas() {
  listaTarea.innerHTML = "";
  for (const tarea of tareas) {
    const tareaElement = document.createElement("div");

    const tarjetaTarea = `
      <div class="tarjeta-tarea">
          <div class="nombre-tarea">
              <p>${tarea.generarFicha()}</p>
          </div>
          <button onClick="marcarTareaHecha('${tarea.id}')">✅Hecha</button>
          <button onClick="marcarTareaUrgente('${tarea.id}')">🔴Urgente</button>
          <button onClick="eliminarTarea('${tarea.id}')">🗑️Eliminar</button>
      </div>`;
    tareaElement.innerHTML = tarjetaTarea;
    listaTarea.appendChild(tareaElement);
  }
}

function visualizarError() {
  inputError.classList.add(MOSTRARERROR);
  inputError.textContent = "¡Ingrese el nombre de la tarea y la categoria!";
}

function ocultarError() {
  inputError.classList.remove(MOSTRARERROR);
}

function limpiarInput() {
  inputTarea.value = "";
  categoria.value = "";
}
//
function marcarTareaHecha(idTarea) {
  tareas.map((tarea) => {
    if (idTarea === tarea.id && !tarea.completada) {
      contador++;
      toDoTask.textContent = contador;
      tarea.completada = true;

      console.log(
        "la tarea con id " + tarea.id + "esta en estado " + tarea.completada,
      );
    }
    return tarea;
  });
}

function marcarTareaUrgente(idTarea) {
  tareas.map((tarea) => {
    if (idTarea === tarea.id) {
      tarea.urgente = true;
      console.log("la tarea con id " + tarea.id + "es urgente");
    }
    return tarea;
  });
}

function eliminarTarea(idTarea) {
  const respuesta = confirm("¿Desea eliminar la tarea?");

  if (!respuesta) {
    return;
  }
  tareas = tareas.filter((tarea) => {
    if (idTarea === tarea.id && tarea.completada) {
      contador--;
      toDoTask.textContent = contador;
    }
    return idTarea !== tarea.id;
  });
  contadorTareas();
  mostrarTareas();
}

/*
se debe crear los acciones para marcar la tarea con estadoscompletada o urgente, adicionalmente
la accion de eliminar💼📚🏠🔴🏷️❌
*/
