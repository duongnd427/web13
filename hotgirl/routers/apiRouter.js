const express = require('express');
const apiRouter = express.Router();

const userRouter = require('./userApiRouter');
const imageRouter = require('./imageApiRouter');
const authRouter = require('./authRouter');

apiRouter.use("/", (req, res, next) => {
    console.log(req.session.user);
    next();
})

apiRouter.get("/", (req, res) => {
    res.send("hotgirl api");
});

apiRouter.use('/users', userRouter);
apiRouter.use('/images', imageRouter);
apiRouter.use('/auth', authRouter);


module.exports = apiRouter;