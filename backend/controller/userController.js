const User = require("../model/User");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
exports.registerNewUser = async (req, res) => {
    try {
        const checkUser = await User.findOne({ email: req.body.email });
        if (!checkUser) {
            const userdata = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                location: req.body.location,
            });
            let user = await userdata.save();
            const token = await userdata.generateAuthToken(); // here it is calling the method that we created in the model
            res.status(201).json({ user, token });
        } else {
            return res
                .status(200)
                .json({ message: "This email has already existed" });
        }
    } catch (err) {
        console.log(chalk.cyan("___________________err___________________",JSON.stringify(err)));
        res.status(400).json({ err: err });
    }
};
exports.loginUser = (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (user.status == 'activated') {
            bcrypt.compare(req.body.password, user.password)
            .then(val => {
                if (val) {
                    user.generateAuthToken();
                    // const token = user.tokens.slice(-1)[0].token;
                    const token = user.token;
                    return res.status(201).json({ user, token });
                } else {
                    return res.status(400).json({ error: "Password is not matched" });
                }
            }).catch(err => {
                return res.status(400).json({error : "Api error"});
            });
        } else {
            return res.status(400).json({error: "This users has been blocked"});
        }
        }).catch((err) => {
            return res.status(400).json({error : "Email is not matched"});
        });
};
exports.getUserDetails = async (req, res) => {
    console.log(chalk.cyan('he is userdata',JSON.stringify(req.userData)));
    await res.json(req.userData);
};


exports.changeName = (req, res) => {
    console.log(req.body);
    let id = req.body.id;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    User.findByIdAndUpdate(id, {firstname:firstname, lastname:lastname}).then(
        user => {
            console.log(res);
            return res.status(200).json({message: 'Name changed successfully'});
        }
    ).catch(
        error => {
            return res.status(400).json({message: error});
        }
    )
}

exports.changePassword = async (req, res) => {
    let id = req.body.id;
    let newPassword = req.body.newPassword;
    let password = await bcrypt.hash(newPassword, 8);
    console.log(id, password);
    User.findByIdAndUpdate(id, {password:password}).then(
        user => {
            console.log(user);
            return res.status(200).json({message: 'Password changed successfully'});
        }
    ).catch (
        error => {
            return res.status(400).json({message: error});
        }
    )
}