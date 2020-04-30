const Level = require('../../model/Level');
const User = require('../../model/User');
const Subject = require('../../model/Subject')
const Category = require('../../model/Catetory');
const Chapter = require('../../model/Chapter');
const Quiz = require('../../model/Quiz');
const chalk = require('chalk');


exports.getCategorybySelectedLevel = (req, res) => {
    let levelID = req.params.id;
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
    Subject.find({level: {$in: levelIds}}).populate('level').populate('category').then((subject) => {
        return res.status(200).json(subject);
    })
    .catch(error => {
        return res.status(400).json(error);
    });
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

exports.updateStatusSubject = (req, res) => {
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
exports.getSubjectById = async (req, res) => {
    try {
        const id = req.params.id;
        let subject = await Subject.findOne({_id: id});
        if(subject) {
            console.log(subject);
            return res.status(200).json(subject);
        } else {
            return res.status(404).json({message: 'Item does not exist'});
        }
    } catch (error) {
        return res.status(400).json(error);
    }
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

exports.multipleSubjectDelete = async (req, res) => {
    try {
        let list = req.body.list;
        await Subject.deleteMany({_id: {$in: list }});
        await Chapter.deleteMany({subject: {$in: list }});
        await Quiz.deleteMany({subject: {$in: list }});
        return res.status(200).json({message: 'Items successfully deleted'});
    } catch (error){
        return res.status(400).json({message: error});
    }
}