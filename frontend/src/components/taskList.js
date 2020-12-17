import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Task from './singleTask';
import '../componentCSS/taskList.css';
import  verifyLogin from '../services/VerifyUser';
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
    const logout = () => {
        sessionStorage.removeItem("user");
    };

    useEffect(() => {
        try {
            async function fetchTasks() {
                const taskList = await axios.get('/api/tasks/');
                setTaskList(taskList.data.data);
                console.log('mounted ', taskList.data.data);
            }
            fetchTasks();
            
        }
        catch (error) {
            console.log(error);
        }
    }, [])

    let user = verifyLogin()
    console.log(`aaaaaand user is ${user}`)
    const [sessionUser, setSessionUser] = useState(user);
    
    useEffect(() => {
    
        setSessionUser( sessionUser );
    }, [/*sessionUser*/])

    return (
        <div>
            <div id="button-bar">
                <div id="new-task-button">
                    <Link to="/create">
                        <button type="button" className="create-button">
                            Add new Task
                        </button>
                    </Link>
                </div>
                <div className="log-in-out" style={{display: sessionUser.name === 'Intern' ? 'inline' : 'none'}}>
                    <Link to="/login">
                        <button type="button" className="create-button" >
                            LogIn
                        </button>
                    </Link>
                </div>
                <div className="log-in-out"style={{display: sessionUser.name === 'Intern' ? 'none' : 'inline'}}>
                    <button type="button" onClick={() => logout()} className="create-button" >
                    LogOut
                    </button>
                </div>
            </div>
            <div id="progress_box">

                <div className="columns" data-aos="fade-in" data-aos-delay="300">
                    <p className="col-title"> Inbox </p>
                    <div id="inbox">{inbox()}</div>
                </div>

                <div className="columns" data-aos="fade-in" data-aos-delay="500">
                    <p className="col-title"> In Progress </p>
                    <div id="in-progress">{inProgress()}</div>
                </div>

                <div className="columns" data-aos="fade-in" data-aos-delay="800">
                    <p className="col-title"> Completed </p>
                    <div id="complete">{complete()}</div>
                </div>

            </div>
        </div>
    )
}

export default TaskList;
