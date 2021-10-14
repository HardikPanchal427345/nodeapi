const express = require ("express");
const mongoose = require ("mongoose");
const morgan = require ("morgan");
const bodyParser = require ("body-parser");
const cookieParser = require ("cookie-parser");
// const {expressValidator} =  require("express-validator");


const userRoutes = require("./Routes/user");


require('dotenv').config();

const app = express()

mongoose.connect( process.env.MONGO_DB).then(() =>  {
    console.log('Database Connected Successfully...');
});


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser())
// app.use(expressValidator());
app.use( userRoutes);

const port = process.env.PORT || 8000


app.listen(port, () => {
    console.log(`Server is running on port :: ${port}`);
})