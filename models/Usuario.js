/**
 * Created by Juan on 29/1/17.
 */
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

usuarioSchema.statics.list = function (callback) {
    const query = Usuario.find();
    query.exec(callback); //se usa exec pork devuelve el find una query
};

const Usuario = mongoose.model('Usuario', usuarioSchema);