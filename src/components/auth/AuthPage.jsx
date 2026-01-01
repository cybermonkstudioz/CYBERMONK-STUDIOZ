import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const GOOGLE_CLIENT_ID = '456873291692-qsrig16l0tkjdf8jitll7n8gbde5gghq.apps.googleusercontent.com';

const AuthPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const navigate = useNavigate();
  const { login, signup, googleLogin, isAuthenticated } = useAuth();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const googleButtonLoginRef = useRef(null);
  const googleButtonSignupRef = useRef(null);
  const from = location.state?.from?.pathname || '/';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);

  // Handle Google Sign-In
  useEffect(() => {
    const handleGoogleSignIn = async (response) => {
      try {
        const payload = JSON.parse(
          atob(response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
        );
        
        const name = payload.name || payload.given_name || 'User';
        const email = payload.email;
        
        const result = await googleLogin({ name, email });
        
        if (result && result.success) {
          navigate(from, { replace: true });
        } else {
          setStatus({ 
            type: 'error', 
            message: result?.message || 'Google login failed. Please try again.' 
          });
        }
      } catch (err) {
        console.error('Google login error:', err);
        setStatus({ 
          type: 'error', 
          message: 'Failed to process Google login. Please try again.' 
        });
      }
    };

    // Function to initialize Google Sign-In
    const initGoogleSignIn = () => {
      if (!window.google?.accounts?.id) {
        console.error('Google accounts API not available');
        return false;
      }

      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleSignIn,
          auto_select: false,
          cancel_on_tap_outside: false
        });

        // Render the Google Sign-In button
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            width: '100%',
            text: 'continue_with',
            shape: 'rectangular',
            logo_alignment: 'left'
          }
        );
        
        return true;
      } catch (error) {
        console.error('Failed to initialize Google Sign-In:', error);
        return false;
      }
    };

    // Load Google API script if not already loaded
    if (!window.google?.accounts) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setGoogleReady(true);
        setTimeout(() => initGoogleSignIn(), 100);
      };
      script.onerror = () => {
        setStatus({ 
          type: 'error', 
          message: 'Failed to load Google Sign-In. Please check your connection.' 
        });
      };
      document.body.appendChild(script);
    } else {
      // If Google API is already loaded, initialize directly
      setGoogleReady(true);
      initGoogleSignIn();
    }

    // Cleanup function
    return () => {
      // Cleanup if needed
    };
  }, [googleLogin, navigate, from]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    const result = login({ email: loginData.email, password: loginData.password });
    if (!result.success) {
      setStatus({ type: 'error', message: result.message || 'Login failed' });
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    
    if (!signupData.name || !signupData.email || !signupData.password) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await signup(signupData);
      if (!result.success) {
        setStatus({ type: 'error', message: result.message || 'Signup failed' });
      } else {
        setStatus({ type: 'success', message: 'Account created. Logging you in...' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setStatus({ type: 'error', message: 'Signup failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="auth-container">
        <div className="auth-tabs">
          <button 
            className={`tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
            type="button"
          >
            Login
          </button>
          <button
            className={`tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
            type="button"
          >
            Sign Up
          </button>
        </div>

        <div className="auth-forms">
          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
              </div>
              {status.message && <p className={`status ${status.type}`}>{status.message}</p>}
              <button type="submit" className="auth-button" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Login'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="auth-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={signupData.name}
                  onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                  required
                />
              </div>
              {status.message && <p className={`status ${status.type}`}>{status.message}</p>}
              <button type="submit" className="auth-button" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          )}
        </div>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <div className="social-auth">
          <div id="google-signin-button"></div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background: radial-gradient(circle at 20% 20%, rgba(0, 119, 255, 0.1), transparent 25%),
              radial-gradient(circle at 80% 30%, rgba(0, 119, 255, 0.1), transparent 25%),
              #0a0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  padding-top: 80px;

  .auth-container {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background: rgba(24, 20, 20, 0.987);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    color: #fff;
  }

  .auth-tabs {
    display: flex;
    margin-bottom: 2rem;
    border-bottom: 1px solid #333;
  }

  .tab {
    flex: 1;
    padding: 1rem;
    border: none;
    background: none;
    color: #888;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 2px solid transparent;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .tab:hover {
    color: #fff;
  }

  .tab.active {
    color: #0077ff;
    border-bottom-color: #0077ff;
    font-weight: 700;
  }

  .auth-forms {
    margin-bottom: 2rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group input {
    width: 100%;
    padding: 0.75rem;
    background: #2d2d2d;
    border: 1px solid #444;
    border-radius: 4px;
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .form-group input:focus {
    outline: none;
    border-color: #0077ff;
    box-shadow: 0 0 0 2px rgba(0, 119, 255, 0.25);
  }

  .form-group input:-webkit-autofill,
  .form-group input:-webkit-autofill:hover,
  .form-group input:-webkit-autofill:focus {
    -webkit-text-fill-color: #fff;
    -webkit-box-shadow: 0 0 0px 1000px #2d2d2d inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  .auth-button {
    width: 100%;
    padding: 0.75rem;
    background: #0077ff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .auth-button:hover:not(:disabled) {
    background: #0066dd;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 119, 255, 0.3);
  }

  .auth-button:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .auth-divider {
    position: relative;
    text-align: center;
    margin: 2rem 0;
    color: #666;
  }

  .auth-divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #333;
    z-index: 1;
  }

  .auth-divider span {
    position: relative;
    display: inline-block;
    padding: 0 1rem;
    background: rgba(24, 20, 20, 0.987);
    z-index: 2;
  }

  .social-auth {
    margin-top: 1.5rem;
  }

  #google-signin-button {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
    width: 100%;
    
    iframe {
      width: 100% !important;
      max-width: 300px;
      margin: 0 auto;
    }
  }

  .status {
    margin: -10px 0 15px;
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    text-align: center;
  }

  .status.success {
    background-color: rgba(0, 119, 255, 0.1);
    color: #0077ff;
    border: 1px solid rgba(0, 119, 255, 0.3);
  }

  .status.error {
    background-color: rgba(255, 71, 87, 0.1);
    color: #ff4757;
    border: 1px solid rgba(255, 71, 87, 0.3);
  }

  #google-login-btn,
  #google-signup-btn {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  
  iframe {
    margin: 0 auto;
  }
`;

export default AuthPage;
