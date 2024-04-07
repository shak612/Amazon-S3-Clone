const express = require('express');
const userRoutes = require('./routes/userRoutes');
const { verifyToken } = require('./middlewares/verifyToken');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

//************************Morgan************************//
require('./utils/logReports/logger')(app);

//************************Database-Connection************************//
require('../configs/dbConnection')();

app.use(express.json());

app.use('/api', userRoutes);

app.listen(process.env.PORT, (err) => {
    if(!err){
        console.log(`Server is running on port ${process.env.PORT}`)
    }else{
        console.log("error:-", err)
    }
})
