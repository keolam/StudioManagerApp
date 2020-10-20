const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
    task_job: {
        type: String,
        trim: true,
        required: [true, 'Describe task']
    }, 
    added_by: {
        type: String,
        trim: true,
        required: [true, 'Enter name']
    },
    notes: {
        type: String,
        trim: true
    },
    task_status: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}); 

module.exports = mongoose.model('Task', TaskSchema);