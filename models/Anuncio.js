/**
 * Created by Juan on 24/1/17.
 */
"use strict";

const mongoose = require('mongoose');

//1º Creamos esquemas
// Anuncio

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});


//2º Ponemos un método a cada esquema

//ANUNCIO
anuncioSchema.statics.list = function(filter, limit, skip, sort,  callback){
    const query = Anuncio.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.sort(sort);
    query.exec(callback); //se usa exec pork devuelve el find una query
};



//3º Creo el modelo

const Anuncio = mongoose.model('Anuncio', anuncioSchema);




//module.exports = Anuncio;
//module.exports = Usuario;
