const db = require("../db/conn");
const { DataTypes } = require("sequelize");

const Sessions = db.define("tbSession",{
    idsession:{
        type: DataTypes.SMALLINT,
        primaryKey: true,
        allowNull: false,
        field: "idsession"
    },
    expires:{
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    sessionData: {
        type: DataTypes.STRING(250),
        allowNull: false,
        field: "session_data"
    }
    
},
{
    freezeTableName: true,
    timestamps: true,
});

module.exports = Sessions;
