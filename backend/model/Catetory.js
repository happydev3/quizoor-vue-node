const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'activated'
    },
    userID: {
        type: String,
        required: true
    },
    levelID: {
        type: String,
        required: true
    },
    create_date: { type:Date, default:Date.now }
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;