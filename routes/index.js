"use strict";

var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const Anuncio = mongoose.model('Anuncio');

const forEach = require('async-foreach').forEach;
const jwtAuth = require('../lib/jwtAuth');

router.use(jwtAuth());

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    const limit = parseInt(req.query.limit);
    const tag = req.query.tag;
    const venta = req.query.venta;
    const skip = parseInt(req.query.skip);
    const nombre = req.query.nombre;
    const precio = req.query.precio;
    const sort =  req.query.sort;

    const filter = {};
    if (tag){
        filter.tag=tag;
    }
    if (venta){
        filter.venta=venta;
    }
    if (nombre){

        filter.nombre = new RegExp('^' +nombre, "i"); //i: case insensitive
    }

    if (precio){

        if(precio.search('-')<0){
            filter.precio=Number(precio);
        }else{
            var valores = precio.split('-');
            if(valores[0] && valores[1]){
                filter.precio={'$gte':Number(valores[0]), '$lte': Number(valores[1])};
            }else if(valores[0]){
                filter.precio = {'$gte': Number(valores[0])};
            }else if (valores[1]){
                filter.precio = {'$lte': Number(valores[1])};
            }

        }
    }
    if (skip && limit){

    }
  Anuncio.list(filter, limit, skip, sort, function (err, docs) {
      if (err){
        next(err);
        return;
      }

      res.json({success:true, data: docs});
  });

});

//Método para crear anuncios

router.post('/', function (req, res, next) {
   const anuncio = new Anuncio(req.body);
   anuncio.save(function (err, anuncio) {
       if (err){
           return next(err);
       }
       res.json({success:true, anuncio: anuncio});
   });
});

//Método para modificar anuncios

router.put('/:id', function(req, res, next) {
    const id = req.params.id;
    Anuncio.update({_id: id}, req.body, function(err, response) {
       if (err){
           return next(err);
       }
       res.json({success: true, response:response});
    });
});

//Método para eliminar anuncios
router.delete('/:id', function(req,res,next){

    var id = req.params.id;
    Anuncio.remove({_id: id},function(err, response) {
        if(err){
            return next(err);
        }
        res.json({success:true, response: response});
    });

});



//PETICION GET QUE DEVUELVE TODOS LOS TAGS EXISTENTES
router.get('/tags', function(req, res, next){

    //Obtener todos los anuncios
    var query = Anuncio.find();
    //Selecccionamos solo los tags
    query.select('tags');

    //ejecutamos el query
    query.exec(function (err, anuncios){
        if(err) return next(err);

        //creamos el array que se devolverá al finalizar el filtrado de tags
        var tags = [];

        //por cada anuncio obtenemos sus tags
        forEach(anuncios, function(anuncio) {
            //mapeamos los tags de cada anuncio
            anuncio.tags.map(function (tag) {
                //miramos si no aún no esta incluido en la lista de tags que se devolverá
                if(!tags.toString().includes(tag)){
                    //si aún no esta includo lo añadimos a la lista de tags a devolver
                    tags.push(tag);
                }
            });
        }, finished);

        //se ejecuta cuando ha acabado el filtado de tags i devuelve el resultado
        function finished(){
            res.json({success:true, tags: tags});
        }

    });

});

module.exports = router;
