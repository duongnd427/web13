const express = require('express');
const userRouter = express.Router();

const UserModel = require('../models/userModel');


//Get all: GET -> /api/users
userRouter.get("/", (req, res) => {
    UserRouter.find({}, (err, users) => {
        if (err) res.status(500).send({ success: 0, err })
        else res.send({ success: 1, users });
    });
});

//Creat new
userRouter.post("/", (req, res) => {
    const { username, email, password, avatarUrl, name } = req.body;
    UserModel.create(
        { username, email, password, avatarUrl, name },
        (err, userCreated) => {
            if (err) res.status(500).send({ success: 0, err })
            else res.send({ success: 1, userCreated });
        });
});

// Update
userRouter.put('/:id', function(req, res) {
    const quote = new users({
      _id: req.params.id,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      avatarUrl: req.body.avatarUrl,
      name: req.body.name,
      updatedAt: Date.now(),
    });
    users.update(quote, function(err, raw) {
      if (err) {
        res.send(err);
      }
      res.send(raw);
    });
  });

//Get one by id (param)
userRouter.get("/:id", (req, res) => {
    UserRouter.find({}.select('id'), (err, usersone) => {
        if (err) res.status(500).send({ success: 0, err })
        else res.send({ success: 1, usersone });
    });
});

module.exports = userRouter;