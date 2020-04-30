const Level = require('../../model/Level');
const User = require('../../model/User');
const Subject = require('../../model/Subject')
const Category = require('../../model/Catetory');
const Chapter = require('../../model/Chapter');
const Quiz = require('../../model/Quiz');
const chalk = require('chalk');


exports.getSubjectbySelectedCategory = (req, res) => {
    let CategoryID = req.params.id;
    Subject.find({ category: CategoryID, status: 'activated' }).populate('category').then((subject) => {
        return res.status(200).json(subject);
    })
    .catch(error => {
        return res.status(400).json(error);
    });
}

exports.getChapter = async (req, res) => {
    let id = req.params.id;
    let checkSuperAdmin = await User.findOne({_id: id});
    let tempLocale = [];
    checkSuperAdmin.locations.map(function(location){
        tempLocale.push(location.value);
    });
    let locale = tempLocale;
    let levels = await Level.find({location: {$in: locale}});
    let tempLevelIds = [];
    levels.map(function(level){
        tempLevelIds.push(level._id);
    });
    let levelIds = tempLevelIds;
    Chapter.find({level: {$in: levelIds}}).populate('level').populate('category').populate('subject').then((chapter) => {
        return res.status(200).json(chapter);
    })
    .catch(error => {
        return res.status(400).json(error);
    });
}  
exports.addChapter = (req, res) => {
    console.log(req.body)
    const name = req.body.name;
    const levelID = req.body.levelID;
    const userID = req.body.userID;
    const categoryID = req.body.categoryID;
    const subjectID = req.body.subjectID;
    const content = req.body.content;
    console.log(chalk.green('this is name and location',name, levelID, userID, categoryID, subjectID, content));
    Chapter.findOne({name: name, level: levelID, category: categoryID, subjectID: subjectID}).then((chapter) => {
        if(chapter) {
            return res.status(200).json({message: 'This Chapter has already existed!'});    
        } else {
            let chapter = new Chapter({
                name: name,
                level: levelID,
                user: userID,
                category: categoryID,
                subject: subjectID,
                content: content
            });
            chapter.save();
            return res.status(200).json({message: "Successfully Added"});
        }
    })
    .catch(error => {
        return res.status(400).json({error: error});
    })
}

exports.removeChapter = async (req, res) => {
    try {
        const id = req.body.id;
        await Chapter.deleteOne({_id: id});
        await Quiz.deleteMany({chapter: id});
        return res.status(200).json({message: 'The Item successfully deleted'});
    } catch(error) {
        return res.status(400).json({message: error});
    }
}

exports.removeSubject = async (req, res) => {
    try {
        const id = req.body.id;
        await Subject.deleteOne({_id: id});
        await Chapter.deleteMany({subject: id});
        await Quiz.deleteMany({subject: id});
        return res.status(200).json({message: 'The Item successfully deleted'});
    } catch(error) {
        return res.status(400).json({message: error});
    }
}

exports.updateStatusChapter = (req, res) => {
    const id = req.body.id;
    const status = req.body.status;
    if (status == 'activated') {
        Chapter.findByIdAndUpdate(id, { status: 'deactivated'}).then(
            res => {
                return res.status(200).json({message: 'Status changed successfully'})
            },
            error => {
                return res.status(400).json({message: error})
            }
        ).catch(
            error => {
                return res.status(400).json({message: error})
            }
        )
    } else if(status == 'deactivated') {
        Chapter.findByIdAndUpdate(id, { status: 'activated'}).then(
            res => {
                return res.status(200).json({message: 'Status changed successfully'})
            },
            error => {
                return res.status(400).json({message: error})
            }
        ).catch(
            error => {
                return res.status(400).json({message: error})
            }
        )
    }
}
exports.getChapterById = (req, res) => {
    const id = req.params.id;
    Chapter.findOne({_id: id}).then(
        chapter => {
            if(chapter) {
                console.log(chalk.cyan(chapter))
                return res.status(200).json(chapter);
            } else {
                return res.status(200).json('');
            }
        },
        error => {
            return res.status(201).json({message: error})
        }
    ).catch(
        error => {
            return res.status(201).json({message: error})
        }
    )
}

exports.editChapter = async (req, res) => {
    console.log(req.body);
    const id = req.body.chapterID;
    const name = req.body.name;
    const level = req.body.levelID;
    const category = req.body.categoryID;
    const subject = req.body.subjectID;
    const content = req.body.content
    console.log(id,name, level,category, content)
    let checkChapter = await Subject.findOne({ name:name, level:level, category:category, subject:subject});
    console.log(checkChapter)
    if (!checkChapter) {
        Chapter.findByIdAndUpdate(id, { name: name, level: level, category: category, subject: subject, content: content }).then(
            chapter => {
                return res.status(200).json({message: 'successfully updated'})
            }
        ).catch(
            error => {
                return res.status(201).json({message: error})
            }
        )
    } else {
        return res.status(201).json({message: 'This Subject has been already existed!'});
    }
}
exports.multipleChapterDelete = async (req, res) => {
    try {
        let list = req.body.list;
        await Chapter.deleteMany({_id: {$in: list }});
        await Quiz.deleteMany({chapter: {$in: list }});
        return res.status(200).json({message: 'Items successfully deleted'});
    } catch (error){
        return res.status(400).json({message: error});
    }
}