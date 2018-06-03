'use strict'

const express = require('express')
const auth = require('../middlewares/auth')
const clienteCtrl = require('../controllers/cliente')
const productoCtrl = require('../controllers/producto')
const ventaCtrl = require('../controllers/venta')
const userCtrl = require('../controllers/user')

const api = express.Router()

api.get('/cliente', clienteCtrl.getClientes)
api.get('/cliente/:id', clienteCtrl.getCliente)
api.post('/cliente', clienteCtrl.saveCliente)
api.put('/cliente/:id', clienteCtrl.updateCliente)
api.delete('/cliente/:id', clienteCtrl.deleteCliente)

api.get('/producto', productoCtrl.getProductos)
api.get('/producto/:id', productoCtrl.getProducto)
api.post('/producto', productoCtrl.saveProducto)
api.put('/producto/:id', productoCtrl.updateProducto)
api.delete('/producto/:id', productoCtrl.deleteProducto)

api.get('/venta', ventaCtrl.getVentas)
api.get('/venta/:id', ventaCtrl.getVenta)
api.post('/venta', ventaCtrl.saveVenta)
api.put('/venta/:id', ventaCtrl.updateVenta)
api.delete('/venta/:id', ventaCtrl.deleteVenta)

api.post('/signin', userCtrl.signIn)
api.post('/signup', userCtrl.signUp)

api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Acceso Concedido'})
})

module.exports = api