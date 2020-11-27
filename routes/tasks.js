const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const { getTasks, getTask, addTask, editTask, deleteTask } = require('../controllers/tasks');

router
  .route('/')
  .get(getTasks)
  .post(addTask);

router
  .route('/:id')
  .get(getTask)
  .post(editTask)
  .delete(protect, deleteTask);

module.exports = router;



// taskRoutes.route('/').get(function(req, res) {
//         Task.find(function(err, tasks){
//             if(err){
//                 console.log(err);
//             } else {
//                 res.json(tasks)
//             }
//         })
//     })
    
//     taskRoutes.route('/:id').get(function(req, res) {
//         let id = req.params.id;
//         Task.findById(id, function(err, singleTask){
//             res.json(singleTask);
//         });
//     });
    
//     taskRoutes.route('/add').post(function(req, res) {
//         let singleTask = new Task(req.body);
//         singleTask.save()
//             .then(singleTask => {
//                 res.status(200).json({'singleTask': 'task added successfully'})
//             })
//             .catch(err => {
//                 res.status(400).send("Unable to add new task");
//             })
//     });
    
//     taskRoutes.route('/update/:id').post(function(req, res){
//         Task.findById(req.params.id, function(err, singleTask) {
//             if(!singleTask){
//                 res.status(404).send('Data not found');
//             } else {
//                 singleTask.task = req.body.task;
//                 singleTask.added_by = req.body.added_by
//                 singleTask.notes = req.body.notes;
//                 singleTask.task_status = req.body.task_status;
    
//                 singleTask.save().then(singleTask => {
//                     res.json("Task updated!");
//                 })
//                 .catch(err => {
//                     res.status(400).send("Unable to update");
//                 });     
//             }    
//         });
//     });
    
//     taskRoutes.route('/delete/:id').get(function(req, res){
//         console.log("aahhhhhhhhhhhhh");
//         Task.findByIdAndRemove({_id: req.params.id}, function(err, singleTask) {
//             if(!singleTask){
//                 res.status(404).send('Item not found');
//             } else {
//                 res.json("Task Deleted!");
//             }
//         })
           
//             .catch(err => {
//             res.status(400).send("Unable to delete");
//         })  
//     })    