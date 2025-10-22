import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../../global/MyContext.jsx';

export default function LoginSignup() {
  const [mode, setMode] = useState('login');
  const [UserName, setUserName] = useState('');
  const [UserEmail, setUserEmail] = useState('');
  const [UserPassword, setUserPassword] = useState('');
  const { setIsAuthenticated } = useMyContext();
  const navigate = useNavigate();

  // Auto-redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      navigate('/');
    }
  }, [navigate, setIsAuthenticated]);

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setUserName('');
    setUserEmail('');
    setUserPassword('');
  };

  const handleSubmit = async () => {
    const url =
      mode === 'login'
        ? import.meta.env.VITE_API_AUTHURL + '/login'
        : import.meta.env.VITE_API_AUTHURL + '/signup';

    const payload =
      mode === 'login'
        ? {
            UserPassword,
            ...(UserEmail.includes('@')
              ? { UserEmail }
              : { UserName: UserEmail }),
          }
        : {
            UserName,
            UserEmail,
            UserPassword,
          };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (mode === 'signup') {
          alert('Signup successful! Please login.');
          toggleMode();
        } else {
          localStorage.setItem('authToken', data.authToken);
          setIsAuthenticated(true);
          navigate('/');
        }
      } else {
        alert(data.error || 'Operation failed');
      }
    } catch (err) {
      alert('Something went wrong');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </h2>

        {mode === 'signup' && (
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-2 border rounded"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
          />
        )}

        <input
          type={mode === 'login' ? 'text' : 'email'}
          placeholder={mode === 'login' ? 'Username or Email' : 'Email'}
          className="w-full mb-4 p-2 border rounded"
          value={UserEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={UserPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className={`w-full ${
            mode === 'login' ? 'bg-blue-600' : 'bg-green-600'
          } text-white p-2 rounded hover:opacity-90`}
        >
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </button>

        <p className="text-sm text-center mt-4">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={toggleMode} className="text-blue-600 underline ml-1">
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
