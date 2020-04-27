const Level = require('../../model/Level');
const User = require('../../model/User');
const Subject = require('../../model/Subject');
const Chapter = require('../../model/Chapter');
const Category = require('../../model/Catetory');
const chalk = require('chalk');


exports.getSubjectbySelectedCategory = (req, res) => {
    let CategoryID = req.params.id;
    console.log('requires CategoryID', CategoryID)
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
    if(checkSuperAdmin.role == 'superadmin') {
        Chapter.find({ }).populate('level').populate('category').populate('subject').then((chapter) => {
            return res.status(200).json(chapter);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
    } else if(checkSuperAdmin.role == 'admin') {
        Chapter.find({ user: id }).populate('level').populate('category').populate('subject').then((chapter) => {
            return res.status(200).json(chapter);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
    }
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

exports.removeChapter = (req, res) => {
    const id = req.body.id;
    Chapter.deleteOne({ _id: id}).then(
        res => {
            return res.status(200).json({message: 'The Item successfully deleted'})
        },
        err => {
            return res.status(400).json({message: err})
        }
    ).catch(
        error => {
            return res.status(400).json({message: error})
        }
    )
}

exports.updateStatusChapter = (req, res) => {
    console.log(chalk.cyan('++++++updatestatussubject++++',JSON.stringify(req.body)));
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
exports.multipleChapterDelete = (req, res) => {
    let list = req.body.list;
    console.log(chalk.cyan(list))
    Chapter.deleteMany({_id: {$in: list }},
        function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
}