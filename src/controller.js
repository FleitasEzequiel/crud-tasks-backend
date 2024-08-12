import { connectDB } from "./db.js";
const query = async (req, res) => {
  return (await connectDB()).query(req);
};

export const getTasks = async (req, res) => {
  try {
    const [lista] = await query("SELECT * FROM TASKS");
    res.send(lista).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
};
export const addTask = async (req, res) => {
  const { title, description, isComplete } = req.body;
  const pet = await query(
    `INSERT INTO TASKS (title,description,isComplete) VALUES ('${title}','${description}',${isComplete})`
  );
  res.send(pet);
};
export const getTask = async (req, res) => {
  const id = req.params.id;
  const [task] = await query(`SELECT * FROM TASKS WHERE id = ${id}`);
  res.send(task);
};
export const changeTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;
  const [peticion] = await query(
    `UPDATE TASKS SET title = '${title}',description='${description}',isComplete=${isComplete} WHERE id = ${id}`
  );
  res.send(peticion);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const [peticion] = await query(`DELETE FROM TASKS WHERE id = ${id}`);
  res.send(peticion);
};
