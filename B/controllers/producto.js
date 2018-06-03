'use strict'

const productoModel = require('../models/producto');

//Todos los Productos
function getProductos (req, res) {
    productoModel.find({}, (err, productos) => {
        if(err) return res.status(500).send({message: `Error al Realizar la Peticion: ${err}`})
        if(!productos) return res.status(404).send({message: `No existen Productos`})
        
        res.status(200).send({ productos })
  })  
}
//Producto por id
function getProducto (req, res) {
    let id = req.params.id 
    productoModel.findById(id, (err, producto) => {
        if(err) return res.status(500).send({message: `Error al Realizar la Peticion: ${err}`})
        if(!producto) return res.status(404).send({message: `El Producto no Existe`})
        
        res.status(200).send({ producto })
    })
}
//Insertar Producto
function saveProducto (req, res) {
    let producto = new productoModel()
    producto.name = req.body.name
    producto.picture = req.body.picture
    producto.price = req.body.price
    producto.category = req.body.category
    producto.description = req.body.description

    producto.save((err, productStored) => {
        if (err) return res.status(500).send({message: `Error al Guardar en la Base de Datos: ${err}`})
        
        res.status(200).send({ producto: productStored })
    })
}
//Modificar Producto por Id
function updateProducto (req, res) {
    let id = req.params.id 
    let update = req.body
    productoModel.findByIdAndUpdate(id, update, (err, productoUpdate) => {
        if (err) return res.status(500).send({message: `Error al Actualizar el Producto: ${err}`})

        res.status(200).send({ producto: productoUpdate })                                   
    })
}
//Eliminar Producto por Id
function deleteProducto (req, res) {
    let id = req.params.id 
    productoModel.findById(id, (err, producto) => {
        if (err) return res.status(500).send({message: `Error al Borrar el Producto: ${err}`})
        
        producto.remove(err => {
            if(err) res.status(404).send({message: `El Producto no Existe`})
            res.status(200).send({ message: "El Producto ha sido Eliminado" })
        })                             
    })
}

module.exports = {
    getProductos,
    getProducto,
    saveProducto,
    updateProducto,
    deleteProducto
}