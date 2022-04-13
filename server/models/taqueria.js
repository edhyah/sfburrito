const mongoose = require('mongoose');

const TaqueriaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        required: true
    }
});

module.exports = Taqueria = mongoose.model('taqueria', TaqueriaSchema);
