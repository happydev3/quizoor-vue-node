const Level = require('../../model/Level');
const User = require('../../model/User');
const Subject = require('../../model/Subject');
const Chapter = require('../../model/Chapter');
const Category = require('../../model/Catetory');
const chalk = require('chalk');


exports.getSubjectbySelectedCategory = (req, res) => {
    let CategoryID = req.params.id;
    console.log('requires levelID', CategoryID)
    Subject.find({ category: CategoryID, status: 'activated' }).populate('category').then((subject) => {
        console.log('+++++++++++++++_____________________res______category_______________++++++++++++++++', chalk.cyan(subject))
        return res.status(200).json(subject);
    })
    .catch(error => {
        return res.status(400).json(error);
    });
}
exports.getChapter = (req, res) => {
    let id = req.params.id;
    console.log(chalk.greenBright('_______________res params id__________________________res______category______________________',id));
    Chapter.find({ user: id }).populate('level').populate('category').populate('subject').then((chapter) => {
        console.log('+++++++++++++++_____________________res______category_______________++++++++++++++++', chalk.cyan(chapter))
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
    console.log(chalk.green('this is name and location',name, levelID, userID, categoryID, subjectID));
    Chapter.findOne({name: name, level: levelID, category: categoryID, subjectID: subjectID}).then((chapter) => {
        if(chapter) {
            return res.status(200).json({message: 'This Chapter has already existed!'});
        } else {
            let chapter = new Chapter({
                name: name,
                level: levelID,
                user: userID,
                category: categoryID,
                subject: subjectID
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
// exports.getSubjectById = (req, res) => {
//     const id = req.params.id;
//     Subject.findOne({_id: id}).then(
//         subject => {
//             if(subject) {
//                 console.log(chalk.cyan(subject))
//                 return res.status(200).json(subject);
//             } else {
//                 return res.status(200).json('');
//             }
//         },
//         error => {
//             return res.status(201).json({message: error})
//         }
//     ).catch(
//         error => {
//             return res.status(201).json({message: error})
//         }
//     )
// }
// exports.editSubject = async (req, res) => {
//     console.log(req.body);
//     const id = req.body.subjectID;
//     const name = req.body.name;
//     const level = req.body.levelID;
//     const category = req.body.categoryID;
//     console.log(id,name, level,category)
//     let checkSubject = await Subject.findOne({ name: name, level: level, category: category});
//     console.log(checkSubject)
//     if (!checkSubject) {
//         Subject.findByIdAndUpdate(id, { name: name, level: level, category: category }).then(
//             subject => {
//                 return res.status(200).json({message: 'successfully updated'})
//             }
//         ).catch(
//             error => {
//                 return res.status(201).json({message: error})
//             }
//         )
//     } else {
//         return res.status(201).json({message: 'This Subject has been already existed!'});
//     }
// }
// exports.multipleSubjectDelete = (req, res) => {
//     let list = req.body.list;
//     console.log(chalk.cyan(list))
//     Subject.deleteMany({_id: {$in: list }},
//         function(err, result) {
//             if (err) {
//                 res.send(err);
//             } else {
//                 res.send(result);
//             }
//         })
// }