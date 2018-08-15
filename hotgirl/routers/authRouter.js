const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const authRouter = express.Router();

const UserModel = require('../models/userModel');

authRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        res.status(400).send({ success: 0, message: 'Missing username or password !' });
    } else {
        UserModel.findOne({ username })
        .then(userFound => {
            if(!userFound) res.status(404).send({ success: 0, message: 'No such user !' });
            else {
                const compare = bcrypt.compareSync(password, userFound.hashPassword);
                if(compare) {                    
                    req.session.user = { username: userFound.username, name: userFound.name, userId: userFound.userId }
                    res.send({ success: 1, message: 'Success !'}); 
                }
                else res.status(401).send({ success: 0, message: 'Wrong password !' });
            }
        })
        .catch(error => res.status(500).send({ success: 0, error }));
    }
})

authRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) res.status(500).send({ success: 0, err});
        else res.send({ success: 1, message: 'Success !'});
    })
})

module.exports = authRouter;