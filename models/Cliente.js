const db = require("../db/conn");
const { DataTypes } = require("sequelize");

const Cliente = db.define("tbCliente",{
    id: {
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        field: "idCli"
    },
    name: {
        type: DataTypes.CHAR(200),
        allowNull: false,
        field: "name_Cli"
    },
    email: {
        type: DataTypes.CHAR(200),
        unique: true,
        allowNull: false,
        field: "email_Cli",
    },
    cell:  {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        field: "cell_Cli",
    },
    password: {
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