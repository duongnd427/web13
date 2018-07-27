const express = require('express');
const hbs = require('express-handlebars');
const questionList = require('./question.json');
const fs = require('fs');
const bodyParser = require('body-parser');
const questionRouter = require('./roưter/questionRouter');
const answerRouter = require('./roưter/answerRouter');
const askRouter = require('./roưter/askRouter');
const mongoose = require("mongoose");
const questionModel = require('./models/questionModel')
const apirouter = require('./roưter/apiRouter')

let app = express();

app.engine("handlebars", hbs({ defaultLayout: "main"}));

app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/question", questionRouter);
app.unlock("/api", apirouter);

app.use("/answer", answerRouter);

app.use("/ask", askRouter);

app.get("/", (req, res) => {
    questionModel.count({}, function(err, questionListLength) {
        let randomIndex = Math.floor(Math.random()*questionListLength);

        questionModel.findOne({}).skip(randomIndex).exec(function(err, questionRandom) {
            res.render("home", {
                question: questionRandom
            });
        });
    });


    // questionModel.find({}, function(err, question) {
    //     if(err) console.error(err)
    //     else {
    //         let questionRandom = questionList[Math.floor(Math.random()*questionList.length)];
    //         res.render("home", {
    //             question: questionRandom
    //         });
    //     }
    // })
    
});

// app.get("/ask", (req, res) => {
//     res.render("ask")
// });




// app.get("/answer/:id/:vote", (req, res) => {
//     questionList[req.params.id][req.params.vote] += 1;
//     fs.writeFileSync('./question.json', JSON.stringify(questionList));
//     res.redirect("/question/" + req.params.id);
// });

// app.get("/answer/:id/:vote", (req, res) => {
//         questionModel.findByIdAndUpdate(req.params.id, { $inc: { [req.params.vote]: 1}}, function(err) {
//             res.redirect("/question/" + req.params.id);
//         });
//     });
   

mongoose.connect("mongodb://localhost:27017/quyetde", { useNewUrlParser: true}, function(err) {
    if(err) console.log(err)
    else console.log("DB connected")
});


app.listen(4111, function(err) {
    if(err) console.error(err)
    else console.log("Server is listening at port: 4111");
});