const ctrl = {}
const connectDB = require('./db.js')
ctrl.getTasks = async (req,res)=>{
    const connect = await connectDB()
    const [lista] = await connect.query('SELECT * FROM tasks')
    res.send(lista)
}
ctrl.addTask = async (req,res)=>{
    const {title, description, isComplete} = req.body
    const connect = await connectDB()
    const peticion = await connect.query(`INSERT INTO TASKS (title,description,isComplete) VALUES ('${title}','${description}',${isComplete})`)
}
ctrl.getTask = async (req,res)=>{
    const {id} = req.params
    const connect = await connectDB()
    const [task] = await connect.query(`SELECT * FROM TASKS WHERE id = ${id}`)
    if (!task.toString()){
        res.send('No se encontró la tarea').status(404)
    }else{
        console.log(task)
        res.send(task)
    }
}
ctrl.changeTask = async (req,res)=>{
    const {id} = req.params
    const connect = await connectDB()
    const {title, description, isComplete} = req.body
    const peticion = await connect.query(`UPDATE TASKS SET title = '${title}',description='${description}',isComplete='${isComplete}' WHERE id = ${id}`)
    console.log(peticion)
}
ctrl.deleteTask = async (req,res)=>{
    const {id} = req.params
    const connect = await connectDB()
    const peticion = await connect.query(`DELETE FROM TASKS WHERE id = ${id}`)
    res.send(peticion)
}

module.exports = ctrl