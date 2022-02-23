const db = require("../db/conn");
const { DataTypes } = require("sequelize");

const AcessType = db.define("tbAcessType", {
    typeAcess: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        field: "type_Acess"
    },
    nameAcess: {
        type: DataTypes.CHAR(100),
        allowNull: false,
        field: "name_Acess"    
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

module.exports = AcessType;