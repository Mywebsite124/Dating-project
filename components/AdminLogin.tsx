
import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

const AdminLogin: React.FC = () => {
  const { setView } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Cardbig' && password === 'Cardbig123##') {
      setView('admin');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-stone-900 rounded-[2.5rem] p-10 border border-stone-800 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-900/40">
            <i className="fa-solid fa-lock text-3xl text-white"></i>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-stone-400">Secure Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-stone-400 text-sm font-bold mb-2 ml-4 uppercase tracking-widest">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-stone-800 border border-stone-700 text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label className="block text-stone-400 text-sm font-bold mb-2 ml-4 uppercase tracking-widest">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-stone-800 border border-stone-700 text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm py-3 px-4 rounded-xl text-center">
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-rose-600 text-white font-bold py-5 rounded-2xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-900/20 active:scale-95"
          >
            Enter Admin Panel
          </button>
        </form>

        <button 
          onClick={() => setView('home')}
          className="w-full mt-6 text-stone-500 hover:text-stone-300 text-sm font-medium transition-colors"
        >
          Back to Site
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
