const db = require("../db/conn");
const { DataTypes } = require("sequelize");

const Func = db.define("tbFuncionario",{
    id: {
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        field: "idFunc"
    },
    cpfFunc:{
        type: DataTypes.CHAR(11),
        unique: true,
        allowNull: false,
        field: "cpf_Func"
    },
    nameFunc: {
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
    cellFnc:  {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        field: "cell_Func",
    },
    typeAcess: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        field: "type_Acess"
    },
    born_Func:{
        type: DataTypes.DATE,
        allowNull: false,
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