const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/users/register", UserController.register);
router.post("/users/register", UserController.registerSave);
router.get("/users/login", UserController.login);
router.post("/users/login", UserController.loginAuth);
router.get("/user/logout", UserController.logout);
module.exports = router;