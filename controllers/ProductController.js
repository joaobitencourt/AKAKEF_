const Product = require("../models/Product");
const { calcularPrecoPrazo } = require('correios-brasil');

module.exports = class ProductController{

    /* get one product */
    static async getOneProduct (req, res){
        const idProd = req.params.idProd;
        const product = await Product.findOne({raw: true, where: {idProd:idProd} });
        try {
            res.render("products/details", {product, layout: "main"});
        } catch (error) {
            console.error(error);
        }
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
        await Product.create(product);

        try {
            res.render("products/create", {layout:"second"})
        } catch (error) {
            console.log(error)
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