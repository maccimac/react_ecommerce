const express = require('express');
const router = express.Router();

const { create }  = require('../controllers/category');
const { requireSignIn, isAuth, isAdmin }  = require('../controllers/auth')
const { userById }  = require('../controllers/user');

// router.post("/signup", userSignupValidator, signup);
// router.post("/signin", signin);
// router.get("/signout", signout);

router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, create)

router.param('userId', userById);

module.exports = router;