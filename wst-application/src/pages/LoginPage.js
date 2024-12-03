import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../stylesheets/main_style.css';

export function LoginPage() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const [showBanner, setShowBanner] = useState(false);
    const [bannerMessage, setBannerMessage] = useState('');
    const [bannerType, setBannerType] = useState('');

    const endpoint_login = 'http://3.81.17.35:8000/api/login/';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(endpoint_login, credentials);

            if (response.status === 200) {
                setBannerMessage('Login successful!');
                setBannerType('success');
                setShowBanner(true);
                setTimeout(() => setShowBanner(false), 3000);
            } else {
                setBannerMessage('Invalid username or password. Please try again.');
                setBannerType('error');
                setShowBanner(true);
                setTimeout(() => setShowBanner(false), 3000);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setBannerMessage('An error occurred. Please try again later.');
            setBannerType('error');
            setShowBanner(true);
            setTimeout(() => setShowBanner(false), 3000);
        }
    };

    return (
        <>
            <h1>Login Page</h1>

            {showBanner && (
                <div className={`banner ${bannerType}`}>
                    {bannerMessage}
                </div>
            )}

            <div className="form_container">
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleInputChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit">Login</button>
                </form>
            </div>

        </>
    );
}
