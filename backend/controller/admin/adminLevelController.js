const Level = require('../../model/Level');
const User = require('../../model/User');
const Subject = require('../../model/Subject')
const Category = require('../../model/Catetory');
const Chapter = require('../../model/Chapter');
const Quiz = require('../../model/Quiz');
const chalk = require('chalk');

exports.getLevel = async (req, res) => {
    const id = req.params.id;
    const checkSuperAdmin = await User.findOne({_id: id});
    let tempLocale = [];
    checkSuperAdmin.locations.map(function(location){
        tempLocale.push(location.value);
    });
    let locale = tempLocale;
    console.log(locale);
    Level.find({location: {$in: locale }}).then((level) => {
        if(level) {
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
    let checkLevel = await Level.findOne({name: name, location: location})
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

exports.removeLevel = async (req, res) => {
    try {
        const id = req.body.id;
        await Level.deleteOne({_id: id});
        await Category.deleteMany({level: id});
        await Subject.deleteMany({level: id});
        await Chapter.deleteMany({level: id});
        await Quiz.deleteMany({level: id});
        return res.status(200).json({message: 'The Item successfully deleted'});
    } catch(error) {
        return res.status(400).json({message: error});
    }
}

exports.changeStatusLevel = (req, res) => {
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
exports.multipleDeleteLevel = async (req, res) => {
    try {
        let list = req.body.list;
        await Level.deleteMany({_id: {$in: list }});
        await Category.deleteMany({level: {$in: list }});
        await Subject.deleteMany({level: {$in: list }});
        await Chapter.deleteMany({level: {$in: list }});
        await Quiz.deleteMany({level: {$in: list }});
        return res.status(200).json({message: 'Items successfully deleted'});
    } catch (error){
        return res.status(400).json({message: error});
    }
}