const Level = require('../../model/Level');
const User = require('../../model/User');
const Subject = require('../../model/Subject')
const Category = require('../../model/Catetory');
const chalk = require('chalk');


exports.getCategorybySelectedLevel = (req, res) => {
    let levelID = req.params.id;
    console.log('requires levelID', levelID)
    Category.find({ level: levelID, status: 'activated' }).populate('level').then((category) => {
        return res.status(200).json(category);
    })
    .catch(error => {
        return res.status(400).json(error);
    });
}
exports.getSubject = async (req, res) => {
    let id = req.params.id;
    let checkSuperAdmin = await User.findOne({_id: id});
    if(checkSuperAdmin.role == 'superadmin') {
        Subject.find({ }).populate('level').populate('category').then((subject) => {
            return res.status(200).json(subject);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
    } else if(checkSuperAdmin == 'admin') {
        Subject.find({ user: id }).populate('level').populate('category').then((subject) => {
            return res.status(200).json(subject);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
    }
}       
exports.addSubject = (req, res) => {
    console.log(req.body)
    const name = req.body.name;
    const levelID = req.body.levelID;
    const userID = req.body.userID;
    const categoryID = req.body.categoryID;
    console.log(chalk.green('this is name and location',name, levelID, userID, categoryID));
    Subject.findOne({name: name, level: levelID, category: categoryID}).then((subject) => {
        if(subject) {
            return res.status(200).json({message: 'This Subject has already existed!'});
        } else {
            let subject = new Subject({
                name: name,
                level: levelID,
                user: userID,
                category: categoryID
            });
            subject.save();
            return res.status(200).json({message: "Successfully Added"});
        }
    })
    .catch(error => {
        return res.status(400).json({error: error});
    })
}

exports.removeSubject = (req, res) => {
    const id = req.body.id;
    Subject.deleteOne({ _id: id}).then(
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

exports.updateStatusSubject = (req, res) => {
    console.log(chalk.cyan('++++++updatestatussubject++++',JSON.stringify(req.body)));
    const id = req.body.id;
    const status = req.body.status;
    if (status == 'activated') {
        Subject.findByIdAndUpdate(id, { status: 'deactivated'}).then(
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
        Subject.findByIdAndUpdate(id, { status: 'activated'}).then(
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
exports.getSubjectById = (req, res) => {
    const id = req.params.id;
    Subject.findOne({_id: id}).then(
        subject => {
            if(subject) {
                console.log(chalk.cyan(subject))
                return res.status(200).json(subject);
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
exports.editSubject = async (req, res) => {
    console.log(req.body);
    const id = req.body.subjectID;
    const name = req.body.name;
    const level = req.body.levelID;
    const category = req.body.categoryID;
    console.log(id,name, level,category)
    let checkSubject = await Subject.findOne({ name: name, level: level, category: category});
    console.log(checkSubject)
    if (!checkSubject) {
        Subject.findByIdAndUpdate(id, { name: name, level: level, category: category }).then(
            subject => {
                return res.status(200).json({message: 'successfully updated'})
            }
        ).catch(
            error => {
                return res.status(201).json({message: error})
            }
        )
    } else {
        return res.status(201).json({message: 'This Subject has already existed!'});
    }
}
exports.multipleSubjectDelete = (req, res) => {
    let list = req.body.list;
    console.log(chalk.cyan(list))
    Subject.deleteMany({_id: {$in: list }},
        function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
}