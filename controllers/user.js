const User = require("../models/user");
// exports.sayHi = (req, res) => {
//   res.json({
//     message: "Hello there"
//   });
// }
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req, res)=>{
  console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((err,user)=>{
    if(err){
      return res.status(400).json({
        error: errorHandler(err)
        // error: "boo"
      })
    }
    user.salt = undefined;
    user.hasged_password = undefined;

    res.json({
      user
    });
  });
};
