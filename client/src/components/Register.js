// src/components/Register.js
import React, { useState } from 'react';
import '../styles/Register.scss'; // Import the SCSS file for styling

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="registerArea">
            <h1 className="registerText">Register</h1>
            <form className="registerForm" onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="inputContainer">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="registerButton">Register</button>
            </form>
        </div>
    );
}

export default Register;