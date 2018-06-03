'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductoSchema = Schema({
    name: String,
    picture: String,
    price: { type: Number, default: 0 },
    category: { type: String, enum: ['frutas', 'verduras', 'granos'] },
    description: String
})

module.exports = mongoose.model('producto', ProductoSchema)