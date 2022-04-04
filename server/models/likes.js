const mongoose = require('mongoose');

const LikesSchema = new mongoose.Schema({
    numLikes: {
        type: Number,
        required: true
    }
});

module.exports = Likes = mongoose.model('likes', LikesSchema);
