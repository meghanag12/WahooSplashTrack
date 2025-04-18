import React, { useEffect } from 'react';
import '../stylesheets/CognitoLogin.css';

const clientId = '726b5cstd5jcbkjrdgvh6bqe8q';
const domain = 'https://us-east-1u9fhjqomk.auth.us-east-1.amazoncognito.com';
const redirectUri = 'https://wahoosplashtrack.com/';
const tokenEndpoint = `${domain}/oauth2/token`;

// Helper functions
function base64URLEncode(str) {
  return btoa(String.fromCharCode(...new Uint8Array(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return base64URLEncode(hash);
}

async function generatePKCECodes() {
  const codeVerifier = [...Array(128)]
    .map(() => Math.random().toString(36)[2])
    .join('');
  const codeChallenge = await sha256(codeVerifier);
  return { codeVerifier, codeChallenge };
}

async function exchangeCodeForToken(code) {
  const codeVerifier = localStorage.getItem('pkce_verifier');

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', clientId);
  params.append('code', code);
  params.append('redirect_uri', redirectUri);
  params.append('code_verifier', codeVerifier);

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  const data = await response.json();
  console.log('Cognito tokens:', data);

  // Store tokens
  localStorage.setItem('id_token', data.id_token);
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);

  // Remove code param from URL
  window.history.replaceState({}, document.title, window.location.pathname);

  // Redirect to dashboard
  window.location.href = '/#/mag';
}

export default function CognitoLogin() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Exchanging the code and redirecting
      exchangeCodeForToken(code);
    }
  }, []);

  const startLogin = async () => {
    const { codeVerifier, codeChallenge } = await generatePKCECodes();
    localStorage.setItem('pkce_verifier', codeVerifier);

    const loginUrl = `${domain}/login?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&code_challenge_method=S256&code_challenge=${codeChallenge}&scope=openid+email+phone`;

    window.location.href = loginUrl;
  };

  return (
    <div className="cognito-login-container">
      <div className="cognito-banner-side" />
      <div className="cognito-login-form">
        <div className="cognito-login-box">
        <img src={require('../WahooSplashTrackLogoNoSignatures-removebg-preview.png')} alt="Logo" className="cognito-login-logo" />
          <h2 className="mb-3">Welcome to Wahoo SplashTrack!</h2>
          <p className="mb-4">Please log in to continue</p>
          <button
            onClick={startLogin}
            className="btn btn-primary px-4 py-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
