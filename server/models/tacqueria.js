const mongoose = require('mongoose');

const TacqueriaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        required: true
    }
});

module.exports = Tacqueria = mongoose.model('tacqueria', TacqueriaSchema);
