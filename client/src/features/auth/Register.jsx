// Registration component
// Handles new user registration for staff members only

//imports

import React, { useState } from 'react';
import logo from '../../assets/makeitalllogo.png';
import {register} from '../../services/auth.js';
import '../../styles/auth.css';


// we can get new svgs, i got these from a personal project - maciek
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>;
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
</svg>;
const EyeSlashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
</svg>;


export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        // FIX 1A: Initialize confirmPassword in state
        confirmPassword: '',
    });
    const [outcome, setOutcome] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // FIX 1B: Destructure confirmPassword from formData
        const {email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            // FIX 2A: Use consistent styling for the error message
            setOutcome(<span style={{ color: 'red' }}>Passwords don't match!</span>);
            return;
        }

        try {
            await register(email, password);
            setOutcome(<span style={{ color: 'green' }}>Successfully Registered. Now redirecting ...</span>);

            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
        } catch (err) {
            const errorMessage = err && err.message ? err.message : 'Registration failed.';
            // FIX 2B: Use consistent styling for the error message
            setOutcome(<span style={{ color: 'red' }}>{errorMessage}</span>);
        }
    };

    return (
        <div className="auth-page">
            {/*<Navbar /> we dont have a navbar rn but think it could add a lot*/}
            <div className="auth-background">
                <div className="register-container">
                    <header>
                        {/*<img src={logo} alt="MakeItAll Logo" className="register-logo" />*/}
                        <h1>Create Your Account</h1>
                        <p>Join MakeItAll, one place to handle all your tasks!</p>
                    </header>
                    <form onSubmit={handleSubmit} className="auth-form">

                        <div className="input-group">
                            <span className="input-icon"><EmailIcon /></span>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                            />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-group">
                            <span className="input-icon"><LockIcon /></span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                            />
                            <label htmlFor="password">Password</label>
                            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                                {/* FIX 3A: Standard UI - Show Eye if visible (showPassword is TRUE) */}
                                {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                            </button>
                        </div>

                        <div className="input-group">
                            <span className="input-icon"><LockIcon /></span>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                            />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label="Toggle confirm password visibility">
                                {/* FIX 3B: Standard UI - Show Eye if visible (showConfirmPassword is TRUE) */}
                                {showConfirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
                            </button>
                        </div>

                        <button type="submit" className="submit-button">Create Account</button>
                        {outcome && <p className="outcome">{outcome}</p>}
                    </form>
                    <div className="form-footer">
                        <p>Already have an account? <a href="/login">Log In</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};