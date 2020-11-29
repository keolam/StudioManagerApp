import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../componentCSS/createEdit.css';

const EditTask = (props) => {

    const [taskEdit, setTaskEdit] = useState({
        task_job: '',
        added_by: '',
        notes: '',
        task_status: 0,
    })

    const fetchTask = async () => {
        try {
            const taskEdit = await axios.get('/api/tasks/' + props.match.params.id);
            
            setTaskEdit({
                task_job: taskEdit.data.task_job,
                added_by: taskEdit.data.added_by,
                notes: taskEdit.data.notes,
                task_status: taskEdit.data.task_status,
            })
        }
        catch (error) {
            console.log(error); 
        }
    } 
    
    useEffect(() => {

        fetchTask()
    }, [props.match]);

    const handleChange = (e) => {
        setTaskEdit({ ...taskEdit, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let editedTask = await axios.post('/api/tasks/' + props.match.params.id, taskEdit);
            setTaskEdit({...editedTask, returnToList: true});
            props.history.push('/');
            window.location.reload();

        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="create-edit-form" data-aos="fade-in" data-aos-delay="500">
            <h1 align="center">Update Task</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Task: </label>
                    <input type="text"
                        className="form-control"
                        name="task_job"
                        value={taskEdit.task_job}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Added By: </label>
                    <input type="text"
                        className="added-by"
                        name="added_by"
                        value={taskEdit.added_by}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Details/Notes: </label>
                    <input type="text"
                        className="text-area"
                        name="notes"
                        value={taskEdit.notes}
                        onChange={handleChange}
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