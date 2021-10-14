const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressjwt = require('express-jwt') 
require('dotenv').config();


exports.signup = (req, res) =>  {
    console.log("req-body", req.body);
    // res.json({ message: "signup signup from controller..."});
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }
        res.json({
            user

        })
    })
};



exports.signin = (req, res) => {

    const { email, password } = req.body;
    User.findOne({email},(err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User with that Email does not exist, Please signup"   
            });
        }
        
        // create method in user model

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password dont mmatch"
            })
        }

        // generate token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

        // const token =  jwt.sign({
        //     secret: user._id,
        //     algorithms: ['H256']
        // });
        res.cookie('t', token, {expire: new Date() + 9999})

        const {_id, name,email, role} = user

        return res.json({ token, user: {  _id, email, name, role  }});
    });


};

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({message: 'Signed Out Successfully...'});
};


exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});