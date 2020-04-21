const mongoose = require('mongoose');

const levelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'activated'
    },
    userID: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    create_date: { type:Date, default:Date.now }
});

const Level = mongoose.model("Level", levelSchema);
module.exports = Level;