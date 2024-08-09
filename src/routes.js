import { Router } from "express";
const router = Router();
import {
  addTask,
  getTasks,
  getTask,
  changeTask,
  deleteTask,
} from "./controller.js";
//Rutas
router.get("/", getTasks);
router.post("/", addTask);
router.get("/:id", getTask);
router.put("/:id", changeTask);
router.delete("/:id", deleteTask);

export { router };
