const ctrl = {};
const connectDB = require("./db.js");

function verificar(title, description, isComplete) {
  switch (true) {
    case title.trim() == "":
      return false;
      break;
    case typeof title != "string":
      return false;
      break;
    case description.trim() == "":
      return false;
      break;
    case typeof description != "string":
      return false;
      break;
    case typeof isComplete != "boolean":
      return false;
      break;
    default:
      return { title, description, isComplete };
      break;
  }
}
ctrl.getTasks = async (req, res) => {
  const connect = await connectDB();
  const [lista] = await connect.query("SELECT * FROM tasks");
  res.send(lista);
};
ctrl.addTask = async (req, res) => {
  const { title, description, isComplete } = verificar(
    req.body.title,
    req.body.description,
    req.body.isComplete
  );
  const connect = await connectDB();
  if (title && description && typeof isComplete == "boolean") {
    const peticion = await connect.query(
      `INSERT INTO TASKS (title,description,isComplete) VALUES ('${title}','${description}',${isComplete})`
    );
    res.send("Se agregó la tarea").status(201);
  } else {
    res.send("Error").status(400);
  }
};
ctrl.getTask = async (req, res) => {
  const id = req.params.id;
  const connect = await connectDB();
  if (id) {
    const [task] = await connect.query(`SELECT * FROM TASKS WHERE id = ${id}`);
    if (!task.toString()) {
      res.send("No se encontró la tarea").status(404);
    } else {
      console.log(task);
      res.send(task).status(200);
    }
  } else {
    res.send('Error en el campo "id"').status(400);
  }
};
ctrl.changeTask = async (req, res) => {
  const { id } = req.params;
  const connect = await connectDB();
  const { title, description, isComplete } = req.body;
  const peticion = await connect.query(
    `UPDATE TASKS SET title = '${title}',description='${description}',isComplete='${isComplete}' WHERE id = ${id}`
  );
  console.log(peticion);
};

ctrl.deleteTask = async (req, res) => {
  const { id } = req.params;
  const connect = await connectDB();
  const peticion = await connect.query(`DELETE FROM TASKS WHERE id = ${id}`);
  res.send(peticion);
};

module.exports = ctrl;
