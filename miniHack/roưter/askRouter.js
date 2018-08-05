const express = require("express");
const router = express.Router();
const fs = require("fs");
const QuestionModel = require("../models/questionModel.js");


router.get("/", (req, res) => {
    res.render("ask")
});

module.exports = router;