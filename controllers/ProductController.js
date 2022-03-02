const Product = require("../models/Product");
const { calcularPrecoPrazo } = require('correios-brasil');
const sequelize = require("sequelize");
const op = sequelize.Op;
/* const { QueryTypes } = require('@sequelize/core');
 */
module.exports = class ProductController{

    /* get one product */
    static async getOneProduct (req, res){
        const idProd = req.params.idProd;
        await Product.findOne({raw: true, where: {idProd:idProd} }).then((product) =>{
            Product.findAll({raw: true, where: {nameProd: product.nameProd, [op.and]: {colorProd: product.colorProd} },
                attributes: ['idProd', 'sizeProd'],
                status: {
                    [op.not]: false} }).then((data) =>{
                        console.log(data);
                        res.render("products/details", {product, data, layout: "main"});
                    }).catch((error) =>{
                        console.log("Erro.:" + error.message);
                    })
         }).catch((error) => {
            console.log("Erro.:" + error.message);
         });
    }
    /* get mail */    
    static async getCepPreco (req, res){
        const cep = req.body.cep;
            if(!cep){
                console.log("sem cep");
            }else{
                let args = {
                    //any value is valid dont wory with format
                    sCepOrigem: '81200100',
                    sCepDestino: cep,
                    nVlPeso: '1',
                    nCdFormato: '1',
                    nVlComprimento: '20',
                    nVlAltura: '20',
                    nVlLargura: '20',
                    nCdServico: ['04014'], //Array com os códigos de serviço
                    nVlDiametro: '0',
                };
              await calcularPrecoPrazo (args).then((response)  => {
                    console.log(response);
                    const idProd = req.params.idProd;
                    const valid = req.query.Valor
                    console.log(valid);
                    console.log(response.query.Valor);
                    res.redirect(`/product/details/${idProd}`);
                }).catch(error => console.log("Error.:"+error.message));
            }
        }
    
    /* Select * from admin */
    static async showProductsAll (req, res){
        const product = await Product.findAll({raw: true});
        try {
            res.render("products/all", {product, layout: "second"});
        } catch (error) {
            console.log(error);
        }
    }
    /* Create a Product */
    static async createProductSave (req,res){
        var errors = []
        const product = {
            nameProd: req.body.nameProd,
            valProd: req.body.valProd,
            sizeProd: req.body.sizeProd,
            wieghtProd: req.body.wieghtProd,
            qtdProd: req.body.qtdProd,
            typeProd: req.body.typeProd,
            colorProd: req.body.colorProd,
            descProd: req.body.descProd,
            imageProd: req.file.firebaseUrl,
        }
        if(!product.nameProd || typeof product.nameProd == undefined || product.nameProd == null){
            errors.push({texto: "Campo nome do produto vazio"});
        }
        if(!product.valProd || typeof product.valProd == undefined || product.valProd == null){
            errors.push({texto: "Campo valor do produto não pode ser vazio"});
        }
        if(!product.sizeProd || typeof product.sizeProd == undefined || product.sizeProd == null){
            errors.push({texto: "Campo tamnaho do produto não pode ser vazio"});
        }
        if(!product.wieghtProd || typeof product.wieghtProd == undefined || product.wieghtProd == null){
            errors.push({texto: "Campo peso não pode ser vazio"});
        }
        if(!product.qtdProd || typeof product.qtdProd == undefined || product.qtdProd == null){
            errors.push({texto: "Campo quantidade não pode ser vazio"});
        }
        if(!product.typeProd || typeof product.typeProd == undefined || product.typeProd == null){
            errors.push({texto: "Campo tipo do produto não pode ser vazio"});
        }
        if(!product.colorProd || typeof product.colorProd == undefined || product.colorProd == null){
            errors.push({texto: "Campo cor não pode ser  vazio"});
        }
        if(!product.descProd || typeof product.descProd == undefined || product.descProd == null){
            errors.push({texto: "Campo descrição não pode ser vazio"});
        }
        if(!product.imageProd || typeof product.imageProd == undefined || product.imageProd == null){
            errors.push({texto: "Campo imagem não pode ser vazio"});
        }
        if(errors.length > 0){
            res.render("products/create", { errors: errors, layout:"second"});
        }else{
            console.log(product);
            await Product.create(product).then(()=>{
                req.flash("success_msg", "Produto cadastrado com sucesso!");

                res.redirect("/admin/product/all");
            }).catch((error)=>{
                req.flash("error_msg", "Algumas coisa deu errado ao cadastrar o produto, Tente outra vez!");
                res.redirect("/admin/product/create");
                console.log("Error.: algo deu errado " + error.message);
            });
        }
    }

    /* Selecte * from */
    static async showProducts (req, res){
        const product = await Product.findAll( {raw : true} );
        try {
            res.render('products/cards', {product, layout: "main" });
            
        } catch (error) {
            console.log(error);
        }
    }

    static createProducts (req, res){
        res.render("products/create", {layout: "second"});
    }

}