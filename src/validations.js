import { body } from "express-validator";
export const validacionesDeTasks = [
  body("title")
    .notEmpty()
    .withMessage("El titulo no puede estar vacío")
    .isString()
    .withMessage("El titulo debe ser de valor string"),
  body("description")
    .notEmpty()
    .withMessage("La descripción no puede estar vacía")
    .isString()
    .withMessage("La descripción debe ser de tipo string"),
];
