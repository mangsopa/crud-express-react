const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
    res.json({ message: `Welcome to Dashboard, ${req.user.email}` });
});

module.exports = router;
