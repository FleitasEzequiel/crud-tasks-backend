import mysql from "mysql2/promise";
const connectDB = async (req, res) => {
  const conexion = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tasks_db",
  });
  try {
    console.log("Conectada correctamente");
    return conexion;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export { connectDB };
