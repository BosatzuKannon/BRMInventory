'use strict';

const { create_models } = require("../mainModel");
const db = create_models(__dirname,__filename)

module.exports = db;