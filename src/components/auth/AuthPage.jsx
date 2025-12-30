import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const GOOGLE_CLIENT_ID = '456873291692-qsrig16l0tkjdf8jitll7n8gbde5gghq.apps.googleusercontent.com';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, googleLogin } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const googleButtonLoginRef = useRef(null);
  const googleButtonSignupRef = useRef(null);

  const from = location.state?.from || '/';

  useEffect(() => {
    // Clear status when switching modes
    setStatus({ type: '', message: '' });
  }, [mode]);

  useEffect(() => {
    const scriptId = 'google-identity';
    if (document.getElementById(scriptId)) {
      setGoogleReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.id = scriptId;
    script.onload = () => {
      setGoogleReady(true);
      // Force re-render after script loads
      setTimeout(() => {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (response) => {
              try {
                const payload = JSON.parse(
                  atob(response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
                );
                const name = payload.name || payload.given_name || 'User';
                const email = payload.email;
                const result = googleLogin({ name, email });
                if (result.success) {
                  navigate(from, { replace: true });
                } else {
                  setStatus({ type: 'error', message: 'Google login failed.' });
                }
              } catch (err) {
                console.error('Google login parse error:', err);
                setStatus({ type: 'error', message: 'Google login failed.' });
              }
            },
          });
        }
      }, 100);
    };
    script.onerror = () => setStatus({ type: 'error', message: 'Failed to load Google login.' });
    document.body.appendChild(script);
  }, []);

  // Render buttons separately
  useEffect(() => {
    const renderButtons = () => {
      // Use getElementById as backup
      const loginBtn = document.getElementById('google-login-btn') || googleButtonLoginRef.current;
      const signupBtn = document.getElementById('google-signup-btn') || googleButtonSignupRef.current;
      
      if (loginBtn && window.google?.accounts?.id) {
        try {
          loginBtn.innerHTML = '';
          window.google.accounts.id.renderButton(loginBtn, {
            theme: 'outline',
            size: 'large',
            width: 320,
            text: 'continue_with',
          });
        } catch (e) {
          console.error('Login button render error:', e);
        }
      }
      
      if (signupBtn && window.google?.accounts?.id) {
        try {
          signupBtn.innerHTML = '';
          window.google.accounts.id.renderButton(signupBtn, {
            theme: 'outline',
            size: 'large',
            width: 320,
            text: 'continue_with',
          });
        } catch (e) {
          console.error('Signup button render error:', e);
        }
      }
    };

    // Check if Google is ready and render
    const checkAndRender = () => {
      if (window.google?.accounts?.id) {
        renderButtons();
      }
    };

    // Immediate render
    checkAndRender();
    
    // Continuous check every 500ms
    const interval = setInterval(checkAndRender, 500);
    
    return () => clearInterval(interval);
  }, [mode]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    const result = login({ email: loginData.email, password: loginData.password });
    if (result.success) {
      navigate(from, { replace: true });
    } else {
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
      const signupResult = signup(signupData);
      if (!signupResult.success) {
        setStatus({ type: 'error', message: signupResult.message || 'Signup failed' });
        setIsSubmitting(false);
        return;
      }

      setStatus({ type: 'success', message: 'Account created.' });
      setSignupData({ name: '', email: '', password: '' });
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Signup error:', error);
      setStatus({ type: 'error', message: 'Signup failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderLogin = () => (
    <form onSubmit={handleLoginSubmit}>
      <div className="user-box">
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          required
        />
        <label>Email</label>
      </div>
      <div className="user-box">
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          required
        />
        <label>Password</label>
      </div>
      {status.message && <p className={`status ${status.type}`}>{status.message}</p>}
      <center>
        <button type="submit" className="cta">
          Login
          <span />
        </button>
      </center>
      <div className="or-row">
        <span />
        <p>or</p>
        <span />
      </div>
      <div className="google-btn-login" ref={googleButtonLoginRef}>
        <div id="google-login-btn"></div>
      </div>
    </form>
  );

  const renderSignup = () => (
    <form onSubmit={handleSignupSubmit}>
      <div className="user-box">
        <input
          type="text"
          name="name"
          value={signupData.name}
          onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
          required
        />
        <label>Full Name</label>
      </div>
      <div className="user-box">
        <input
          type="email"
          name="email"
          value={signupData.email}
          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
          required
        />
        <label>Email</label>
      </div>
      <div className="user-box">
        <input
          type="password"
          name="password"
          value={signupData.password}
          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
          required
        />
        <label>Password</label>
      </div>

      {status.message && <p className={`status ${status.type}`}>{status.message}</p>}

      <center>
        <button type="submit" className="cta" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Signup'}
          <span />
        </button>
      </center>
      <div className="or-row">
        <span />
        <p>or</p>
        <span />
      </div>
      <div className="google-btn-signup" ref={googleButtonSignupRef}>
        <div id="google-signup-btn"></div>
      </div>
    </form>
  );

  return (
    <StyledWrapper>
      <div className="login-box">
        <div className="tabs">
          <button
            className={`tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => setMode('signup')}
          >
            Signup
          </button>
        </div>
        {mode === 'login' ? renderLogin() : renderSignup()}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background: radial-gradient(circle at 20% 20%, rgba(3, 244, 15, 0.08), transparent 25%),
              radial-gradient(circle at 80% 30%, rgba(3, 244, 15, 0.08), transparent 25%),
              #0a0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 80px;

  .login-box {
    width: 400px;
    padding: 40px;
    background: rgba(24, 20, 20, 0.987);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
    border-radius: 10px;
  }

  .tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 20px;
    gap: 8px;
  }

  .tab {
    padding: 10px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .tab.active {
    background: #ffffffff;
    color: #000;
    border-color: #ffffffff;
    font-weight: 700;
  }

  .login-box .user-box {
    position: relative;
  }

  .login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
  }

  .login-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: 0.5s;
  }

  .login-box .user-box input:focus ~ label,
  .login-box .user-box input:valid ~ label {
    top: -20px;
    left: 0;
    color: #bdb8b8;
    font-size: 12px;
  }

  .login-box .user-box input:-webkit-autofill,
  .login-box .user-box input:-webkit-autofill:hover,
  .login-box .user-box input:-webkit-autofill:focus {
    -webkit-text-fill-color: #fff;
    -webkit-box-shadow: 0 0 0px 1000px rgba(24, 20, 20, 0.987) inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  .login-box form a,
  .login-box button.cta {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #ffffff;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 4px;
    cursor: pointer;
    overflow: hidden;
    transition: 0.5s;
    margin-top: 20px;
  }

  .login-box button.cta {
    all: unset;
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #ffffff;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 4px;
    cursor: pointer;
    overflow: hidden;
    transition: 0.5s;
    margin-top: 20px;
  }

  .login-box button.cta:hover {
    background: linear-gradient(45deg, #00d4ff, #7b2ff7);
    color: #fff;
    border-radius: 5px;
    box-shadow:
      0 0 5px #00d4ff,
      0 0 25px #7b2ff7,
      0 0 50px #00d4ff,
      0 0 100px #7b2ff7;
  }

  .login-box button.cta span {
    position: absolute;
    display: block;
  }

  @keyframes btn-anim1 {
    0% {
      left: -100%;
    }

    50%,
    100% {
      left: 100%;
    }
  }

  .login-box button.cta span:nth-child(1) {
    bottom: 2px;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ffffffff);
    animation: btn-anim1 2s linear infinite;
  }

  .status {
    margin: -10px 0 10px;
    font-size: 0.9rem;
  }

  .status.success {
    color: #ffffffff;
  }

  .status.error {
    color: #ff6b6b;
  }

  .or-row {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 10px;
    margin: 20px 0;
    color: #bdb8b8;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .or-row span {
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    display: block;
  }

  .google-btn {
    display: flex;
    justify-content: center;
  }
`;

export default AuthPage;
