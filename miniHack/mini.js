const express = require('express');
const hbs = require('express-handlebars');
const fs = require('fs');
const bodyParser = require('body-parser');
const askRouter = require('./roưter/askRouter');
const mongoose = require("mongoose");
const questionModel = require('./models/questionModel')
const apirouter = require('./roưter/apiRouter')




let app = express();

app.engine("handlebars", hbs({ defaultLayout: "main"}));

app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.unlock("/api", apirouter);



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
});

mongoose.connect("mongodb://localhost:27017/miniHack", { useNewUrlParser: true}, function(err) {
    if(err) console.log(err)
    else console.log("DB connected")
});

app.listen(8080, function(err) {
    if(err) console.error(err)
    else console.log("Server is listening at port: 8080");
});