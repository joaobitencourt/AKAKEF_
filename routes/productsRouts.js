const express = require("express");
const router  = express.Router();
const {authIsTrueOrFalse, isOnlyAdmin} = require("../helpers/Accesses");
const multer = require("multer");
//configuração do multer 
const Multer = multer ({
    storage: multer.memoryStorage()
});
const ProductController = require("../controllers/ProductController");
const uploadFile = require("../models/ImageStorage");
/* const calcPrecoPrazo = require("../models/Mail"); */

router.get("/admin/product/all",  authIsTrueOrFalse, isOnlyAdmin, ProductController.showProductsAll);
//create um meio de campo entre a postagem e o controller
//nome do campo que pegaremos a imagem
router.post("/admin/product/create", authIsTrueOrFalse,  isOnlyAdmin, Multer.single("imageProd"), uploadFile, ProductController.createProductSave);
router.get("/admin/product/create", authIsTrueOrFalse, isOnlyAdmin, ProductController.createProducts);

router.get("/product/details/:idProd", authIsTrueOrFalse,  ProductController.getOneProduct);
router.post("/product/details/:idProd", authIsTrueOrFalse,  ProductController.getCepPreco);
router.get("/", ProductController.showProducts);

module.exports = router;
