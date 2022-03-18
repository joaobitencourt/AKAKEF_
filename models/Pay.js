const db = require("../db/conn");
const { DataTypes } = require("sequelize");

const Pay = db.define("tbPay",{
    idPay: {
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    id: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        field:("idCli")
    },
    idProd:{
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false
    },
    typePay: {
        type: DataTypes.CHAR(100),
        field: "type_Pay"
    },
    qtdPay:{
        type: DataTypes.SMALLINT,
        allowNull: false,
        field: "qtd_Pay"
    },
    fretePay:{
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "frete_Pay"
    },
    totalPay:{
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "total_Pay"
    },
    situationPay:{
        type: DataTypes.CHAR(50),
        allowNull: false,
        field: "situation_Pay"
    },createdAt:{
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
    timestamps: true,
    freezeTableName: true,
});

module.exports = Pay; 