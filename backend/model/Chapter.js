const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ChapterSchema = Schema({
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
    subject: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Subject'
    },
    content : {
        type: Object,
        required: false
    },
    create_date: { type:Date, default:Date.now }
});

const Chapter = mongoose.model("Chapter", ChapterSchema);
module.exports = Chapter;