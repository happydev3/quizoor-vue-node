const Level = require('../../model/Level');
const User = require('../../model/User');
const Category = require('../../model/Catetory');
const chalk = require('chalk');

exports.getCategory = (req, res) => {
    let id = req.params.id;
    console.log(chalk.greenBright('_______________res params id__________________________res______category______________________',id));
    Category.find({ user: id }).populate('level').then((category) => {
        console.log('+++++++++++++++_____________________res______category_______________++++++++++++++++', chalk.cyan(category))
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
    Category.findOne({name: name, levelID: levelID}).then((category) => {
        if(category) {
            return res.status(200).json({message: 'This level has been already existed!'});
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

exports.removeCategory = (req, res) => {
    const id = req.body.id;
    Category.deleteOne({ _id: id}).then(
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

exports.changeStatusCatetory = (req, res) => {
    console.log(chalk.cyan('adfasdfasdfasdfasdfasdfasfasdf',JSON.stringify(req.body)));
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
exports.editCategory = (req, res) => {
    const id = req.body.categoryID;
    const name = req.body.name;
    const level = req.body.level;
    console.log(chalk.cyan(id, name, level));
    Category.findByIdAndUpdate(id, { name: name, level: level }).then(
        category => {
            return res.status(200).json({message: 'successfully updated'})
        },
        error => {
            return res.status(400).json({message: error})
        }
    ).catch(
        error => {
            return res.status(201).json({message: error})
        }
    )
}
exports.multipleCategoryDelete = (req, res) => {
    let list = req.body.list;
    console.log(chalk.cyan(list))
    Category.deleteMany({_id: {$in: list }},
        function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
}