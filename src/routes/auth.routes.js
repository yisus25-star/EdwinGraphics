const express = require("express");

const authController = require("../controllers/auth.controller");
const validateRequest = require("../middlewares/validateRequest");
const { reglasLogin } = require("../validators/auth.validator");

const router = express.Router();

router.post("/login", reglasLogin, validateRequest, authController.login);

module.exports = router;
