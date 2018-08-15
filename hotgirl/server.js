const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const apiRouter = require('./routers/apiRouter')

let app = express();

app.use(session({
    secret: 'vs',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 7*24*60*60*1000, httpOnly: false }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("hotgirl server");
});

app.use('/api', apiRouter);

mongoose.connect("mongodb://localhost/tk-hotgirl", (err) => {
    if(err) console.log(err)
    else console.log("DB connect success !");
});

const port = 4111;
app.listen(port, (err) => {
    if(err) console.error(err)
    else console.log(`Server is listening at ${port}`);
});