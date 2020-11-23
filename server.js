const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

//const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');
dotenv.config({ path: './config/config.env' });

connectDB();

const tasks = require('./routes/tasks');
const users = require('./routes/users');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasks);
app.use('/api/users', users);

// if(process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// }
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/public'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'public', 'index.html')));
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});