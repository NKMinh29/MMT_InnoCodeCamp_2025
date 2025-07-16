import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const res = await axios.post('http://localhost:5001/api/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setMessage('Đăng nhập thành công!');
      setForm({ email: '', password: '' });
      setTimeout(() => {
        navigate('/');
      }, 700);
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 px-2">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-primary-700 mb-2">Đăng nhập</h2>
        {message && <div className="text-green-600 text-center font-medium bg-green-50 rounded py-2">{message}</div>}
        {error && <div className="text-red-600 text-center font-medium bg-red-50 rounded py-2">{error}</div>}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Mật khẩu</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-lg shadow transition-all duration-200"
          disabled={loading}
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
};

export default UserLogin; 