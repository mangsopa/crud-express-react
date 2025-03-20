const express = require("express");
const { register, login } = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

module.exports = router;
