const Func = require("../models/Func");
const bcrypt = require("bcryptjs");
const passport = require("passport");

module.exports = class FuncController{

    static register(req, res){
        res.render("funcs/register", {layout: "second"});
    }
    
    static registerSave (req,res){
        var errors = []
        const func = {
            CPF: req.body.CPF,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cell: req.body.cell,
            typeAcess: req.body.typeAcess,
            born: req.body.born
        }
        console.log("dadas");
        console.log(func);
        if(!func.CPF || typeof func.CPF == undefined || func.CPF == null){
            errors.push({texto: "O campo CPF é obrigatório!"});
        }
        if(func.CPF.length < 11){
            errors.push({texto: "O campo CPF tem que ter 11 digitos!"});
        }
        if(!func.name || typeof func.name == undefined || func.name == null ){
            errors.push({texto: "O campo nome é obrigatório!"});
        }
        if(!func.email || typeof func.email == undefined || func.email == null ){
            errors.push( {texto: "O campo email é obrigatório!"} );
        } 
        if(!func.cell || typeof func.cell == undefined || func.cell == null ){
            errors.push( {texto: "O campo celular é obrigatório!"} );
        }
        if(!func.password || typeof func.password == undefined || func.password == null ){
            errors.push( {texto: "O campo senha é obrigatório seu vagabundo!"} );
        }
        if(func.password.length <= 4 || func.password.length < 8){
            errors.push( {texto:"Senha muito pequena"} );
        }
        if(func.password != req.body.passWordConfirmed){
            errors.push( {texto:"Senhas não coincidem"} );
        }
        if(!func.born || typeof func.born == undefined || func.born == null){
            errors.push( {texto: "O campo Data de Nascimento é obrigatório!"} );
        }
        if(errors.length > 0){
            res.render("funcs/register", { errors: errors, layout: "second"});
        }else{
            Func.findOne({ raw: true, where: {email:func.email} }).then((user) => {
                if(user){
                    console.log(func)
                    console.log(user);
                    req.flash("error_msg", "Já existe uma conta com esse mesmo email!");
                    res.redirect("/admin/funcionario/register");
                }else{
                    bcrypt.genSalt(10, (erro, salt) => {
                        bcrypt.hash(func.password, salt, (erro, hash) =>{
                            if(erro){
                                req.flash("error_msg", "Erro ao criar o usuário!")
                                res.redirect("/admin/funcionario/register");
                            }
                             func.password = hash;
                             Func.create(func).then((user)=>{
                                if(!user){
                                req.flash("error_msg", "Erro de ciração");
                                res.redirect("/admin/funcionario/register");
                                }else{
                                    req.flash("success_msg", "Usuário criado com sucesso!");
                                    res.redirect("/admin/product/all");
                                }
                               
                            }).catch((error) =>{
                                req.flash("error_msg", "Erro ao criar o usuário");
                                res.redirect("/admin/funcionario/register");
                                console.error("Error.: algo deu errado " + error.message);
                            })
                        })
                    }) 
                }
            }).catch((error) => {
                req.flash("error_msg", "O correu um erro interno");
                res.redirect("/admin/funcionario/register");
                console.error("Error.: algo deu errado " + error.message);
            })
        }
    }

}