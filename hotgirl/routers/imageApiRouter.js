const express = require('express');
const imageRouter = express.Router();

const ImageModel = require('../models/imageModel');


//Get all: GET -> /api/users
imageRouter.get("/", (req, res) => {
    ImageModel.find({})
        .populate('/owner')
        .exec((err, images) => {
            if (err) res.status(500).send({ success: 0, err })
            else res.send({ success: 1, images });
        })
});

//Creat new
imageRouter.post("/", (req, res) => {
    const { imageUrl, description, owner } = req.body;
    ImageModel.create(
        { imageUrl, description, owner },
        (err, imgCreated) => {
            if (err) res.status(500).send({ success: 0, err })
            else res.send({ success: 1, imgCreated });
        });
});

// Update by id

imageRouter.put('/:imgId', async (req, res) => {
    const { view, description, owner, like, comments } = req.body;
    const updateInfor = { view, description, owner, like, comments }
    ImageModel.findById(
        req.params.imgId,
        (err, imgFound) => {
            if (err) res.status(500).send({ success: 0, err })
            if (!imgFound) res.status(404).send({ success: 0, message: "Img not exit" })
            else {
                for (let key in imgFound) {
                    if (updateInfor[key]) {
                        imgFound[key] = updateInfor[key];
                    }
                }
                imgFound.save((err, userUpdate) => {
                    if (err) res.status(404).send({ success: 0, err })
                    else (res.send({ success: 1, userUpdate })
                    );
                })
            }
        });

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
imageRouter.delete('/:imgId', (req, res) => {
    ImageModel.findByIdAndRemove(req.params.imgId, (err, imgDeleted) => {
        if (err) res.send(500).send({ success: 0, err })
        if (!imgDeleted) res.status(404).send({ success: 0, message: "Img not exit" })
        else res.send({ success: 1, message: "Success!" });
    })
})

//Get one by id (param)
imageRouter.get('/:imgId', (req, res) => {
    ImageModel.findById(req.params.imgId)
        .populate("owner")
        .populate("comments.user", "username avatarUrl name")
        .exec((err, imgFound) => {
            if (err) res.status(500).send({ success: 0, err })
            else if (!imgFound) res.status(404).send({ success: 1, message: "Img not exit" })
            else res.send({ success: 1, imgFound });
        });
});





module.exports = imageRouter;