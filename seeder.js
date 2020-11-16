const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const User = require('./models/User');

const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });
connectDB();

const importData = async () => {
    try {
        const createdUsers = await User.insertMany(users);

        /*const amdinUser = createdUsers[0]._id*/
        console.log("Data Imported");
        process.exit();

    } catch (error){
        console.error(error);
        process.exit(1);
    }
}

importData();

