import axios from 'axios';

export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token');
  const res = await axios.get('http://localhost:5001/api/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}; 