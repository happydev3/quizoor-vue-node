const chalk = require('chalk');
const User = require('../../model/User');
const Level = require('../../model/Level');
const Category = require('../../model/Catetory');
const Subject = require('../../model/Subject');
const Chapter = require('../../model/Chapter');
const Quiz = require('../../model/Quiz');

exports.getSearchValue = async (req, res) => {
    try {
        const location = req.params.id;
        const levels = await Level.find({location: location});
        console.log(levels);
        return res.status(200).json(levels);
    }
    catch(error){
        return res.status(404).json({message: error});
    }
}
exports.getSearchCategory = async (req,res) => {
    try {
        const levelID = req.params.id;
        const categories = await Category.find({level:levelID});
        console.log(categories);
        return res.status(200).json(categories)
    } catch(error){
        return res.status(400).json({message: error});
    }
}
exports.getSearchSubject = async (req, res) => {
    try {
        const categoryID = req.params.id;
        const subjects = await Subject.find({category:categoryID});
        console.log(subjects);
        return res.status(200).json(subjects);
    } catch(error) {
        return res.status(400).json({message:error})
    }
}

exports.getSubjects = async (req,res) => {
    try {
        const location = req.params.id;
        const levels = await Level.find({location:location});
        const tempLevelIds = [];
        levels.map(function(level){
            tempLevelIds.push(level._id);
        });
        const levelIDs = tempLevelIds;
        const subjectItems = await Subject.find({level:{$in:levelIDs}}).populate('level').populate('category');
        return res.status(200).json(subjectItems);
    } catch(error) {

    }
}

exports.getSearchTrakItems = async (req, res) => {
    try {
        const subjectId = req.params.id;
        const subjectInformation = await Subject.findOne({_id:subjectId}).populate('level').populate('category');
        const chapterItems = await Chapter.find({subject:subjectId}).populate('level').populate('category').populate('subject');
        console.log('chapterItems', chapterItems);
        if(chapterItems.length > 0) {
            const quizItems = await Quiz.find({chapter:chapterItems[0]._id}).populate('chapter');
            if(quizItems.length > 0) {
                let resData = {
                    subjectInformation: subjectInformation,
                    chapterItems: chapterItems,
                    quizItems: quizItems
                }
                return res.status(200).json(resData);
            } else if(quizItems == 0) {
                let resData = {
                    subjectInformation: subjectInformation,
                    chapterItems: chapterItems,
                    quizItems: []
                }
                return res.status(200).json(resData);
            }
        } else if(chapterItems.length == 0) {
            let resData = {
                subjectInformation: subjectInformation,
                chapterItems: [],
                quizItems: []
            }
            return res.status(200).json(resData);
        }
    } catch(error) {
        return res.status(404).json(error);
    }
}

exports.updateQuizItem = async(req, res) => {
    try {   
        const chapterId = req.params.id;
        const chapterItems = await Chapter.findOne({_id:chapterId});
        const quizItems = await Quiz.find({chapter: chapterId}).populate('chapter');
        let resData = {
            chapterItems: chapterItems,
            quizItems: quizItems
        }
        return res.status(200).json(resData);
    } catch(error) {
        return res.status(404).json(error);
    }
}

exports.getTestItem = async(req, res) => {
    try {
        const quizId = req.params.id;
        const getTestItems = await Quiz.findOne({_id: quizId});
        return res.status(200).json(getTestItems);
    } catch(error) {
        return res.status(404).json(error);
    }
}