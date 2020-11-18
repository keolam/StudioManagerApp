import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../componentCSS/createEdit.css';


const EditTask = (props) => {

    const [taskEdit, setTaskEdit] = useState({
        task_job: '',
        added_by: '',
        notes: '',
        task_status: 0,
        returnToList: false
    })

    useEffect(() => {
        axios.get('http://localhost:5000/tasks/' + props.match.params.id)
            .then(response => {
                setTaskEdit({
                    task_job: response.data.task_job,
                    added_by: response.data.added_by,
                    notes: response.data.notes,
                    task_status: response.data.task_status,
                    returnToList: false
                })
                console.log("Mounted!");
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [props.match]);

    const onChangeTask = (e) => {
        setTaskEdit({ ...taskEdit, task_job: e.target.value });
    }

    const onChangeAddedBy = (e) => {
        setTaskEdit({ ...taskEdit, added_by: e.target.value });
    }

    const onChangeNotes = (e) => {
        setTaskEdit({ ...taskEdit, notes: e.target.value });
    }
    const onSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/tasks/' + props.match.params.id, taskEdit)
            .then(res => console.log(props.match.params.id + res.data))
            .then(() => setTaskEdit(() => ({
                ...taskEdit,
                returnToList: true,
            })
            ))
            .catch(error => console.log(error)
            );
    }

    if (taskEdit.returnToList === true) {
        return <Redirect to='/' />
    }
    return (
        <div className="create-edit-form">
            <h1 align="center">Update Task</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Task: </label>
                    <input type="text"
                        className="form-control"
                        value={taskEdit.task_job}
                        onChange={onChangeTask}
                    />
                </div>
                <div className="form-group">
                    <label>Added By: </label>
                    <input type="text"
                        className="added-by"
                        value={taskEdit.added_by}
                        onChange={onChangeAddedBy}
                    />
                </div>
                <div className="form-group">
                    <label>Details/Notes: </label>
                    <input type="text"
                        className="text-area"
                        value={taskEdit.notes}
                        onChange={onChangeNotes}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit Task" className="btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default EditTask;