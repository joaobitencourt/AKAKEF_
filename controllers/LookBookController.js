const LookBook = require("../models/LookBook");

module.exports = class LookBookController{

    static async showLooks (req, res){
        const look = await LookBook.findAll( {raw : true} );
        console.log(look)
        try {
            res.render('lookbook/all', {look, layout: "main" });
        } catch (error) {
            console.log(error);
        }
    } 

    static async showAllLooks (req, res){
        const look = await LookBook.findAll( {raw : true} );
        console.log(look)
        try {
            res.render('lookbook/allLooks', {look, layout: "second" });
        } catch (error) {
            console.log(error);
        }
    } 
};