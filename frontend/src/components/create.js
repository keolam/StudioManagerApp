import React, { useState } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../componentCSS/create.css';
import styled from 'styled-components';

const CreateForm = styled.form`
    color: red;    
     text-align: center;
` ;

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
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/tasks', newTask)
            .then(res => console.log(res.data))
            .then(() => setValues(() => ({
                task_job: '',
                added_by: '',
                notes: '',
                task_status: 0,
                returnToList: true
            })
            )
            )
            .catch(error => console.log(error)
            )
    }

    if (newTask.returnToList === true) {
        return <Redirect to='/' />
    }
    return (
        <CreateForm>
            <div id="create-form">
                <p>Add new Task</p>
                <form onSubmit={onSubmit} id="submit-cells">
                    <div className="form-group">
                        <label>Task: </label>
                        <input type="text" className="form-control" value={newTask.task_job} onChange={onChangeTask} />
                    </div>
                    <div className="form-group">
                        <label>Added By: </label>
                        <input type="text" className="form-control" value={newTask.added_by} onChange={onChangeAddedBy} />
                    </div>
                    <div className="form-group">
                        <label>Details/Notes: </label>
                        <input type="text" className="form-control" value={newTask.notes} onChange={onChangeNotes} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Task" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </CreateForm>
    )
}

export default AddNewTask;