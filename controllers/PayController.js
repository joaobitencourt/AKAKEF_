const Pay = require("../models/Pay");
const paypal = require("paypal-rest-sdk");
const paypalConfig = require("../config/paypal.json");
const product = require("../models/Product");
const Product = require("../models/Product");
if (typeof localStorage === "undefined" || localStorage === null) {
    let LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

paypal.configure(paypalConfig);

module.exports = class PayController{

    static pay (req, res){
        /* Pagina da compra "caixa" */
        res.render("pay/all", {layout: "main"});
    }

    static buy(req, res){
        const total = req.body.totalPagar;
        let arr =[];
        let products = {
            name: req.body.name,
            size: req.body.size,
            color: req.body.color,
            count: req.body.count,
            val: req.body.val
        }
        const nameProds = products.name
        for (let i = 0; i < nameProds.length; i++) {
            const element = nameProds[i];
            Product.findOne({raw: true, where: { nameProd: element}}).then((product) =>{
                if(!product){
                    req.flash("error_msg", "Produto não existe o não está em estoque");
                    res.redirect("/pagamento");
                }else{
                    req.flash("success_msg", "Produto existente!");
                    res.redirect("/pagamento");
                }
            }).catch((error) => {console.log("Erro.:" + error.message);})            
        }
        
    }

    static success( req, res ){
        /* pagina de pagamento realizado */
        res.send("comprado com sucesso");
    }

    static cancel ( req, res ){
        /* pagina de compra cancelada */
        res.send("compra cancelada");
    }
}