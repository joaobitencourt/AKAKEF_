const db = require("../db/conn");
const { DataTypes } = require("sequelize");

const LookBook = db.define("tblookBook",{
    idLook: {
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    imgalt: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: "img_alt"
    },
    imglook:{
        type: DataTypes.STRING(200),
        allowNull: false,
        field: "img_look"
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
    timestamps: true,
    freezeTableName: true,
});

module.exports = LookBook;
