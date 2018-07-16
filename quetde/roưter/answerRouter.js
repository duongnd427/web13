const express = require("express");
const router = express.Router();
const fs = require("fs");
const QuestionModel = require("../models/questionModel.js");

let questionList = require("../question.json")

router.get("/:id/:vote", (req, res) => {
    questionList[req.params.id][req.params.vote] += 1;
    fs.writeFileSync('../question.json', JSON.stringify(questionList));
    res.redirect("/question/" + req.params.id);
});


module.exports = router;