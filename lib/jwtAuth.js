/**
 * Created by Juan on 28/1/17.
 */
"use strict";

const jwt = require ('jsonwebtoken');
const localConfig = require('../localConfig');

//Middleware de autenticación
module.exports = function () {
    return function(req, res, next){
        const token = req.body.token || req.query.token || req.get('x-access-token');

        if (!token){
            return next(new Error('No token provided'));
        }

        //Si el token está caducado jsonwebtoken lo hace
        jwt.verify(token, localConfig.jwt.secret, function (err, decoded) {
            if(err){
                return next(new Error('Invalid token'));
            }
            req.decoded = decoded;
            next();
        });
    }
};