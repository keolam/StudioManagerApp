import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/login', userData,
                {
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            );
            
            sessionStorage.setItem('user', JSON.stringify(res.data));
           
            setUserData({ ...userData, returnToList: true, name: res.data.name})
            /*const currentUser = localStorage.getItem('user');
            console.log(currentUser);*/

            props.history.push('/');
            window.location.reload();
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        
        <div className="create-edit-form" data-aos="fade-in" data-aos-delay="500">
            <h1>User Log In</h1>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                    <label >Email:</label>
                    <input type="email" className="form-control" name="email" value={userData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"  className="form-control" name="password" value={userData.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Log In" className="btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default Login;