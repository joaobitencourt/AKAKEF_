const db = require("../db/conn");
const { DataTypes } = require("sequelize");

const Cliente = db.define("tbCliente",{
    idCli: {
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    nameCli: {
        type: DataTypes.CHAR(200),
        allowNull: false,
        field: "name_Cli"
    },
    emailCli: {
        type: DataTypes.CHAR(200),
        unique: true,
        allowNull: false,
        field: "email_Cli",
    },
    cellCli:  {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        field: "cell_Cli",
    },
    passCli: {
        type: DataTypes.CHAR(200),
        allowNull: false,
        field: "pass_Cli",
    },
    typeAcess: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 2,
        field: "type_Acess"
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, 
    },
},
{
    freezeTableName: true,
    timestamps: true,
});

module.exports = Cliente;