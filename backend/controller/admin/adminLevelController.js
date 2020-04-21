const Level = require('../../model/Level');
const User = require('../../model/User');
const chalk = require('chalk');

exports.getLevel = (req, res) => {
    let locations = req.body.locations;
    Level.find({ location: {$in:locations}}).then((level) => {
        if(level) {
            console.log(chalk.cyan(level))
            return res.status(200).json(level);
        } else {
            return res.status(200).json('');
        }
    })
    .catch(error => {
        return res.status(400).json(error);
    });
}       
exports.addLevel = (req, res) => {
    const name = req.body.name;
    const location = req.body.location;
    const userID = req.body.userID;
    console.log(chalk.green('this is name and location',name,location,userID));
    Level.findOne({name: name, location: location}).then((level) => {
        if(level) {
            return res.status(200).json({message: 'This level has been already existed!'});
        } else {
            let level = new Level({
                name: name,
                location: location,
                userID: userID
            });
            level.save();
            return res.status(200).json({level});
        }
    })
    .catch(error => {
        return res.status(400).json({error: error});
    })
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
exports.updateLevelById = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    console.log(chalk.cyan(id, name));
    Level.findByIdAndUpdate(id, { name: name }).then(
        res => {
            return res.status(200).json({message:'successfully updated'})
        }
    ).catch(
        error => {
            return res.status(201).json({message: error})
        }
    )
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