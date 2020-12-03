import React, { useState } from "react";
import axios from 'axios';
import '../componentCSS/createEdit.css';

const AddNewTask = (props) => {

    const [newTask, setValues] = useState({
        task_job: '',
        added_by: '',
        notes: '',
        task_status: 0,
    })

    const handleChange = (e) => {
        setValues({ ...newTask, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/tasks', newTask);

            setValues({
                task_job: '',
                added_by: '',
                notes: '',
                task_status: 0

            });
            props.history.push('/');
            window.location.reload();
        }
        catch(error) {
            console.log(error);
        }
    }

    return (

        <div className="create-edit-form" data-aos="fade-in" data-aos-delay="500">
            <h1>New Task</h1>
            <form onSubmit={onSubmit} id="submit-cells">
                <div className="form-group">
                    <label>Task:</label>
                    <input type="text" className="form-control" name="task_job" value={newTask.task_job} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Added By: </label>
                    <input type="text" className="added-by" name="added_by" value={newTask.added_by} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Details/Notes: </label>
                    <input type="textarea" className="text-area" name="notes" value={newTask.notes} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <input type="submit" value="Add Task" className="btn-primary" />
                </div>
            </form>
        </div>

    )
}

export default AddNewTask;