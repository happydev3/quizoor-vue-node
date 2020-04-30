const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuizSchema = Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'activated'
    },
    verification: {
        type: String,
        default: 'unchecked'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    difficulty: {
        type: String,
        required: true
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
    chapter: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Chapter'
    },
    questions: [
        {
            content: {
                type: Object
            },
            image: {
                type: Object
            },
            mark: {
                type: Number,
                default: 1
            },
            answers: [{
                content: { type: Object },
                value: { type: Boolean, default: false }
            }] 
        }
    ],
    create_date: { type:Date, default:Date.now }
});

const Quiz = mongoose.model("Quiz", QuizSchema);
module.exports = Quiz;