const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const config = require('../../../config')();
const db = {};

let sequelize = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  config.database,
);

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(function(file) {
    const model = sequelize['import'](
      path.join(__dirname, file),
    );
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
