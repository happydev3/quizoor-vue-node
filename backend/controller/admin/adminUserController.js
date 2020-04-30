const User = require('../../model/User');
const Level = require('../../model/Level');
const Subject = require('../../model/Subject');
const Category = require('../../model/Catetory');
const Chapter = require('../../model/Chapter');
const Quiz = require('../../model/Quiz');
const chalk = require('chalk');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAllUser = async (req, res) => {
    let id = req.params.id;
    let checkSuperAdmin = await User.findOne({_id: id});
    if(checkSuperAdmin.role == 'superadmin') {
        User.find({}).then(
            (user) => {
                if(user) {
                    return res.status(200).json(user);
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
    } else if(checkSuperAdmin.role == "admin") {
        User.find({role: {$in: ['author', 'user']}}).then(
            (user) => {
                if(user) {
                    return res.status(200).json(user);
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
}
exports.changeStatusUser = (req, res) => {
    const id = req.body.id;
    const status = req.body.status;
    if (status == 'activated') {
        User.findByIdAndUpdate(id, { status: 'deactivated'}).then(
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
        User.findByIdAndUpdate(id, { status: 'activated'}).then(
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

exports.removeUser = (req, res) => {
    const id = req.body.id;
    User.deleteOne({ _id: id}).then(
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

exports.multipleDeleteUser = (req, res) => {
    let list = req.body.list;
    console.log(chalk.cyan(list))
    User.deleteMany({_id: {$in: list }},
        function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
}

exports.getUserById = (req, res) => {
    const id = req.params.id;
    console.log(chalk.bgCyanBright(id));
    User.findOne({_id: id}).then(
        (user) => {
            console.log(chalk.green(user));
            return res.status(200).json(user);
        }
    ).catch((error) => {
        return res.status(404).json(error);
    })
}
exports.addUser = async (req, res) => {
    try {
        console.log(req.body.location);
        const checkUser = await User.findOne({ email: req.body.email });
        if (!checkUser) {
            let userdata = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                locations: req.body.location,
                role : req.body.role
            });
            let user = await userdata.save();
            const token = await userdata.generateAuthToken(); // here it is calling the method that we created in the model
            res.status(201).json({ message: 'Added successfully' });
        } else {
            return res.status(200).json({ message: "This email has already existed" });
        }
    } catch (err) {
        res.status(400).json({ err: err });
    }
};
exports.updateUser = async (req, res) => {
    let checkUser = await User.findOne({ _id: req.body.userID })
    if(checkUser) {
        checkUser.firstname = req.body.firstname;
        checkUser.lastname = req.body.lastname;
        checkUser.email = req.body.email;
        checkUser.role = req.body.role;
        checkUser.password = req.body.password;
        checkUser.locations = req.body.location;
        await checkUser.save();
        res.status(201).json({ message: 'Updated successfully' });
    } else {
        return res.status(201).json({ message: error });
    }
}