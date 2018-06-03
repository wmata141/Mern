'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
    if (err) {
        return console.log(`Error al Conectar a la Base de datos: ${err}`)
    }
    console.log('Conexion a la Base de Datos Establecida...');

    app.listen (config.port, () => {
        console.log(`Api Rest Corriendo en http://localhost:${config.port}`);        
    })    
})
