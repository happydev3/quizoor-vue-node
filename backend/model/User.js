const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const chalk = require('chalk');
const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please Include your firstname"]
  },
  lastname: {
    type: String,
    required: [true, "Please Include your lastname"]
  },
  email: {
    type: String,
    required: [true, "Please Include your email"],
    validate: {
      isAsync: true,
      validator: function(value, isValid) {
          const self = this;
          return self.constructor.findOne({ email: value })
          .exec(function(err, user){
              if(err){
                  throw err;
              }
              else if(user) {
                  if(self.id === user.id) {  // if finding and saving then it's valid even for existing email

                      return isValid(true);
                  }

                  return isValid(false);  
              }
              else{
                  return isValid(true);
              }
          })
      },
      message:  'The email address is already taken!',
    }
  },
  password: {
    type: String,
    required: [true, "Please Include your password"]
  },
  locations: {
        type: Array,
        'default': { text: "English", value: "en" }
  },
  status: {
      type: String,
      default: "activated"
  },
  role: {
      type: String,
      default: "user"
  },
  create_date: { type:Date, default:Date.now },
  token: {
    type: String,
    required: false
  }
  // tokens: [
  //   {
  //     token: {
  //       type: String,
  //       required: true
  //     }
  //   }
  // ]
});

//this method will hash the password before saving the user model
userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//this method generates an auth token for the user
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ 
    _id: user._id, 
    firstname: user.firstname, 
    lastname: user.lastname, 
    email: user.email 
  }, "secret");
  // user.tokens = user.tokens.concat({ token });
  user.token = token;
  await user.save();
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;