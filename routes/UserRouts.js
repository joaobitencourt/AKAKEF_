const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const FuncController =  require("../controllers/FuncController");
const AdressController = require("../controllers/AdressController"); 
const {authIsTrueOrFalse, isOnlyAdmin} = require("../helpers/Accesses");

router.post("/users/adressRegister", AdressController.adressRegister);
router.get("/users/register", UserController.register);
router.post("/users/register", UserController.registerSave);
router.get("/users/login", UserController.login);
router.post("/users/login", UserController.loginAuth);
router.get("/user/logout", UserController.logout);
router.get("/admin/funcionario/register", FuncController.register);
router.post("/admin/funcionario/register", FuncController.registerSave);
router.get("/users", authIsTrueOrFalse, UserController.perfil);
module.exports = router;