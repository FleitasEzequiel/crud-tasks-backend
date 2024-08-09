import { Router } from "express";
const router = Router();
import {
  addTask,
  getTasks,
  getTask,
  changeTask,
  deleteTask,
} from "./controller.js";
//Validaciones
import { applyValidations } from "./aplicarValidaciones.js";
import { validacionesDeTasks } from "./validations.js";
//Rutas
router.get("/", getTasks);
router.post("/", validacionesDeTasks, applyValidations, addTask);
router.get("/:id", getTask);
router.put("/:id", changeTask);
router.delete("/:id", deleteTask);

export { router };
