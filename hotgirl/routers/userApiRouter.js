const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt-nodejs');
const UserModel = require('../models/userModel');


//Get all: GET -> /api/users
userRouter.get("/", (req, res) => {
    UserModel.find({}, (err, users) => {
        if (err) res.status(500).send({ success: 0, err })
        else res.send({ success: 1, users });
    });
});

//Creat new
userRouter.post("/", (req, res) => {
    const { username, email, password, avatarUrl, name } = req.body;
    const salt = bcrypt.genSaltSync();
    const hashPassword = bcrypt.hashSync(password, salt);
    UserModel.create(
        { username, email, hashPassword, avatarUrl, name },
        (err, userCreated) => {
            if (err) res.status(500).send({ success: 0, err })
            else res.send({ success: 1, userCreated });
        });
});

// Update by id

userRouter.put('/:userId', async (req, res) => {
    const { name, email, password, avatarUrl } = req.body;
    const updateInfor = { name, password, email, avatarUrl }

    try {
        let userFound = await UserModel.findById(req.params.userId);
        if (!userFound) res.status(404).send({ success: 0, message: "User not exit" })
        else {
            for (let key in updateInfor) {
                if(key == 'password' && updateInfor[key]) {
                    let compare = bcrypt.compareSync(updateInfor.password, userFound.hashPassword);
                    if(!compare) {
                        userFound.hashPassword = bcrypt.hashSync(updateInfor.password, bcrypt.genSaltSync(15));
                    }
                } else if (updateInfor[key]) {
                    userFound[key] = updateInfor[key];
                }
            }
            const userUpdate = await userFound.save();
            res.send({ success: 1, userUpdate });
        }
    }
    catch (error) {
        res.status(500).send({ success: 0, error });
    }

// UserModel.findById(
//     req.params.userId,
//     (err, userFound) => {
//         if (err) res.status(500).send({ success: 0, err })
// if (!userFound) res.status(404).send({ success: 0, message: "User not exit" })
// else {
//     for (let key in userFound) {
//                 if (updateInfor[key]) {
//                     userFound[key] = updateInfor[key];
//                 }
//             }
//             userFound.save((err, userUpdate) => {
//                 if (err) res.status(404).send({ success: 0, err })
//                 else (res.send({ success: 1, userUpdate })
//                 );
//             })
//         }
//     });

    // .then(userFound => {
    //     if (!userFound) res.status(404).send({ success: 1, message: "User not exit" })
    //     else {
    //         for (let key in userFound) {
    //             if (updateInfor[key]) {
    //                 userFound[key] = updateInfor[key];
    //             }
    //         }
    //         return userFound.save();
    //     }
    // })
    // .then(userUpdate => res.send({ success: 1, userUpdate }))
    // .catch(error => res.status(500).send({ success: 0, error }));
});

//Delete by id
userRouter.delete('/:userId', (req, res) => {
    UserModel.findByIdAndRemove(req.params.userId, (err, userDeleted) => {
        if (err) res.send(500).send({ success: 0, err })
        if (!userDeleted) res.status(404).send({ success: 0, message: "User not exit" })
        else res.send({ success: 1, message: "Success!" });
    })
})

//Get one by id (param)
userRouter.get('/:userId', (req, res) => {
    UserModel.findById(req.params.userId, (err, userFound) => {
        if (err) res.status(500).send({ success: 0, err })
        else if (!userFound) res.status(404).send({ success: 1, message: "User not exit" })
        else res.send({ success: 1, message: "Success!" });
    })
});





module.exports = userRouter;