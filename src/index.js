const express = require('express');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');
const { verifyToken } = require('./middlewares/verifyToken');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

//************************Morgan************************//
require('./utils/logReports/logger')(app);

//************************Database-Connection************************//
require('../configs/dbConnection')();

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/file', fileRoutes);

app.listen(process.env.PORT, (err) => {
    if(!err){
        console.log(`Server is running on port ${process.env.PORT}`)
    }else{
        console.log("error:-", err)
    }
})
