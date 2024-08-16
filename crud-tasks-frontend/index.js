import { obtenerTareas, agregarTarea } from "./main.js";
import "@material/web/fab/fab.js";
import "@material/web/dialog/dialog.js";
import "@material/web/button/filled-button.js";
import "@material/web/field/filled-field.js";
import "@material/web/fab/branded-fab.js";
import "@material/web/switch/switch.js";
const boton = document.getElementById("boton");
const divLista = document.getElementById("listaTareas");

document.addEventListener("DOMContentLoaded", async (req, res) => {
  const tareas = await obtenerTareas();
  const lista = await tareas.json();
  lista.forEach((element) => {
    divLista.innerHTML += `
          <div class="mdc-card mdc-card__square">
          <h2 style="margin-bottom: 10px;margin-left:10px">${element.title}</h2>
          <p style="margin: 0px ; margin-left:20px">${element.description}</p>
      </div>
    `;
  });
});
boton.addEventListener("click", async () => {
  const titulo = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  document.getElementById("popup").outerHTML = `
  <md-dialog id="popup" open>
      <div slot="headline">Agregar Tarea</div>
      <form slot="content" id="form-id" method="dialog" style="display: flex; flex-direction: column">
        <label for="title">Titulo</label>
        <input type="text" name="titulo" id="title">
        <label for="descripcion">Descripcion:</label>
        <input type="text" id="description">
      </form>
      <div slot="actions">
        <md-filled-button form="form-id" id="form-id" value="">Ok</md-filled-button>
      </div>
    </md-dialog>
  `;
});

document
  .getElementById("form-id")
  .addEventListener("click", async (req, res) => {
    console.log("hiciste click man");
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const info = { title, description };
    const respuesta = await agregarTarea(info);
    console.log(respuesta);
  });
