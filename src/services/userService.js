import axios from 'axios';

export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token');
  const res = await axios.get('http://localhost:5001/api/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export async function gradeEssayWithAI({ essay, question }) {
  const res = await fetch('/api/program/ai/grade-essay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ essay, question })
  });
  if (!res.ok) throw new Error('Lỗi khi gọi AI chấm điểm');
  return await res.json();
} 