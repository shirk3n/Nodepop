/**
 * Created by Juan on 24/1/17.
 */

"use strict";

const mongoose = require('mongoose');
const conn = mongoose.connection;

mongoose.Promise = global.Promise; //Para que no salga el warning: qué librería de promesas vamos a utilizar

conn.on('error', function (err) {
    console.log(err);
});

conn.once('open', function () {
    console.log('connect to mongodb.');
});

mongoose.connect('mongodb://localhost:27017/nodepop');