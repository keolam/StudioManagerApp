import React, { useState } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {

    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = data;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/login', {email, password},
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            );
            console.log(`Token returned: ${res.data.token}`)
            /*localStorage.setItem('token', res.data.token);*/
        }
        catch(error) {
            console.log(error);
        }
    };

    return (
        
        <div className="create-edit-form" data-aos="fade-in" data-aos-delay="500">
            <h1>User Log In</h1>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                    <label >Email:</label>
                    <input type="email" className="form-control" name="email" value={email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"  className="form-control" name="password" value={password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Log In" className="btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default Login;