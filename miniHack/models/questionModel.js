const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let QuestiionSchema = new Schema({
    name: { type: String, required: true},
    score: { type: Number, default: 0},
}, {
    timestamps: true
});

module.exports = mongoose.model("Question", QuestiionSchema);