const express = require("express");
const router = express.Router();
const paypal = require("paypal-rest-sdk");
const paypalConfig = require("../config/paypal.json");

paypal.configure(paypalConfig);

router.get("/pagemanto");