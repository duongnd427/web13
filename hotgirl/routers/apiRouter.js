const express = require('express');
const apiRouter = express.Router();

const userRouter = require('./userRouter');

apiRouter.use("/", (req, res, next) => {
    console.log("abc");
    next();
})

apiRouter.get("/", (req, res) => {
    res.send("hotgirl api");
});

apiRouter.use("/users", userRouter);


module.exports = apiRouter;