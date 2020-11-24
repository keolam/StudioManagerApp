import React, { useState } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';

const Login = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = data;
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target});
    }

    return (
        
        <div className="create-edit-form" data-aos="fade-in" data-aos-delay="500">
            <h1>User Log In</h1>
            <form>
            <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" className="form-control" value={email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="form-control" name="password" value={password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Log In" className="btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default Login;