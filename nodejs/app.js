const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");

let app = express();


app.engine("handlebars", hbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.get('/', function(req, res) {
    res.render("home", {
        number: Math.floor(Math.random()*99),
        htmlString: '<p style="color: red;"> HI</p>'
    });
});

app.get('/goku', function(req, res) {
    res.sendfile(__dirname + '/3701901461722841.jpg');
});

app.get('/html', function(req, res) {
res.sendfile(__dirname + '/ex1.html');
});

app.get('/crosspath', function(req, res) {
    res.sendFile(path.resolve(__dirname, "./css cont", "./ex1.html"));
});

app.get('/style', function(req, res) {
    res.sendfile(path.resolve(__dirname, "./style.css"));
});

app.use(express.static("nodejs"));



app.put

app.post

app.delete

app.listen(4211, function(err) {
    if(err) console.error(err)
    else console.log("Server is listening at port: 4211");
});