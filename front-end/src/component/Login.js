import React, { useState } from 'react'
import './login.css'

const Login = (props) => {

    const [credentials, setCredentials] = useState({ username: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: credentials.username, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('alert', JSON.stringify({ type: 'success', msg: 'Logged in Successfully' }));
            window.location.href = '/';
            //props.showAlert("Logged in Successfully","Success")

        }
        else {
            props.showAlert("Invalid Details", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <body>
        <div className="mt-5">
            <h2 className="text-center mb-4" style={{color:"white"}}>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label" style={{color:"white"}}>Username</label>
                    <input type="text" className="form-control" value={credentials.username} onChange={onChange} id="username" name="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" style={{color:"white"}}>Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
        </body>

    )
}

export default Login
