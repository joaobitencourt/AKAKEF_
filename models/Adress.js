const db = require("../db/conn");
const { DataTypes } = require("sequelize");

const Adress = db.define("tbEndereco",{
    CEP:{
        type: DataTypes.CHAR(8),
        primaryKey: true,
        allowNull: false,
    },
    Logra:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    Bairro:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    cidade:{
        type: DataTypes.STRING(200),
        allowNull:false,
    },
    numEdi:{
        type: DataTypes.SMALLINT,
        allowNull: false,  
    },
    comple:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    idCli:{
        type: DataTypes.SMALLINT.UNSIGNED,
    },
    idFunc:{
        type: DataTypes.SMALLINT.UNSIGNED,
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

module.exports = Adress; 