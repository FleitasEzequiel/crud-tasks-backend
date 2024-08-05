const router = require('express').Router()
const {addTask, getTasks, getTask, changeTask, deleteTask} = require('./controller')
//Rutas
router.get('/tasks',getTasks)
router.post('/tasks',addTask)
router.get('/tasks/:id',getTask)
router.put('/tasks/:id',changeTask)
router.delete('/tasks/:id',deleteTask)

module.exports = router