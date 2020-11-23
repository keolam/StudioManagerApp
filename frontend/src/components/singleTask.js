import React, { useState } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import '../componentCSS/singleTask.css';
import axios from 'axios';

const Task = (props) => {

    const [task_status, setTaskStatus] = useState(props.thang.task_status)

    const moveLeft = async (props) => {

        if (task_status > 0) {
            let obj = {
                ...props.thang,
                task_status: task_status - 1
            }
            try {
                await axios.post('/api/tasks/' + props.thang._id, obj);
                setTaskStatus(obj.task_status);
                console.log(`spread ${obj}`);
            }  
            catch(error) {
                console.log(error);
            }
            window.location.reload();  
        }
    }

    const moveRight = async (props) => {

        if (task_status < 2) {
            let obj = {
                ...props.thang,
                task_status: task_status + 1
            }
            try {
                await axios.post('/api/tasks/' + props.thang._id, obj); 
                setTaskStatus(obj.task_status);
                console.log(`spreaded ${obj}`);
            }
            catch(error) {
                console.log(error);
            } 
            window.location.reload();
        }      
    }

    const deleteTask = async (props) => {
 
        try {
            const task = await axios.delete('/api/tasks/' + props.thang._id);
            console.log(`${ task } Deleted`);
            setTaskStatus(props.thang.task_status);
        }
        catch(error) {
            console.log(error)
        }
        window.location.reload();
    }

    return (
        <div className="single-task">
            <Router>
            <div id="task-job">{props.thang.task_job}</div>
            <div id="notes">{props.thang.notes}</div>
            <div id="added-by"><font size="2">added by</font> {props.thang.added_by}</div>
            <div id="bottom">
                <div id="back-forward">
                    <div id="update-bar">
                        <button onClick={() => moveLeft(props)} id="left-button">
                            <span className="icon ion-md-skip-backward" id="left"></span>
                        </button>
                        <p className="btn-name">Update Status</p>
                        <button onClick={() => moveRight(props)} id="right-button">
                            <span className="icon ion-md-skip-forward" id="right"></span>
                        </button>
                    </div>
                </div>
                <div id="edit-delete">
                    <div id="lower-buttons">
                        <div id="btn-wrap">
                            <Link to={"/edit/" + props.thang._id}><button id="edit-btn">Edit</button></Link>
                        </div>
                        <button onClick={() => deleteTask(props)} id="delete-btn">Delete</button>
                    </div>
                </div>
            </div>
            </Router>
        </div>
    )
}

export default Task;
