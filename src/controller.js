const ctrl = {};
const connectDB = require("./db.js");
const query = async (req,res)=>{
  return (await connectDB()).query(req)
}
function verificar(title, description, isComplete) {
  switch (true) {
    case (title.length > 255):
      return false;
      break;
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
  try {
    const [lista] = await query('SELECT * FROM TASKS')
    res.send(lista).status(500)
  } catch (error) {
    res.send(error.message).status()
  }
};
ctrl.addTask = async (req, res) => {
  const { title, description, isComplete } = verificar(
    req.body.title,
    req.body.description,
    req.body.isComplete
  );
  if (title && description && typeof isComplete == "boolean") {
    try {
      const peticion = await query(
        `INSERT INTO TASKS (title,description,isComplete) VALUES ('${title}','${description}',${isComplete})`
      );
      res.send("Se agregó la tarea").status(201);
    } catch (error) {
      res.send(error.message).status()
    }
  } else {
    res.send("Error").status(400);
  }
};
ctrl.getTask = async (req, res) => {
  const id = req.params.id;
  if (id) {
    const [task] = await query(`SELECT * FROM TASKS WHERE id = ${id}`);
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
  const { title, description, isComplete } = verificar(
    req.body.title,
    req.body.description,
    req.body.isComplete
  );
    const [peticion] = await query(
      `UPDATE TASKS SET title = '${title}',description='${description}',isComplete=${isComplete} WHERE id = ${id}`
    ); 
    if (peticion.changedRows == 0){
      res.send('No se modificó la tarea').status(400)
    }else{
      res.send('Se modificó la tarea con éxito').status(200)
    }
}

ctrl.deleteTask = async (req, res) => {
  const { id } = req.params;
    const [peticion] = await query(`DELETE FROM TASKS WHERE id = ${id}`);
    if (peticion.affectedRows == 0){
      res.send('No se eliminó la tarea').status(500)
    }else{
      res.send('Se eliminó la tarea')
    }
};

module.exports = ctrl;
