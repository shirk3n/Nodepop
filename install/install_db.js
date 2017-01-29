'use strict';

var mongoose = require('mongoose');

require('../lib/connectMongoose');
require('../models/Anuncio');
require('../models/Usuario');

var Usuario = mongoose.model('Usuario');
var Anuncio = mongoose.model('Anuncio');

// Archivos precargados JSON
var usuarios = require('./usuarios.json');
var anuncios = require('./anuncios.json');

//Eliminar usuarios
function deleteUsuarios(){
	console.log('Vamos a eliminar todos los usuarios...');
	return new Promise(function(resolve, reject){
		Usuario.remove({}, function(err){
			if(err) reject(err);
			resolve();
		});
	});
}

//Eliminar anuncios
function deleteAnuncios(){
	console.log('Vamos a eliminar todos los anuncios...');
	return new Promise(function(resolve, reject){
		Anuncio.remove({}, function(err){
			if(err) reject(err);
			resolve();
		});
	});
}

//Crear Usuarios desde archivo JSON
function createUsuarios(){
	console.log('Creando Usuarios precargados...');
	return new Promise(function(resolve, reject){
		Usuario.insertMany(usuarios, function(err){
			if(err) reject(err);
			resolve();
		});
	});
}

//Crear Anuncios desde archivo JSON
function createAnuncios(){
	console.log('Creando Anuncios precargados...');
	return new Promise(function(resolve, reject){
		Anuncio.insertMany(anuncios, function(err){
			if(err) reject(err);
			resolve();
		});
	});
}

//Esperar a que la connexión con la BBDD este terminada
mongoose.connection.once('open', function(){
	//Ejecutar promesas.
	deleteUsuarios()
		.then(deleteAnuncios)
		.then(createUsuarios)
		.then(createAnuncios)
		.then(function(){
			console.log('¡¡Todos los datos creados!!');
			process.exit();
		})
		.catch(function(err){
			console.log('Algo no ha ido bien... :(');
			console.log(err);
			process.exit();
		});
});
