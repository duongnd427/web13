const express = require("express");
const router = express.Router();
const fs = require("fs");
const QuestionModel = require("../models/questionModel.js");

let questionList = require("../question.json")



router.post("/add", (req, res) => {
    let newQuestion = {
        content: req.body.questionContent       
    };

    QuestionModel.create(newQuestion, function(err, questionCreated) {
        console.log(questionCreated);
        if(err) console.log(err)
        else res.redirect('/question/'+questionCreated._id);
    });
});

router.get("/:id", (req, res) => {
    QuestionModel.findById(req.params.id, function(err, questionFound) {
        if (!questionFound) console.error("not found:")
        else {
            res.render("question", {
                question: questionFound,
                totalVote: questionFound.yes + questionFound.no
            });
        };
    })
    // let question = questionList[req.params.id];
    // res.render("question", {
    //     question,
    //     totalVote: question.yes + question.no
    // });
});



module.exports = router;