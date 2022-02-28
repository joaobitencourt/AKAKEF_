const Cliente = require("../models/Cliente");

module.exports = class UserController{
    static async register(req, res){
       /*  res.send("Hello World") */
        res.render("User/create", {layout: "main"});
    }

    static async registerSave (req,res){
        const cliente = {
            nameCli: req.body.nameCli,
            emailCli: req.body.emailCli,
            cellCli: req.body.cellCli,
            passCli: req.body.passCli,
        }
        console.log(cliente);
        
        var errors = []
        if(!cliente.nameCli || typeof cliente.nameCli == undefined || cliente.nameCli == null ){
            errors.push({texto: "O campo nome é obrigatório!"});
            console.log("passou aqui");
        }
        if(!cliente.emailCli || typeof cliente.emailCli == undefined || cliente.emailCli == null ){
            errors.push( {texto: "O campo email é obrigatório!"} );
            console.log("passou aqui");
        } 
        if(!cliente.cellCli || typeof cliente.cellCli == undefined || cliente.cellCli == null ){
            errors.push( {texto: "O campo celular é obrigatório!"} );
            console.log("passou aqui");
        }
        if(!cliente.passCli || typeof cliente.passCli == undefined || cliente.passCli == null ){
            errors.push( {texto: "O campo senha é obrigatório seu vagabundo!"} );
            console.log("passou aqui");
        }
        if(cliente.passCli.length <= 4 || cliente.passCli.length < 8){
            errors.push( {texto:"Senha muito pequena"} );
            console.log("passou aqui");
        }
        if(cliente.passCli != req.body.passCliConfirm){
            errors.push( {texto:"Senhas não coincidem"} );
            console.log("passou aqui");
        }
        console.log(errors);
        if(errors.length > 0){
            console.log("passou aqui erros if erros");
            res.render("User/create", { errors: errors, layout: "main"});
        }else{
            res.redirect("/");
        }

    }
}