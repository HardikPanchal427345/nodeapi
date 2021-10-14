const { validationResult, body, check } = require('express-validator');



exports.signupschema = [
    check('name', 'Name is Required').notEmpty(),
    check('email', 'Email must be between 3 to 32 caracters')
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        }),
        check('password', 'Password is Required').notEmpty(),
        check('password')
            .isLength({ min: 6 })
            .withMessage("Password musst contain atleast 6 number")
            .matches(/\d/)
            .withMessage("Password must contain number"),

];


//  schema as signupValidationSchema;