const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');
const { verifyToken } = require('./middlewares/verifyToken');
const app = express();
dotenv.config();

//************************Morgan************************//
require('./utils/logReports/logger')(app);

//************************Database-Connection************************//
require('../configs/dbConnection')();
app.use(cors())
app.use(express.json());

app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/api/user', userRoutes);
app.use('/api/file', fileRoutes);

app.listen(process.env.PORT, (err) => {
    if(!err){
        console.log(`Server is running on port ${process.env.PORT}`)
    }else{
        console.log("error:-", err)
    }
})
