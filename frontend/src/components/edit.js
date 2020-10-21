import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


const EditTask = (props) => {

    const [taskEdit, setTaskEdit] = useState({
        task_job: '',
        added_by: '',
        notes: '',
        task_status: 0,
        returnToList: false 
    })

    useEffect( () => {
        axios.get('http://localhost:4000/tasks/'+props.match.params.id)
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
        .catch(function(error) {
            console.log(error);
        })
    });

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
        
       
        axios.post('http://localhost:4000/tasks/'+props.match.params.id, taskEdit)
            .then(res => console.log(props.match.params.id + res.data))
            .then(() => setTaskEdit(() => ({
                ...taskEdit,
                returnToList: true,
                /*task_status: task_status*/
                })
            ))
            .catch(error => console.log(error)
        )
    }           

    if (taskEdit.returnToList === true){
        return <Redirect to='/' />
    }
    return (
        <div>
            <h3 align="center">Update Task</h3>
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
                            className="form-control"
                            value={taskEdit.added_by}
                            onChange={onChangeAddedBy}
                            />
                </div>
                <div className="form-group">
                    <label>Notes: </label>
                    <input type="text" 
                            className="form-control"
                            value={taskEdit.notes}
                            onChange={onChangeNotes}
                            />
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit Task" className="btn btn-primary"/>
                </div>
            </form>
        </div>       
    )
}

export default EditTask;

 /*const obj = {
            task_job: task_job,
            added_by: added_by,
            notes: notes,
            task_status: task_status,
            returnToList: false
        };
        console.log(obj);
        console.log(this.props.match.params.id);*/