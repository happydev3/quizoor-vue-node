const Level = require('../../model/Level');
const User = require('../../model/User');
const Subject = require('../../model/Subject')
const Category = require('../../model/Catetory');
const Chapter = require('../../model/Chapter');
const Quiz = require('../../model/Quiz');
const chalk = require('chalk');

exports.getCategory = async (req, res) => {
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
    Category.find({level: {$in: levelIds}}).populate('level').then((category) => {
        return res.status(200).json(category);
    })
    .catch(error => {
        return res.status(400).json(error);
    });
}       
exports.addCategory = (req, res) => {
    const name = req.body.name;
    const levelID = req.body.levelID;
    const userID = req.body.userID;
    console.log(chalk.green('this is name and location',name,levelID,userID));
    Category.findOne({name: name, level: levelID}).then((category) => {
        if(category) {
            return res.status(200).json({message: 'This category has already existed!'});
        } else {
            let category = new Category({
                name: name,
                level: levelID,
                user: userID
            });
            category.save();
            return res.status(200).json({message: "Successfully Added"});
        }
    })
    .catch(error => {
        return res.status(400).json({error: error});
    })
}

exports.removeCategory = async (req, res) => {
    try {
        const id = req.body.id;
        await Category.deleteOne({_id: id});
        await Subject.deleteMany({category: id});
        await Chapter.deleteMany({category: id});
        await Quiz.deleteMany({category: id});
        return res.status(200).json({message: 'The Item successfully deleted'});
    } catch(error) {
        return res.status(400).json({message: error});
    }
}

exports.changeStatusCatetory = (req, res) => {
    const id = req.body.id;
    const status = req.body.status;
    if (status == 'activated') {
        Category.findByIdAndUpdate(id, { status: 'deactivated'}).then(
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
        Category.findByIdAndUpdate(id, { status: 'activated'}).then(
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
exports.getCategoryById = (req, res) => {
    const id = req.params.id;
    Category.findOne({_id: id}).then(
        category => {
            if(category) {
                console.log(chalk.cyan(category))
                return res.status(200).json(category);
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
exports.editCategory = async (req, res) => {
    const id = req.body.categoryID;
    const name = req.body.name;
    const level = req.body.level;
    console.log(chalk.cyan(id, name, level));
    checkCategory = await Category.findOne({name: name, level: level});
    if(!checkCategory) {
        Category.findByIdAndUpdate(id, { name: name, level: level }).then(
            category => {
                return res.status(200).json({message: 'successfully updated'})
            }
        ).catch(
            error => {
                return res.status(201).json({message: error})
            }
        )
    } else {
        return res.status(201).json({message: 'This category has already existed!'})
    }
}

exports.multipleCategoryDelete = async (req, res) => {
    try {
        let list = req.body.list;
        await Category.deleteMany({_id: {$in: list }});
        await Subject.deleteMany({category: {$in: list }});
        await Chapter.deleteMany({category: {$in: list }});
        await Quiz.deleteMany({category: {$in: list }});
        return res.status(200).json({message: 'Items successfully deleted'});
    } catch (error){
        return res.status(400).json({message: error});
    }
}