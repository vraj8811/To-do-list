import React, { useState } from 'react'
const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"",username: "", password: "",cpassword: ""})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,username,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name, username: credentials.username, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            //localStorage.setItem('token', json.authtoken);
            localStorage.setItem('alert', JSON.stringify({ type: 'success', msg: 'Account Created Successfully' }));
            window.location.href = '/login';
            //props.showAlert("Account Created Successfully","Success")

        }
        else {
            props.showAlert("Invalid Credentials","danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='mt-3'>
            <h2 style={{color:"white"}} className="text-center mb-4">Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label" style={{color:"white"}}>Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label" style={{color:"white"}}>Username</label>
                    <input type="text" className="form-control" value={credentials.username} onChange={onChange} id="username" name="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" style={{color:"white"}}>Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label" style={{color:"white"}}>Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup
