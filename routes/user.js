const express = require("express");
const controller = require("../controller/user");
const router = express.Router();

router.get("/", controller.main);
router.get("/signup", controller.signup);
router.post("/signup", controller.CpostSignup);
router.get("/login", controller.login);
router.post("/login/enter", controller.CpostLogin);

module.exports = router;
