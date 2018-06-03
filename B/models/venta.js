'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cliente = mongoose.model('cliente')
const Producto = mongoose.model('producto')

const VentaSchema = Schema({
    fecha: { type: Date, default: Date.now() },
    cliente: { type: Schema.ObjectId, ref: "cliente" },
    detalle: [
        { 
            producto: { type: Schema.ObjectId, ref: "producto" },
            cantidad: { type: Number, default: 0 }
        }
    ]
})

module.exports = mongoose.model('venta', VentaSchema)


