const Task = require('../models/Task');

exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.name
        });
    }
}
    
exports.getTask = (req, res, next) => {
    let id = req.params.id;
    Task.findById(id, function(err, singleTask){
        res.json(singleTask);
    });
}

exports.addTask = async (req, res, next) => {
    try {
        const { task_job, added_by, notes, task_status } = req.body;
        const task = await Task.create(req.body);
        return res.status(201).json({
            success: true,
            data: task
        });
        
    } catch (err) {
        console.log(err); 
    }
}

exports.editTask = async (req, res, next) => {
    try {
        const singleTask = await Task.findById(req.params.id);

        if(!singleTask){
            res.status(404).send('Data not found');
        } 
        singleTask.task = req.body.task;
        singleTask.added_by = req.body.added_by
        singleTask.notes = req.body.notes;
        singleTask.task_status = req.body.task_status;

        await singleTask.save();

        return res.status(200).json({
            success: true,
            data: singleTask
        });
    } catch (err) {
        res.status(400).send("Unable to update");
    }     
}    

exports.deleteTask = async (req, res, next) => {
    console.log("aahhhhhhhhhhhhh");
    try {
        const singleTask = await Task.findById(req.params.id);
        if(!singleTask){
            return res.status(404).json({
                success: false,
                error: 'Item not found'
            });
        }
        await singleTask.remove();

        return res.status(200).json({
            success: true,
            data: {} 
        });
    }   catch (err) {
        return res.status(500).json({
            success: false,
            error: "Unable to delete"
        })  
    }
}