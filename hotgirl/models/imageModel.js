//owner - view - like - post date - comment - image url - description

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    imageUrl: { type: String, required: true, unique: true },
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, require: true },
        createdAt: { type: Date, default: new Date() }
    // },{
    //     timestamps: true
    }],    
    description: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
},{
    timestamps: true
});

module.exports = mongoose.model("Image", ImageSchema);