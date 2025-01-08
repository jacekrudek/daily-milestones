// src/components/Login.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div class="loginArea">
            <div class="registerArea">
                <p>Don't have an account?</p>
                <p>Not to worry! Join the dream-chasers <a onClick={handleRegisterRedirect}>here</a></p>
            </div>
            <form class="loginForm" onSubmit={handleSubmit}>
                <div class="emailArea">
                    <input
                        class="inputBox"
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div class="passwordArea">
                    <input
                        class="inputBox"
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button class="loginButton" type="submit">Login</button>
            </form>
            <div class="loginTextArea">
                <p class="line1">Time to pursue your</p>
                <p class="line2">goals!</p>
            </div>
        </div>
    );
}

export default Login;