import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Task from './singleTask';
import '../componentCSS/taskList.css';
import axios from 'axios';

const TaskList = (props) => {
    const [taskList, setTaskList] = useState([]);

    const inbox = () => {
        let filteredRes = taskList.filter(tasksObj => tasksObj.task_status === 0);
        return filteredRes.map(function (currentTask, i) {
            return <Task thang={currentTask} key={i} />;
        })
    }
    const inProgress = () => {
        let filteredRes = taskList.filter(tasksObj => tasksObj.task_status === 1);
        return filteredRes.map(function (currentTask, i) {
            return <Task thang={currentTask} key={i} />;
        })
    }
    const complete = () => {
        let filteredRes = taskList.filter(taskObj => taskObj.task_status === 2);
        return filteredRes.map(function (currentTask, i) {
            return <Task thang={currentTask} key={i} />;
        })
    }

    useEffect(() => {
        axios.get('http://localhost:5000/tasks/')
            .then(response => {
                setTaskList(response.data.data);
                console.log('mounted ', response.data.data);
            })
            .catch(error => console.log(error));
    }, [])

    return (
        <div>

            <div id="new-task-button">
                <Link to="/create">
                    <button type="button" id="create-button">
                        Add new Task
                    </button>
                </Link>
            </div>
            <div id="progress_box">
                <div className="columns">
                    <p className="col-title"> Inbox </p>
                    <div id="inbox">{inbox()}</div>
                </div>

                <div className="columns">
                    <p className="col-title"> In Progress </p>
                    <div id="in-progress">{inProgress()}</div>
                </div>

                <div className="columns">
                    <p className="col-title"> Completed </p>
                    <div id="complete">{complete()}</div>
                </div>
            </div>
  
        </div>
    )
}

export default TaskList;
