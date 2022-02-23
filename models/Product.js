const db = require("../db/conn");
const { DataTypes } = require('sequelize');

const Product = db.define("tbProduct", {
    idProd: {
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    nameProd:{
        type: DataTypes.CHAR(200),
        allowNull: false,
        field: "name_Prod",
    },
    descProd:{
        type: DataTypes.STRING(500),
        allowNull: false,
        field: "desc_Prod",
    },
    valProd:{
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "val_Prod"
    },
    sizeProd:{
        type: DataTypes.CHAR(10),
        allowNull: false,
        field: "size_Prod",
    },
    wieghtProd:{
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "wieght_Prod",
    },
    qtdProd:{
        type: DataTypes.SMALLINT,
        allowNull: false,
        field: "qtd_Prod",
    },
    typeProd:{
        type: DataTypes.CHAR(200),
        allowNull: false,
        field: "type_Prod",
    },
    colorProd:{
        type: DataTypes.CHAR(200),
        allowNull: false,
        field: "color_Prod",
    },
    imageProd:{
        type: DataTypes.STRING(200),
        allowNull: false,
        field: "image_Prod",
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

module.exports = Product;