const express = require ("express");
const router = express.Router();
const {signup, signin, signout, requireSignin} = require('../Controllers/user');
// const { schema } = require("../vallidation-schema/signup");
// const { schema } = require("../models/user");
const { userSignupValidator } = require("../validator");
const { signupValidationSchema, signupschema } = require("../vallidation-schema/signup");

const { validationResult, body, check } = require('express-validator');


router.post('/signup', signupschema, userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.get('/dashboard',requireSignin, (req, res) => {
    res.send('Welcome To Dashboard');
})




module.exports = router;