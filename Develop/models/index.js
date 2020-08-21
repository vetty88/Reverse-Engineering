// changed all consts/lets to var to make sure functions worked
// updated 'use strict' to the function version

(function () {
  'use strict';
   //the rest of the function
}());

// specifying required modules
var fs        = require('fs');
//Node.js File System (FS) Module - this allows you to work with the file system on your computer.  Meaning we can then read, create, update, delete and rename files. 
var path      = require('path');
// The Path module allows us to work with file and directory paths in our file system.
var Sequelize = require('sequelize');
// // Sequelize is a promise-based Node.js ORM (Object Related Mapping) it supports MySQL and other database systems. 
// Sequelize works to automatically map out the objects that we specify in our code to allow connection to the database and manipulate data. 
// Sequelize is promise-based meaning it makes it easier for us to manage asynchronous functions (callbacks) and expectations in our code. 


var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};



if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
