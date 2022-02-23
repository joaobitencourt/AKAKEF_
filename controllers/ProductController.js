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