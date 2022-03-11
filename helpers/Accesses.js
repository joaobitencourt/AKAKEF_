module.exports = {
    authIsTrueOrFalse: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error_msg", "Para acessar está área é preciso estar logado");
        res.redirect("/");
    },

    isOnlyAdmin: function(req, res, next){
        if(req.user.typeAcess == 1){
            return next();
        }
        req.flash("error_msg", "Área restrita!, Apenas pessoal autorizado!");
        res.redirect("/");
    }
}