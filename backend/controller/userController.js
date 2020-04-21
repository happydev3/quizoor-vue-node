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
            console.log('reareareasrear',user.password, req.body.password);
            bcrypt.compare(req.body.password, user.password)
            .then(val => {
                console.log('reareareasrear',val);
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
