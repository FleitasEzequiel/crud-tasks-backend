import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes.js";
const app = express();
//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(json());
//Iniciar servidor
app.use("/tasks", router);
app.listen(3030, () => {
  console.log(`Servidor ejecutandose en el puerto 3030`);
});
