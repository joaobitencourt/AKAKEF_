const express = require("express");
const router  = express.Router();
const multer = require("multer");

const Multer = multer ({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024,
});