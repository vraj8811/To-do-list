import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";


export default function Navbar(props) {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.setItem('alert', JSON.stringify({ type: 'success', msg: 'Logged out Successfully' }));
        window.location.href = '/login';
    }
    let location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            backgroundcolor:" #333",
            padding: "10px",
    color: "#fff",
    zindex: "100"
}}>
    <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={() => { window.location.href = "/" }}>{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/" onClick={() => { window.location.href = "/" }}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about" onClick={() => { window.location.href = "/about" }}>About</Link>
                </li>
            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                <Link className="btn btn-success mx-2" to="/login" role="button" onClick={() => { window.location.href = "/login" }}>Login</Link>
                <Link className="btn btn-danger" to="signup" role="button" onClick={() => { window.location.href = "/signup" }}>Signup</Link>
            </form> : <button onClick={handleLogout} className="btn btn-danger">Logout</button>}
        </div>
    </div>
        </nav >
    )
}
