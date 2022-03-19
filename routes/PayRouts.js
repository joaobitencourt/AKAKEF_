const express = require("express");
const router = express.Router();
const PayController = require("../controllers/PayController");

router.get("/pagamento", PayController.pay);
router.post("/pagamento", PayController.buy);
router.get("/pagamento/sucesso", PayController.success);
router.get("/pagamento/cancel", PayController.cancel);

module.exports = router;