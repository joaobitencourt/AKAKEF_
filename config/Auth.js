const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const Cliente = require("../models/Cliente");
 
    passport.use(new LocalStrategy({usernameField: 'emailCli'}, (emailCli, passCli, done ) =>{
        Cliente.findOne({raw: true, where: {emailCli:emailCli}}).then((user) =>{
            if(!user){
                /* no done são passados 3 parametros os dados na conta (no caso null), 
                se foi autentificado com sucesso e uma menssagen */
                return done(null, false, {message: "Está conta não existe!"});
            }

            //se existir iremos comparar a senha
            bcrypt.compare(passCli, user.passCli, (erro, equal) =>{
                if(equal){
                    return done(null, userAuth);
                }else{
                    return done(null, false, {menssage: "Senha incorreta!"});
                }
            })
        })
    }));

    /* levando os dados do user para uma sessão */

    passport.serializeUser ((user, done) => {
        done(null, user.idCli);
    });

    passport.deserializeUser((idCli, done) =>{
        Cliente.findByPk(idCli, (err, user) =>{
            done(err, user);
        })
    });

    module.exports = passport;