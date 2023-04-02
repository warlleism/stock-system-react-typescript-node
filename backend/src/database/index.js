const sequelize = require("sequelize");
const config = require("../config/config");
const Produtos = require('../model/produtos')

const connection = new sequelize(config);

Produtos.init(connection);

module.exports = connection;