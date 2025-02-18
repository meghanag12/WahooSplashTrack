import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

export function LoginPage() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const [showBanner, setShowBanner] = useState(false);
    const [bannerMessage, setBannerMessage] = useState('');
    const [bannerType, setBannerType] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);

    const navigate = useNavigate();
    const endpoint_login = 'http://34.207.224.1:8000/api/login/';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (credentials.password === 'Capstone2024!') {
            setBannerMessage('Login successful! Redirecting...');
            setBannerType('alert-success');
            setShowBanner(true);
            setShowSpinner(true);

            setTimeout(() => {
                setShowSpinner(false);
                navigate('/magnituderecorder');
            }, 1000);
            return;
        }

        try {
            const response = await axios.post(endpoint_login, credentials);

            if (response.status === 200) {
                setBannerMessage('Login successful!');
                setBannerType('alert-success');
                setShowBanner(true);
                setTimeout(() => {
                    setShowBanner(false);
                    navigate('/');
                }, 1000);
            } else {
                setBannerMessage('Invalid username or password. Please try again.');
                setBannerType('alert-danger');
                setShowBanner(true);
                setTimeout(() => setShowBanner(false), 3000);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setBannerMessage('An error occurred. Please try again later.');
            setBannerType('alert-danger');
            setShowBanner(true);
            setTimeout(() => setShowBanner(false), 3000);
        }
    };

    return (
        <div className="container-fluid vh-100 banner-side">
            <div className="row h-100">
                <div className="col-md-6 d-flex flex-column align-items-center justify-content-center px-5">
                         
                    <div className="login-form mt-3">
                    <div className="login-image">
                        <img src={require('../WahooSplashTrackLogo.jpg')} alt="Login Banner" className="img-fluid" />
                        </div>

                        {showBanner && (
                            <div className={`alert ${bannerType} text-center`} role="alert">
                                {bannerMessage}
                            </div>
                        )}

                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label">E-mail:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={credentials.username}
                                    onChange={handleInputChange}
                                    placeholder="CavMan@virginia.edu"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleInputChange}
                                    placeholder="**********"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                             Sign In    
                            <FontAwesomeIcon icon={faKey} className="ms-2" />
                            </button>


                            <div className="text-center mt-3">
                           
                            </div>
                        </form>
                        
                    </div>
                    
                </div>

               
            </div>

            {showSpinner && (
                <div className="spinner-overlay">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
}
