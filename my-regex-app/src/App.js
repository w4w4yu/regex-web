import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import zxcvbn from 'zxcvbn';
import './App.css';

function AuthenticationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: null
  });
  const [validEmail, setValidEmail] = useState(false); // State to track email validity

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setValidEmail(validateEmail(inputEmail)); // Update validEmail state
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const result = zxcvbn(e.target.value);
    setPasswordStrength({
      score: result.score,
      feedback: result.feedback.warning
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email and password strength 
    if (validEmail && validatePassword()) {
      // Hypothetical: Send data to your backend authentication system
      console.log('Form submitted with:', email, password);
    } 
  };

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const validatePassword = () => {
    // Adjust these rules based on your requirements
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
  };

  return (
    <div className="container">
      <header className="App-header"> {/* Header section */}
        <h1>Email Authentication</h1> {/* Header title */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              value={email} 
              onChange={handleEmailChange} 
              required 
            />
            {/* Display message for valid email */}
            <div style={{ height: '20px' }}>
              {validEmail && <span style={{ color: 'green' }}>✓</span>}
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group" style={{ position: 'relative', marginBottom: '15px' }}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              value={password} 
              onChange={handlePasswordChange} 
              required 
              style={{ height: '38px', width: '700px' }} // Set a fixed height for the password field

            />
            {/* Reserve space for the password strength indicator */}
            <span
              style={{
                position: 'absolute',
                opacity: 0,
                pointerEvents: 'none',
                top: '100%',
                left: 0,
                fontSize: '1em',
              }}
            >
              {passwordStrength.feedback}
            </span>
            {/* Display password strength feedback */}
            <div style={{ height: '1px' }}>
              {passwordStrength.feedback && (
                <span className={`text-${getStrengthClass(passwordStrength.score)}`}>
                  {passwordStrength.feedback}
                </span>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </header>
    </div>
  );
}

const getStrengthClass = (score) => {
  if (score <= 2) return 'danger';
  if (score === 3) return 'warning';
  return 'success'; 
}

export default AuthenticationForm;
