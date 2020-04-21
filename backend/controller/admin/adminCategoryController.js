const Level = require('../../model/Level');
const User = require('../../model/User');
const Category = require('../../model/Catetory');
const chalk = require('chalk');

exports.getCategory = (req, res) => {
    let locations = req.body.locations;
    Category.find({ location: {$in:locations}}).then((category) => {
        console.log(chalk.cyan(level))
        return res.status(200).json(level);
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
                levelID: levelID,
                userID: userID
            });
            category.save();
            return res.status(200).json({message: "Successfully Added"});
        }
    })
    .catch(error => {
        return res.status(400).json({error: error});
    })
}

// exports.removeLevel = (req, res) => {
//     const id = req.body.id;
//     Level.deleteOne({ _id: id}).then(
//         res => {
//             return res.status(200).json({message: 'The Item successfully deleted'})
//         },
//         err => {
//             return res.status(400).json({message: err})
//         }
//     ).catch(
//         error => {
//             return res.status(400).json({message: error})
//         }
//     )
// }

// exports.changeStatusLevel = (req, res) => {
//     console.log(chalk.cyan('adfasdfasdfasdfasdfasdfasfasdf',JSON.stringify(req.body)));
//     const id = req.body.id;
//     const status = req.body.status;
//     if (status == 'activated') {
//         Level.findByIdAndUpdate(id, { status: 'deactivated'}).then(
//             res => {
//                 return res.status(200).json({message: 'Status changed successfully'})
//             },
//             error => {
//                 return res.status(400).json({message: error})
//             }
//         ).catch(
//             error => {
//                 return res.status(400).json({message: error})
//             }
//         )
//     } else if(status == 'deactivated') {
//         Level.findByIdAndUpdate(id, { status: 'activated'}).then(
//             res => {
//                 return res.status(200).json({message: 'Status changed successfully'})
//             },
//             error => {
//                 return res.status(400).json({message: error})
//             }
//         ).catch(
//             error => {
//                 return res.status(400).json({message: error})
//             }
//         )
//     }
    
// }
// exports.getLevelById = (req, res) => {
//     const id = req.params.id;
//     Level.findOne({_id: id}).then(
//         level => {
//             if(level) {
//                 console.log(chalk.cyan(level))
//                 return res.status(200).json(level);
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
// exports.updateLevelById = (req, res) => {
//     const id = req.body.id;
//     const name = req.body.name;
//     console.log(chalk.cyan(id, name));
//     Level.findByIdAndUpdate(id, { name: name }).then(
//         res => {
//             return res.status(200).json({message:'successfully updated'})
//         }
//     ).catch(
//         error => {
//             return res.status(201).json({message: error})
//         }
//     )
// }
// exports.multipleDeleteLevel = (req, res) => {
//     let list = req.body.list;
//     console.log(chalk.cyan(list))
//     Level.deleteMany({_id: {$in: list }},
//         function(err, result) {
//             if (err) {
//                 res.send(err);
//             } else {
//                 res.send(result);
//             }
//         })
// }