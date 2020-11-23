import React, { useState } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../componentCSS/createEdit.css';

const AddNewTask = () => {

    const [newTask, setValues] = useState({
        task_job: '',
        added_by: '',
        notes: '',
        task_status: 0,
        returnToList: false
    })

    const onChangeTask = (e) => {
        setValues({ ...newTask, task_job: e.target.value });
    }
    const onChangeAddedBy = (e) => {
        setValues({ ...newTask, added_by: e.target.value });
    }
    const onChangeNotes = (e) => {
        setValues({ ...newTask, notes: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/tasks', newTask);

            setValues({
                task_job: '',
                added_by: '',
                notes: '',
                task_status: 0,
                returnToList: true
            })
        }
        catch(error) {
            console.log(error);
        }
    }

    if (newTask.returnToList === true) {
        return <Redirect to='/' />
    }

    return (

        <div className="create-edit-form">
            <h1>New Task</h1>
            <form onSubmit={onSubmit} id="submit-cells">
                <div className="form-group">
                    <label>Task:</label>
                    <input type="text" className="form-control" value={newTask.task_job} onChange={onChangeTask} />
                </div>
                <div className="form-group">
                    <label>Added By: </label>
                    <input type="text" className="added-by" value={newTask.added_by} onChange={onChangeAddedBy} />
                </div>
                <div className="form-group">
                    <label>Details/Notes: </label>
                    <input type="textarea" className="text-area" value={newTask.notes} onChange={onChangeNotes}/>
                </div>
                <div className="form-group">
                    <input type="submit" value="Add Task" className="btn-primary" />
                </div>
            </form>
        </div>

    )
}

export default AddNewTask;