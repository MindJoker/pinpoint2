import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/contexts/AuthContext';
import AppBackground from '../components/common/AppBackgroud';
import ThemeToggle from '../components/settings/ThemeToggle';
import { CircularProgress } from '@mui/material';
import { ThemeProvider } from '../components/contexts/ThemeContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    setLoading(true); // Show loading state
    const success = await login(username, password); // Await async login call
    setLoading(false); // Hide loading state

    if (success) {
      navigate('/admin'); // Redirect to a protected route on successful login
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <>
<ThemeProvider>
<AppBackground />
<div className="absolute top-0 right-0 p-4 cursor-pointer z-20">
  <ThemeToggle />
</div>
<div className="relative z-10 flex flex-col items-center justify-center h-screen text-gray-100">
  <h1 className="text-3xl mb-6" style={{ color: 'var(--text-color)' }}>Login</h1>
  <form
    onSubmit={handleLogin}
    className="w-80 bg-gray-700 p-6 rounded-md shadow-md"
    autoComplete="off"
  >
    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
    <div className="mb-4">
      <label htmlFor="username" className="block text-sm mb-2">
        Username
      </label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border border-gray-600 rounded-md text-slate-950"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="block text-sm mb-2">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border border-gray-600 rounded-md text-slate-950"
      />
    </div>
    <button
      type="submit"
      disabled={loading}
      className={`w-full p-2 rounded-md transition flex justify-center items-center`}
      style={{
        backgroundColor: loading ? 'var(--secondary-color)' : 'var(--primary-color)', // Use different colors based on loading state
        color: 'var(--text-color)',
      }}
    >
      {loading ? <CircularProgress   
      sx={{
            color: 'var(--primary-color)' }} 
      size={24}
      /> : "Login"}
    </button>
  </form>
</div>
</ThemeProvider>
    </>
  );
};

export default LoginPage;