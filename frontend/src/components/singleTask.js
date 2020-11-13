import React, { useState } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import '../componentCSS/singleTask.css';
import axios from 'axios';

const Task = (props) => {
    const [task_status, setTaskStatus] = useState(props.thang.task_status)

    const moveLeft = (props) => {
        if (task_status > 0) {
            let obj = {
                task_job: props.thang.task_job,
                added_by: props.thang.added_by,
                notes: props.thang.notes,
                task_status: task_status - 1
            }
            axios.post('http://localhost:5000/tasks/' + props.thang._id, obj)
                .then(res => {
                    console.log("Moved Left " + res.data);
                    setTaskStatus(obj.task_status);
                    window.location.reload();
                })
                .catch(error => console.log(error));
        }
    }

    const moveRight = (props) => {
        if (task_status < 2) {
            let obj = {
                task_job: props.thang.task_job,
                added_by: props.thang.added_by,
                notes: props.thang.notes,
                task_status: props.thang.task_status + 1
            }
            console.log('move right');
            axios.post('http://localhost:5000/tasks/' + props.thang._id, obj)
                .then(res => {
                    console.log("Moved Right " + res.data);
                    setTaskStatus(obj.task_status);
                    window.location.reload();
                })
                .catch(error => console.log(error));
        }
    }

    const deleteTask = (props) => {
        console.log(props.thang._id);
        axios.delete('http://localhost:5000/tasks/' + props.thang._id)
            .then(res => {
                console.log('Deleted');
                setTaskStatus(props.thang.task_status);
                window.location.reload();
            })
            .catch(error => console.log(error));
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
