const Level = require('../../model/Level');
const User = require('../../model/User');
const chalk = require('chalk');

exports.getLevel = (req, res) => {
    let id = req.params.id;
    Level.find({ userID: id}).then((level) => {
        if(level) {
            // console.log(chalk.cyan(level))
            return res.status(200).json(level);
        } else {
            return res.status(200).json('');
        }
    })
    .catch(error => {
        return res.status(400).json(error);
    });
}       
exports.addLevel = async (req, res) => {
    const name = req.body.name;
    const location = req.body.location;
    const userID = req.body.userID;
    console.log(chalk.green('this is name and location',name,location,userID));
    let checkLevel = await Level.findOne({name: name, location: location})
    console.log(checkLevel);
    if(checkLevel) {
        return res.status(201).json({message: 'This level has already existed!'});
    } else {
        if (name&&location&&userID) {
            let level = new Level({
                name: name,
                location: location,
                userID: userID
            });
            level.save();
            return res.status(200).json({message: 'Added successfully'});
        } else {
            return res.status(201).json({message: 'inValid error'});
        }
    }
}

exports.removeLevel = (req, res) => {
    const id = req.body.id;
    Level.deleteOne({ _id: id}).then(
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

exports.changeStatusLevel = (req, res) => {
    console.log(chalk.cyan('adfasdfasdfasdfasdfasdfasfasdf',JSON.stringify(req.body)));
    const id = req.body.id;
    const status = req.body.status;
    if (status == 'activated') {
        Level.findByIdAndUpdate(id, { status: 'deactivated'}).then(
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
        Level.findByIdAndUpdate(id, { status: 'activated'}).then(
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
exports.getLevelById = (req, res) => {
    const id = req.params.id;
    Level.findOne({_id: id}).then(
        level => {
            if(level) {
                console.log(chalk.cyan(level))
                return res.status(200).json(level);
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
exports.updateLevelById = async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    console.log(chalk.cyan(id, name));
    let checkLevel = await Level.findOne({name: name});
    if( !checkLevel ) {
        Level.findByIdAndUpdate(id, { name: name }).then(
            (level) => {    
                return res.status(200).json({message: 'successfully updated'})
            }
        ).catch(
            error => {
                return res.status(201).json({message: error})
            }
        )
    } else {
        return res.status(200).json({message:'This level has already existed!'})
    }
    
}
exports.multipleDeleteLevel = (req, res) => {
    let list = req.body.list;
    console.log(chalk.cyan(list))
    Level.deleteMany({_id: {$in: list }},
        function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
}