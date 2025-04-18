export const COGNITO_DOMAIN = "https://us-east-1od0fs3uux.auth.us-east-1.amazoncognito.com";
export const CLIENT_ID = "7jl1f1vdt300c1g7kt235g2ofn";
export const REDIRECT_URI = "https://wahoosplashtrack.com/"; // your actual domain
export const RESPONSE_TYPE = "code";
export const SCOPES = "email openid phone";
export const redirectToLogin = () => {
    const loginUrl = `${COGNITO_DOMAIN}/login?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPES)}`;
  
    window.location.href = loginUrl;
  };
  
  export const getCodeFromUrl = () => {
    return new URLSearchParams(window.location.search).get("code");
  };
  export function isLoggedIn() {
    return !!localStorage.getItem('id_token');
  }