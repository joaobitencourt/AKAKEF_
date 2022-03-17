const Adress = require("../models/Adress");

module.exports =  class AdressController{
    static adressRegister (req, res){
        const searchIt = "-";
        const replacer = new RegExp(searchIt);
        const cep = req.body.CEP;
        const replacedCEP = cep.replace(replacer,"");
        /* const replacedCEP = cep.value.replace("-",""); */
        /* console.log(cep.replace(replacer,"")); */
        const adress = {
            CEP: replacedCEP,
            Logra: req.body.Logra,
            Bairro: req.body.Bairro,
            cidade: req.body.cidade,
            UF: req.body.uf,
            numEdi: req.body.numEdi,
            comple: req.body.comple,
            idCli: req.user.id
        }
         console.log(adress);
        if(adress){
            Adress.create(adress).then((adressSaved) =>{
                if(!adressSaved){
                    req.flash("error_msg", "OPA!, Algo deu errado!");
                    res.redirect("/users");
                }else{
                    req.flash("success_msg", "Endereço Cadastrado com sucesso!");
                    res.redirect("/users");
                }
                console.log(adressSaved);
            }).catch((error) =>{console.log("Algo deu errado em.:" + error.message);});
        }
    }

    static adressRegisterAll(id){
        let adresses;
        Adress.findAll({raw: true, where: {idCli:id}}).then((adress) =>{
            console.log(adress);
            adresses = adress
            console.log(adresses);
        }).catch((error) =>{
            console.log("Erro.:"+error.message);
        })
        return adresses;
    }
}