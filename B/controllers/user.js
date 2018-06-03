'use strict'

const userModel = require('../models/user')
const service = require('../services')

// signUp registra usuarios y los guarda en la base de datos
// proporciona un token para que la aplicacion cliente pueda autenticarse contra la api
// y pueda acceder a rutas que definamos privadas o no
function signUp (req, res) {
    const user = new userModel({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    })

    user.save((err) => {
        if(err) res.status(500).send({ message: `Error al Crear el Usuario: ${err}`})
    
        return res.status(201).send({ token: service.createToken(user) })
    })
}
// signIn si el usuario se ha registrado con su email y contraseña (existe en la base de datos)
// y quiere acceder de nuvo este asgina un token para que luego pueda acceder
function signIn (req, res) {
    userModel.find({ email: req.body.email }, (err, user) => {
        
        if(err) return res.status(500).send({ message: err })
        if(!user) return res.status(404).send({ message: 'El Usuario no Existe' })
        
        req.user = user
        res.status(200).send({
            message: 'Acceso Autorizado',
            token: service.createToken(user)
        })
    })
}

module.exports = {
    signUp,
    signIn
}

