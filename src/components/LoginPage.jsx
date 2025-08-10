import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const apiUrl = process.env.REACT_APP_API_URL;

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${apiUrl}/admin-ak47/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed. Please try again.');
            }

            // --- LOGIN SUCCESSFUL ---
            // 1. Save the token to the browser's local storage.
            // This allows us to stay logged in even after refreshing the page.
            localStorage.setItem('admin_token', data.token);

            // 2. Redirect the user to the admin dashboard.
            navigate('/admin-ak47/dashboard');

        } 
        catch (err) {
            console.log(err.message);
            setError(err.message);
        } 
        finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page-container section-bg">
            <div className="login-form-wrapper">
                <div className="login-form-header">
                    <h1 id='heading'>Preyasi Mehndi Art</h1>
                    <h2 className="login-sub-title">Login</h2>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    {error && <p className="error-message">{error}</p>}

                    <div className="form-group text-center">
                        <button type="submit" className="btn-login" disabled={isLoading}>
                            {isLoading ? 'Logging In...' : 'Log In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;