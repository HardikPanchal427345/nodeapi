const { validationResult, body, check } = require('express-validator');

exports.userSignupValidator = (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            // const  firstError = error.map( error => error.message)[0];
            return res.status(400).json({ error: errors.array() });
        }
        next();
}
