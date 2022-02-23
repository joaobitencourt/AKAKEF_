require("dotenv").config();
const config = {
    host: process.env.HOST,
    dialect: process.env.DATABASE_DIALECTE,   
    username: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    define:{
        timestamp: true,
        undercored: true,
    }
};

module.exports = config;