import React from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import TaskList from "./components/taskList";
import AddNewTask from "./components/create";
import EditTask from "./components/edit";
import Login from "./components/login";
import Image from "../src/Data/imageDir";
import ScrollToTop from "../src/services/ScrollToTop";


const App = () => {
    return (
        <div>
            <div id="background">
                <img src={Image.studioA} id="background-image" alt="recording studio"/>            
            </div>
          
            <Router> 
            <ScrollToTop />
                <nav id="navbar" >
                    <Link to="/" ><img id="logo" src={ Image.hydeLogo } alt="recording studio" data-aos="fade-in" data-aos-delay="300"></img></Link>        
                </nav>
                <br/>
                <div className="container">                        
                    <Route path="/" exact component={TaskList} />          
                    <Route path="/edit/:id" component={EditTask} />
                    <Route path="/create" component={AddNewTask} />
                    <Route path="/login" component={Login} />
                </div>                          
            </Router>
          
        </div>
    );
}

export default App;
