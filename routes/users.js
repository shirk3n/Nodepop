/**
 * Created by Juan on 28/1/17.
 */
"use strict";

const express = require('express');
const router = express.Router();

//cargar Modelos Mongoose
var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');


const jwt = require('jsonwebtoken');
var sha1 = require('sha1');
const localConfig = require('../localConfig');

/*
//Método para listar los usuarios
router.get('/listUsers', function(req, res, next) {
    Usuario.list(function (err, docs) {
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, data: docs})
    });
});
*/

//Para hacer el login utilizamos el metodo post
router.post('/authenticate', function (req, res, next) {
    //const nombre = req.body.nombre;
    const email = req.body.email;
    const clave = sha1(req.body.clave);

    // Buscamos en bbdd

    Usuario.findOne({email: email}, function (err, usuario) {
       if(err){
           return next(err);
       }
        if (!usuario) {
           return next(err);
        }else{
           if(usuario.clave != clave){
               return next(err);
           }else{
               //Comprobamos su password
               //Si coincide, creamos token
               const token = jwt.sign({_id: usuario._id}, localConfig.jwt.secret, {
                   expiresIn: localConfig.jwt.expiresIn
               });
               res.json({success: true, token: token});
           }
        }
    });
});

//METODO POST CREAR USUARIO
router.post('/', function(req,res,next){
    //Crear usuario
    var user = new Usuario(req.body);
    //Enciptación SHA1
    user.clave = sha1(user.clave);

    //Guardar BBDD
    user.save(function(err,usuario){
        if(err){
            return next(error);
        }
        //Si el usuario se ha creado correctamente creo el token y se lo devuelvo al usuario para
        //que pueda empezar a usar la api
        const token = jwt.sign({_id: user._id}, localConfig.jwt.secret, {
            expiresIn: localConfig.jwt.expiresIn
        });
        res.json({success: true, token: token});
    });
});

module.exports = router;