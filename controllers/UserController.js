const Cliente = require("../models/Cliente");
const bcrypt = require("bcryptjs");
const passport = require("passport");

module.exports = class UserController{
    static async register(req, res){
       /*  res.send("Hello World") */
        res.render("User/create", {layout: "main"});
    }

    static registerSave (req,res){
        var errors = []
        const cliente = {
            nameCli: req.body.nameCli,
            emailCli: req.body.emailCli,
            cellCli: req.body.cellCli,
            passCli: req.body.passCli,
        }
        
        if(!cliente.nameCli || typeof cliente.nameCli == undefined || cliente.nameCli == null ){
            errors.push({texto: "O campo nome é obrigatório!"});
        }
        if(!cliente.emailCli || typeof cliente.emailCli == undefined || cliente.emailCli == null ){
            errors.push( {texto: "O campo email é obrigatório!"} );
        } 
        if(!cliente.cellCli || typeof cliente.cellCli == undefined || cliente.cellCli == null ){
            errors.push( {texto: "O campo celular é obrigatório!"} );
        }
        if(!cliente.passCli || typeof cliente.passCli == undefined || cliente.passCli == null ){
            errors.push( {texto: "O campo senha é obrigatório seu vagabundo!"} );
        }
        if(cliente.passCli.length <= 4 || cliente.passCli.length < 8){
            errors.push( {texto:"Senha muito pequena"} );
        }
        if(cliente.passCli != req.body.passCliConfirm){
            errors.push( {texto:"Senhas não coincidem"} );
        }
        if(errors.length > 0){
            res.render("User/create", { errors: errors, layout: "main"});
        }else{
            Cliente.findOne({ raw: true, where: {emailCli:cliente.emailCli} }).then((user) => {
                if(user){
                    console.log(cliente)
                    console.log(user);
                    req.flash("error_msg", "Já existe uma conta com esse mesmo email!");
                    res.redirect("/");
                }else{
                    bcrypt.genSalt(10, (erro, salt) => {
                        bcrypt.hash(cliente.passCli, salt, (erro, hash) =>{
                            if(erro){
                                req.flash("error_msg", "Erro ao criar o usuário!")
                                res.redirect("/");
                            }
                             cliente.passCli = hash;
                             Cliente.create(cliente).then(()=>{
                                req.flash("success_msg", "Usuário criado com sucesso!");
                                res.redirect("/");
                            }).catch((error) =>{
                                req.flash("error_msg", "Erro ao criar o usuário");
                                res.redirect("/users/register");
                                console.error("Error.: algo deu errado " + error.message);
                            })
                        })
                    }) 
                }
            }).catch((error) => {
                req.flash("error_msg", "O correu um erro interno");
                res.redirect("/");
                console.error("Error.: algo deu errado " + error.message);
            })
        }
    }

    static login(req, res){
        res.render("User/login");
    }

    static loginAuth(req, res, next){

        passport.authenticate("local", {
            successRedirect: "/lookbook",
            failureRedirect: "/",
            failureFlash:  true,
        })(req, res, next)

    }
}