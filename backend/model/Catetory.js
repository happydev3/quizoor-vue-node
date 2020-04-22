const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'activated'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    level: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Level'
    },
    create_date: { type:Date, default:Date.now }
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;