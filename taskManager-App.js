/*
se debe crear un objeto que represente una tarea, con las siguientes propiedades:
- id: un identificador único para cada tarea
- nombre: el nombre de la tarea
- categoria: la categoría a la que pertenece la tarea
- completada: un booleano que indique si la tarea ha sido completada o no
- urgente: un booleano que indique si la tarea es urgente o no

Un botón "Limpiar completadas" que elimine de
una vez todas las tareas marcadas como hechas,
con un confirm() previo que indique cuántas se
van a eliminar. filter, negacion completadas. hacer otro contador

Una opción "Otra..." en el select que al elegirla
revele un campo de texto donde el usuario
escribe su propia categoría
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
      this.urgente = true;//si se selecciona la categoria urgente actualiza el estado urgente a true
      return `${this.nombre} 🔴`;
    }
  }
}
let totalTask = document.getElementById("total-task");
let toDoTask = document.getElementById("to-do-task");
let inputTarea = document.getElementById("tarea-input");
let listaTarea = document.getElementById("lista-tarea");
let inputCategoria = document.getElementById("categoria");
let otraCategoria = document.getElementById("otra-categoria");
let inputError = document.getElementById("input-vacio");
let botonAgregar = document.getElementById("agregarTarea");
let tareas = [];
let categorias = ["trabajo", "estudio", "personal","urgente"]
let contador = 0;
const MOSTRARERROR = "mostrarError";

botonAgregar.addEventListener("click", () => {
  agregarTarea();
});

/*
La categoria otra podria tener un onclick que accione una funcion que lea ese input,
puede ser con agregar tarea 
*/
/* si selecciona otra categoria tiene que desplegar un input para añadirla
ese input debe pasarle a la variable categoria la nueva categoria y agregarla
lo mejor entonces seria tener las categorias en una arreglo, las ya predefinidas y
con push agregar la nueva
habria que actualizar la categoria de la tarjeta enseguida apenas se ingresa, sin una tarea 
no se puede agregar otra categoria


*/
function agregarTarea() {
  let nombreTarea = inputTarea.value;
  let categoriaTarea = inputCategoria.value;

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


function marcarTareaHecha(idTarea) {

    //buscamos la tarea con find y se la asignamos a una const
    const tareaHecha = tareas.find(tarea => tarea.id === idTarea)
    //si existe y esta incompleta cambia su estado a true
    if(tareaHecha && !tareaHecha.completada){
      tareaHecha.completada = true

            console.log(
        "la tarea con id " + tareaHecha.id + "esta en estado " + tareaHecha.completada,
      );
    }
    //aplicamos filter para conocer las tareas completadas y conocer el tamaño de los elemtnos que si cumplen la condicion
    toDoTask.textContent = tareas.filter(tarea => tarea.completada === true).length
    //renderizamos el html
    mostrarTareas()
 
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
