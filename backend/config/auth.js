const jwt = require("jsonwebtoken");
const chalk = require('chalk');
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(chalk.red('Here is a auth panel',token));
    const decoded = jwt.verify(token, "secret");
    req.userData = decoded;
    // console.log(req.userData);
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Authentification Failed"
    });
  }
};