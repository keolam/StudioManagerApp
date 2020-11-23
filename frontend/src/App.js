import React from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import TaskList from "./components/taskList";
import AddNewTask from "./components/create";
import EditTask from "./components/edit";
import Image from "../src/Data/imageDir";


const App = () => {
    return (
        <div>
            <div id="background">
                <img src={Image.studioA} id="background-image" alt="recording studio"/>            
            </div>
          
            <Router> 
                <nav id="navbar" className="rellax" data-rellax-speed="-7">
                    <Link to="/" ><img id="logo" src={ Image.hydeLogo } alt="recording studio"></img></Link>        
                </nav>
                <br/>
                <div className="container">                        
                    <Route path="/" exact component={TaskList} />          
                    <Route path="/edit/:id" component={EditTask} />
                    <Route path="/create" component={AddNewTask} />
                </div>                          
            </Router>
          
        </div>
    );
}

export default App;
