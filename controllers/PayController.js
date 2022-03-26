const Pay = require("../models/Pay");
const paypal = require("paypal-rest-sdk");
const paypalConfig = require("../config/paypal.json");
const product = require("../models/Product");
const Product = require("../models/Product");
if (typeof localStorage === "undefined" || localStorage === null) {
    let LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

const sequelize = require("sequelize");
const op = sequelize.Op;
paypal.configure(paypalConfig);

module.exports = class PayController{

    static pay (req, res){
        /* Pagina da compra "caixa" */
        res.render("pay/all", {layout: "main"});
    }

    static buy(req, res, next){
        const total = req.body.totalPagar;
        let products = {
            /* varifyProds : {name : req.body.name, size :  req.body.size, color :  req.body.color, count: req.body.count}, */
            codigo : req.body.codigo,
            count: req.body.count
        };

        const verify = products.codigo;
        const qtd = products.count;
        console.log(qtd);
        let numberOfElements = verify.length;
        let soma = 0;
        let isEstoque = 0;
        for (let i = 0; i < numberOfElements; i++) {
            const element = verify[i];
            Product.findOne({raw: true, where: { idProd: element }}).then((product) =>{           
                if( !product || typeof product == undefined || product == null){
                    console.log("chegou aqui");
                    req.flash("error_msg", "Produto não existe ou não está em estoque");
                    res.redirect("/pagamento");
                }else{
                    let count = products.count[i]
                    console.log(count);
                    let val = product.valProd; 
                    soma += val * count;
                    console.log(soma);
                    console.log(product);
                    let estoque = product.qtdProd;
                    isEstoque = estoque - count;
                    console.log(isEstoque);
                }
                console.log(total + "total int");
                console.log(soma + "soma");
                if(soma == total){
                    console.log("iguais");
                }else{
                    console.log("diferentes");
                }
                if(product.qtdProd < isEstoque){
                    console.log("produto fora de estoque");
                }else{
                    Product.update({ qtdProd: isEstoque}, {where: {idProd: product.idProd} }).then().catch((error) => {console.log("Error.:" + error.message);})
                    console.log("produto em estoque");
                }
            }).catch((error) => {console.log("Erro.:" + error.message);}) 
        }
            
/*         const verify = products.varifyProds
        let numberOfElements = verify.name.length;
        let soma = 0;
        let isEstoque = 0;
        for (let i = 0; i < numberOfElements; i++) {
           let names = verify.name[i];
           let color = verify.color[i];
           let size = verify.size[i];
            Product.findOne({raw: true, where: { nameProd: names }, [op.and]: { colorProd: color }, [op.and]: { sizeProd: size }}).then((product) =>{           
                if( !product || typeof product == undefined || product == null){
                    console.log("chegou aqui");
                    req.flash("error_msg", "Produto não existe ou não está em estoque");
                    res.redirect("/pagamento");
                }else{
                    let count = verify.count[i]
                    console.log(count);
                    let val = product.valProd; 
                    soma += val * count;
                    console.log(soma);
                    console.log(product);
                    let estoque = product.qtdProd;
                    isEstoque = estoque - count;
                    console.log(isEstoque);
                }
                console.log(total + "total int");
                console.log(soma + "soma");
                if(soma == total){
                    console.log("iguais");
                }else{
                    console.log("diferentes");
                }
                if(product.qtdProd < isEstoque){
                    console.log("produto fora de estoque");
                }else{
                    Product.update({ qtdProd: isEstoque}, {where: {idProd: product.idProd} }).then().catch((error) => {console.log("Error.:" + error.message);})
                    console.log("produto em estoque");
                }
            }).catch((error) => {console.log("Erro.:" + error.message);}) 
        }
        */
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