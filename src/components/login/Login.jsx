import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  const from = location.state?.from || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Placeholder login. Accept any credentials and mark as authenticated.
    login();
    navigate(from, { replace: true });
  };

  return (
    <StyledWrapper>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input type="text" name="username" required />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required />
            <label>Password</label>
          </div>
          {error && <p className="error">{error}</p>}
          <center>
            <button type="submit" className="cta">
              Login
              <span />
            </button>
          </center>
          <div className="switch-link">
            New here? <Link to="/signup">Create an account</Link>
          </div>
        </form>
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
  padding-top: 80px; /* leave room for fixed header */

  .login-box {
    width: 400px;
    padding: 40px;
    background: rgba(24, 20, 20, 0.987);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
    border-radius: 10px;
  }

  .login-box button.cta {
    all: unset;
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #ffffffff;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 4px;
    cursor: pointer;
    overflow: hidden;
    transition: 0.5s;
    margin-top: 20px;
  }

  .login-box button.cta:hover {
    background: #ffffffff;
    color: #fff;
    border-radius: 5px;
    box-shadow:
      0 0 5px #ffffffff,
      0 0 25px #ffffffff,
      0 0 50px #ffffffff,
      0 0 100px #ffffffff;
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

  .login-box form a {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #ffffff;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: 0.5s;
    margin-top: 20px;
    letter-spacing: 4px;
  }

  .login-box a:hover {
    background: #ffffffff;
    color: #ffffffff;
    border-radius: 5px;
    box-shadow:
      0 0 5px #ffffffff,
      0 0 25px #fafafaff,
      0 0 50px #fcfcfcfe,
      0 0 100px #fbfbfbff;
  }

  .login-box a span {
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

  .login-box a span:nth-child(1) {
    bottom: 2px;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03f40f);
    animation: btn-anim1 2s linear infinite;
  }

  .status.error {
    color: #ff6b6b;
  }

  .switch-link {
    margin-top: 20px;
    color: #bdb8b8;
    font-size: 0.9rem;
    text-align: center;
  }

  .switch-link a {
    color: #ffffffff;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .switch-link a:hover {
    color: #ffffff;
    text-decoration: underline;
  }

  .switch-link a:active {
    color: #ffffff;
    text-decoration: underline;
  }

  .switch-link a:visited {
    color: #ffffffff;
  }

  .switch-link a:focus {
    color: #ffffff;
    text-decoration: underline;
    outline: none;
  }
`;

export default Login;
