const express = require("express");
const router = express.Router();
const fs = require("fs");
const QuestionModel = require("../models/questionModel.js");

let questionList = require("../question.json")

router.get("/:id/:vote", (req, res) => {
    QuestionModel.findByIdAndUpdate(req.params.id, { $inc: { [req.params.vote]: 1}}, function(err) {
        res.redirect("/question/" + req.params.id);
    });
});


module.exports = router;