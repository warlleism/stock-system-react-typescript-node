const express = require("express");
const Router = express.Router();
const read = require('../controllers/read')
const readAll = require('../controllers/readAll')
const register = require('../controllers/create')
const updateData = require('../controllers/update')

Router.post("/read", read)

Router.put("/update", updateData)

Router.post("/", register)

Router.get("/", readAll)

module.exports = Router;