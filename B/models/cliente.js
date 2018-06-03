'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClienteSchema = Schema({
    name: String,
    picture: String,
    dni: { type: Number, default: 0 },
})

module.exports = mongoose.model('cliente', ClienteSchema)