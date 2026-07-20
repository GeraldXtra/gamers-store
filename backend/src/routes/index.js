// src/routes/index.js
const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "gamers-store API is running" });
});

module.exports = router;
