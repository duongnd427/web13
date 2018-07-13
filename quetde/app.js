const express = require('express');
const hbs = require('express-handlebars');
const questionList = require('./question.json');
const fs = require('fs');
const bodyParser = require('body-parser');

let app = express();

app.engine("handlebars", hbs({ defaultLayout: "main"}));

app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    let questionRandom = questionList[Math.floor(Math.random()*questionList.length)];
    res.render("home", {
        question: questionRandom
    });
});

app.get("/ask", (req, res) => {
    res.render("ask")
});


app.post("/question/add", (req, res) => {
    let newQuestion = {
        content: req.body.questionContent,
        yes: 0, 
        no: 0, 
        id: questionList.length
    };
    questionList.push(newQuestion);
    fs.writeFileSync('./question.json', JSON.stringify(questionList));
    res.redirect('/question/' + newQuestion.id);
});

app.get("/question/:id", (req, res) => {
    
    let question = questionList[req.params.id];
    res.render("question", {
        question,
        totalVote: question.yes + question.no
    });
});

app.get("/answer/:id/:vote", (req, res) => {
    questionList[req.params.id][req.params.vote] += 1;
    fs.writeFileSync('./question.json', JSON.stringify(questionList));
    res.redirect("/question/" + req.params.id);
});


app.listen(4111, function(err) {
    if(err) console.error(err)
    else console.log("Server is listening at port: 4111");
});