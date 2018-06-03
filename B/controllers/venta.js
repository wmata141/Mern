'use strict'

const clienteModel = require('../models/cliente');
const productoModel = require('../models/producto');
const ventaModel = require('../models/venta');

//Todos los Ventas
function getVentas (req, res) {
    ventaModel.find({}, (err, ventas) => {
        if(err) return res.status(500).send({message: `Error al Realizar la Peticion: ${err}`})
        if(!ventas) return res.status(404).send({message: `No existen Ventas`})
        
        // clienteModel.populate(ventas, {path: "cliente"}, (err, ventas) => {
            res.status(200).send({ ventas })
        // })        
    })  
}
//Venta por id
function getVenta (req, res) {
    let id = req.params.id 
    ventaModel.findById(id, (err, venta) => {
        if(err) return res.status(500).send({message: `Error al Realizar la Peticion: ${err}`})
        if(!venta) return res.status(404).send({message: `El Venta no Existe`})
        
        res.status(200).send({ venta })
    })
}
//Insertar Venta
function saveVenta (req, res) {    
    let venta = new ventaModel()
    let cliente = new clienteModel()
    let producto = new productoModel()

    
    console.log(JSON.stringify(req.body));

    cliente._id = req.body.id_cliente
    cliente.name = req.body.name
    cliente.picture = req.body.picture
    cliente.dni = req.body.dni 
    
    venta.cliente = cliente    

    venta.save((err, productStored) => {
        if (err) return res.status(500).send({message: `Error al Guardar en la Base de Datos: ${err}`})
        
        producto.name = req.body.name
        producto.picture = req.body.picture
        producto.price = req.body.price
        producto.category = req.body.category
        producto.description = req.body.description


        res.status(200).send({ venta: productStored })
    })
}
//Modificar Venta por Id
function updateVenta (req, res) {
    let id = req.params.id 
    let update = req.body
    ventaModel.findByIdAndUpdate(id, update, (err, ventaUpdate) => {
        if (err) return res.status(500).send({message: `Error al Actualizar el Venta: ${err}`})

        res.status(200).send({ venta: ventaUpdate })                                   
    })
}
//Eliminar Venta por Id
function deleteVenta (req, res) {
    let id = req.params.id 
    ventaModel.findById(id, (err, venta) => {
        if (err) return res.status(500).send({message: `Error al Borrar el Venta: ${err}`})
        
        venta.remove(err => {
            if(err) res.status(404).send({message: `El Venta no Existe`})
            res.status(200).send({ message: "El Venta ha sido Eliminado" })
        })                             
    })
}

module.exports = {
    getVentas,
    getVenta,
    saveVenta,
    updateVenta,
    deleteVenta
}