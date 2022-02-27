const Cliente = require("../models/Cliente");

module.exports = class UserController{
    static async register(req, res){
       /*  res.send("Hello World") */
        res.render("partials/_register", {layout: "main"});
    }
}