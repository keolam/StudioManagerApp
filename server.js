const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

//const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');
dotenv.config({ path: './config/config.env' });

connectDB();

const tasks = require('./routes/tasks');
const app = express();

app.use(cors());

app.use(express.json());
app.use('/tasks', tasks);

// if(process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// }

// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
  
//     app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
// }

const PORT = process.env.PORT || 4000;  

app.listen(PORT, function() {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});


// mongoose.connect('mongodb://127.0.0.1:27017/tasks', { useUnifiedTopology: true, useNewUrlParser: true });
// const connection = mongoose.connection;

// connection.once('open', function() {
//     console.log("MongoDB database connection established succesfully");
// })

// taskRoutes.route('/').get(function(req, res) {
//     Task.find(function(err, tasks){
//         if(err){
//             console.log(err);
//         } else {
//             res.json(tasks)
//         }
//     })
// })

// taskRoutes.route('/:id').get(function(req, res) {
//     let id = req.params.id;
//     Task.findById(id, function(err, singleTask){
//         res.json(singleTask);
//     });
// });

// taskRoutes.route('/add').post(function(req, res) {
//     let singleTask = new Task(req.body);
//     singleTask.save()
//         .then(singleTask => {
//             res.status(200).json({'singleTask': 'task added successfully'})
//         })
//         .catch(err => {
//             res.status(400).send("Unable to add new task");
//         })
// });

// taskRoutes.route('/update/:id').post(function(req, res){
//     Task.findById(req.params.id, function(err, singleTask) {
//         if(!singleTask){
//             res.status(404).send('Data not found');
//         } else {
//             singleTask.task = req.body.task;
//             singleTask.added_by = req.body.added_by
//             singleTask.notes = req.body.notes;
//             singleTask.task_status = req.body.task_status;

//             singleTask.save().then(singleTask => {
//                 res.json("Task updated!");
//             })
//             .catch(err => {
//                 res.status(400).send("Unable to update");
//             });     
//         }    
//     });
// });

// taskRoutes.route('/delete/:id').get(function(req, res){
//     console.log("aahhhhhhhhhhhhh");
//     Task.findByIdAndRemove({_id: req.params.id}, function(err, singleTask) {
//         if(!singleTask){
//             res.status(404).send('Item not found');
//         } else {
//             res.json("Task Deleted!");
//         }
//     })
       
//         .catch(err => {
//         res.status(400).send("Unable to delete");
//     })  
// })    
