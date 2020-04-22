const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubjectSchema = Schema({
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
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    create_date: { type:Date, default:Date.now }
});

const Subject = mongoose.model("Subject", SubjectSchema);
module.exports = Subject;