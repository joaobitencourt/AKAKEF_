const db = require("../db/conn");
const { DataTypes } = require("sequelize");

const Func = db.define("tbFuncionario",{
    id: {
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        field: "idFunc"
    },
    CPF:{
        type: DataTypes.CHAR(11),
        unique: true,
        allowNull: false,
        field: "cpf_Func"
    },
    name: {
        type: DataTypes.CHAR(200),
        allowNull: false,
        field: "name_Func"
    },
    email: {
        type: DataTypes.CHAR(200),
        unique: true,
        allowNull: false,
        field: "email_Func",
    },
    password: {
        type: DataTypes.CHAR(200),
        allowNull: false,
        field: "pass_Func",
    },
    cell:  {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        field: "cell_Func",
    },
    typeAcess: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        field: "type_Acess"
    },
    born:{
        type: DataTypes.DATE,
        allowNull: false,
        field: "born_Func"

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

module.exports = Func;