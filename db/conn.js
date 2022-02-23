const { Sequelize } = require("sequelize");
const config = require("./config.js");

const sequelize = new Sequelize (config);
try {
    sequelize.authenticate();
    console.log("Conectado com sucesso!");
  } catch (error) {
    console.error("Não conectado com a database", error);
  }

module.exports = sequelize;
