const express = require('express');
const router = express.Router();

// const {sayHi} = require('../controllers/user');
//
// router.get('/', sayHi);
//  // (req, res)=>{
//  //  res.send("Hello again from node");
// // })

const { signup } = require('../controllers/user');
const { userSignupValidator } = require('../validator');

router.post("/signup", userSignupValidator, signup)
module.exports = router;
