const express = require("express");
const router = express.Router();
const QuestionModel = require('../models/questionModel')

router.use(function(req, res, next) {
    console.log("Api Router:");
    next();
})

router.post('/addquestion', function(res, req) {
    let newQuestion = {
        content: req.body.questionContent       
    };

    QuestionModel.create(newQuestion, function(err, questionCreated) {
        console.log(questionCreated);
        if(err) res.status(500).send({ success: 0, errMsg: err })
        else res.status(201).send({ success: 1, id: questionCreated._id });
    });
})

module.exports = router;