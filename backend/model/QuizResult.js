const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuizResultSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    quiz: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Quiz'
    },
    totalMark: {
        type: Number,
        required: true
    },
    guessResult: {
        type: Number,
        required: true
    },
    create_date: { type:Date, default:Date.now }
});

const QuizResult = mongoose.model("QuizResult", QuizResultSchema);
module.exports = QuizResult;