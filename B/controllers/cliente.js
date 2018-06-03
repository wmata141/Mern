'use strict'

const clienteModel = require('../models/cliente');

//Todos los Clientes
function getClientes (req, res) {
    clienteModel.find({}, (err, clientes) => {
        if(err) return res.status(500).send({message: `Error al Realizar la Peticion: ${err}`})
        if(!clientes) return res.status(404).send({message: `No existen Clientes`})
        
        res.status(200).send({ clientes })
  })  
}
//Cliente por id
function getCliente (req, res) {
    let id = req.params.id 
    clienteModel.findById(id, (err, cliente) => {
        if(err) return res.status(500).send({message: `Error al Realizar la Peticion: ${err}`})
        if(!cliente) return res.status(404).send({message: `El Cliente no Existe`})
        
        res.status(200).send({ cliente })
    })
}
//Insertar Cliente
function saveCliente (req, res) {
    let cliente = new clienteModel()
    cliente.name = req.body.name
    cliente.picture = req.body.picture

    cliente.save((err, productStored) => {
        if (err) return res.status(500).send({message: `Error al Guardar en la Base de Datos: ${err}`})
        
        res.status(200).send({ cliente: productStored })
    })
}
//Modificar Cliente por Id
function updateCliente (req, res) {
    let id = req.params.id 
    let update = req.body
    clienteModel.findByIdAndUpdate(id, update, (err, clienteUpdate) => {
        if (err) return res.status(500).send({message: `Error al Actualizar el Cliente: ${err}`})

        res.status(200).send({ cliente: clienteUpdate })                                   
    })
}
//Eliminar Cliente por Id
function deleteCliente (req, res) {
    let id = req.params.id 
    clienteModel.findById(id, (err, cliente) => {
        if (err) return res.status(500).send({message: `Error al Borrar el Cliente: ${err}`})
        
        cliente.remove(err => {
            if(err) res.status(404).send({message: `El Cliente no Existe`})
            res.status(200).send({ message: "El Cliente ha sido Eliminado" })
        })                             
    })
}

module.exports = {
    getClientes,
    getCliente,
    saveCliente,
    updateCliente,
    deleteCliente
}