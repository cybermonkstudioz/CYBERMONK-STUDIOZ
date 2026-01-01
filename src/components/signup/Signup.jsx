import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { init, send } from '@emailjs/browser';
import { Link } from 'react-router-dom';

const SERVICE_ID = 'service_ddvryn8';
const TEMPLATE_ID = 'template_tjw8fqi';
const PUBLIC_KEY = 'yfXCm23iQXArKUeA8';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    init(PUBLIC_KEY);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!formData.name || !formData.email || !formData.password) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    setIsSubmitting(true);
    try {
      await send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: `Signup request:\nName: ${formData.name}\nEmail: ${formData.email}\nNote: Password not sent for security.`,
        },
        PUBLIC_KEY
      );
      setStatus({ type: 'success', message: 'Signup request sent! We will contact you soon.' });
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Signup send error:', error);
      setStatus({ type: 'error', message: 'Failed to send signup. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label>Full Name</label>
          </div>
          <div className="user-box">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>

          {status.message && (
            <p className={`status ${status.type}`}>{status.message}</p>
          )}

          <center>
            <button type="submit" className="cta" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Signup'}
              <span />
            </button>
          </center>

          <div className="switch-link">
            Already have an account? <Link to="/login">Login</Link>
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
  padding-top: 80px;

  .login-box {
    width: 400px;
    padding: 40px;
    background: rgba(24, 20, 20, 0.987);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
    border-radius: 10px;
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
    background: #03f40f;
    color: #fff;
    border-radius: 5px;
    box-shadow:
      0 0 5px #03f40f,
      0 0 25px #03f40f,
      0 0 50px #03f40f,
      0 0 100px #03f40f;
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
    background: linear-gradient(90deg, transparent, #03f40f);
    animation: btn-anim1 2s linear infinite;
  }

  .status {
    margin: 0 0 10px;
    font-size: 0.9rem;
  }

  .status.success {
    color: #03f40f;
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
    color: #03f40f;
    text-decoration: none;
  }
`;

export default Signup;
