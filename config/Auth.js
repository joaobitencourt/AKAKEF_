/* const passport = require("passport")
 */const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const Cliente = require("../models/Cliente");
const Func = require("../models/Func");
 
module.exports = function(passport){

    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done ) =>{
        console.log(email,password);
        Cliente.findOne({raw: true, where: {email:email}}).then((user) =>{
            console.log(user);
            if(!user){
                Func.findOne({raw: true, where:{email:email}}).then((user) =>{
                    if(!user){
                    console.log("conta nao existe");
                    return done(null, false, {message: "Está conta não existe!"});
                    }
                    console.log("senha");
                }).catch((error)=>{
                    console.log("Erro.:" + error.message);
                })
                console.log(user);
                /* no done são passados 3 parametros os dados na conta (no caso null), 
                se foi autentificado com sucesso e uma menssagen */
            }

            //se existir iremos comparar a senha
            bcrypt.compare(password, user.password, (erro, equal) =>{
                console.log(password);
                console.log(user.password);
                if(equal){
                    console.log("senha correta");
                    return done(null, user);
                }else{
                    console.log("senha incorreta");
                    return done(null, false, {message: "Senha incorreta!"});
                }
            })
        })
    }));

    /* levando os dados do user para uma sessão */
                                                                                                                                                                                                                                                                        
    passport.serializeUser ((user, done) => {
        console.log("chegou aqui serializeUser");
        console.log(user.id);
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) =>{
        console.log("chegou aqui deserializeUser");
        console.log(id);
        Cliente.findOne({ raw:true, where: {id:id}}).then((user) =>{
            console.log(user);
            if(!user){
                return done(null, false, {message: "Usuário não encontrado" });
            }else{
                done(null, user);
            }
        })
    });
    
}