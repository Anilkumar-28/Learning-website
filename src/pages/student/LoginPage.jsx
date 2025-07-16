import React, { useState } from 'react';
import { useSignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const { signIn } = useSignIn();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signIn.create({ identifier: email }); 
      setMessage(`Magic link sent to ${email} for ${role} login.`);

      if (role === 'student') {
        navigate('/');
      } else {
        navigate('/educator');
      }

    } catch (err) {
      console.error(err);
      setMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className="bothlogin-container">
      <h2 className='Login-Title'>Login as:</h2>
      <div className="bothlogin-tabs">
        <button className={role === 'student' ? 'active' : ''} onClick={() => setRole('student')} > Student </button>
        <button className={role === 'educator' ? 'active' : ''}
          onClick={() => setRole('educator')} > Educator </button>
      </div>

      <div className="bothlogin-form">
        <h3>{role.charAt(0).toUpperCase() + role.slice(1)} Login</h3>
        <input type="email"
          placeholder={`${role.charAt(0).toUpperCase() + role.slice(1)} Email`}
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={handleLogin}> Login as {role} </button>
        {message && <p className="bothmessage">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
