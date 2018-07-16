const express = require('express');
const hbs = require('express-handlebars');
const questionList = require('./question.json');
const fs = require('fs');
const bodyParser = require('body-parser');
const questionRouter = require('./roưter/questionRouter');
const answerRouter = require('./roưter/answerRouter');
const askRouter = require('./roưter/askRouter');
const mongoose = require("mongoose");

let app = express();

app.engine("handlebars", hbs({ defaultLayout: "main"}));

app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended: false}));

app.use("/question", questionRouter);

app.use("/answer", answerRouter);

app.use("/ask", askRouter);

app.get("/", (req, res) => {
    let questionRandom = questionList[Math.floor(Math.random()*questionList.length)];
    res.render("home", {
        question: questionRandom
    });
});

// app.get("/ask", (req, res) => {
//     res.render("ask")
// });




// app.get("/answer/:id/:vote", (req, res) => {
//     questionList[req.params.id][req.params.vote] += 1;
//     fs.writeFileSync('./question.json', JSON.stringify(questionList));
//     res.redirect("/question/" + req.params.id);
// });

mongoose.connect("mongodb://localhost:27017/quyetde", { useNewUrlParser: true}, function(err) {
    if(err) console.log(err)
    else console.log("DB connected")
})


app.listen(4111, function(err) {
    if(err) console.error(err)
    else console.log("Server is listening at port: 4111");
});