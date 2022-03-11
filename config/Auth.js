/* const passport = require("passport")
 */const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const Cliente = require("../models/Cliente");
 
module.exports = function(passport){

    passport.use(new LocalStrategy({usernameField: 'emailCli', passwordField: 'passCli'}, (emailCli, passCli, done ) =>{
        console.log(emailCli,passCli);
        Cliente.findOne({raw: true, where: {emailCli:emailCli}}).then((user) =>{
            console.log(user);
            if(!user){
                console.log(user);
                /* no done são passados 3 parametros os dados na conta (no caso null), 
                se foi autentificado com sucesso e uma menssagen */
                console.log("conta nao existe");
                return done(null, false, {message: "Está conta não existe!"});
            }

            //se existir iremos comparar a senha
            bcrypt.compare(passCli, user.passCli, (erro, equal) =>{
                console.log(passCli);
                console.log(user.passCli);
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
        console.log(user.idCli);
        done(null, user.idCli);
    });
    
    passport.deserializeUser((idCli, done) =>{
        console.log("chegou aqui deserializeUser");
        console.log(idCli);
        Cliente.findOne({ raw:true, where: {idCli:idCli}}).then((user) =>{
            console.log(user);
            if(!user){
                return done(null, false, {message: "Usuário não encontrado" });
            }else{
                done(null, user);
            }
        })
    });
    
}