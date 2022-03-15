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
            name: req.body.name,
            email: req.body.email,
            cell: req.body.cell,
            password: req.body.password,
        }
        
        if(!cliente.name || typeof cliente.name == undefined || cliente.name == null ){
            errors.push({texto: "O campo nome é obrigatório!"});
        }
        if(!cliente.email || typeof cliente.email == undefined || cliente.email == null ){
            errors.push( {texto: "O campo email é obrigatório!"} );
        } 
        if(!cliente.cell || typeof cliente.cell == undefined || cliente.cell == null ){
            errors.push( {texto: "O campo celular é obrigatório!"} );
        }
        if(!cliente.password || typeof cliente.password == undefined || cliente.password == null ){
            errors.push( {texto: "O campo senha é obrigatório seu vagabundo!"} );
        }
        if(cliente.password.length <= 4 || cliente.password.length < 8){
            errors.push( {texto:"Senha muito pequena"} );
        }
        if(cliente.password != req.body.passWordConfirmed){
            errors.push( {texto:"Senhas não coincidem"} );
        }
        if(errors.length > 0){
            res.render("User/create", { errors: errors, layout: "main"});
        }else{
            Cliente.findOne({ raw: true, where: {email:cliente.email} }).then((user) => {
                if(user){
                    console.log(cliente)
                    console.log(user);
                    req.flash("error_msg", "Já existe uma conta com esse mesmo email!");
                    res.redirect("/");
                }else{
                    bcrypt.genSalt(10, (erro, salt) => {
                        bcrypt.hash(cliente.password, salt, (erro, hash) =>{
                            if(erro){
                                req.flash("error_msg", "Erro ao criar o usuário!")
                                res.redirect("/");
                            }
                             cliente.password = hash;
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

    static perfil(req, res){
        res.render("User/perfil",  {layout: "main"});
    }
    
    static logout(req, res){
        req.logout();
        req.flash("success_msg", "Deslogado!");
        res.redirect("/");
    }

}