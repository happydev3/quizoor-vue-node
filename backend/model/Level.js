const mongoose = require('mongoose');
// const User = require('./User');
const Schema = mongoose.Schema;
const levelSchema = Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'activated'
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    location: {
        type: String,
        required: true
    },
    create_date: { type:Date, default:Date.now }
});

const Level = mongoose.model("Level", levelSchema);
module.exports = Level;