const Pay = require("../models/Pay");
const paypal = require("paypal-rest-sdk");
const paypalConfig = require("../config/paypal.json");

paypal.configure(paypalConfig);

module.exports = class PayController{

    static pay (req, res){
        /* Pagina da compra "caixa" */
        res.render("pay/all", {layout: "main"});
    }

    static buy(req, res){
        /* Cicar em pagar */
        res.send("comprar");
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