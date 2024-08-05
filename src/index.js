const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express();
//Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
//Iniciar servidor
app.use(require('./routes'));
app.listen(3030,()=>{
    console.log(`Servidor ejecutandose en el puerto 3030`)
})