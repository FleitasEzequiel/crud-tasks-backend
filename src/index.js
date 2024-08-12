import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes.js";
import { connectDB } from "./db.js";
const app = express();
//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(json());
//Iniciar servidor
app.use("/tasks", router);
app.listen(3030, async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
  console.log(`Servidor ejecutandose en el puerto 3030`);
});
