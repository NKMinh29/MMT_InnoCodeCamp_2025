import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import AvatarWithFallback from '../components/AvatarWithFallback';

const PublicProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/user/${username}`)
      .then(res => {
        if (!res.ok) throw new Error('Không tìm thấy người dùng');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  if (loading) return <div className="text-center py-12">Đang tải hồ sơ...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <AvatarWithFallback
            src={user.avatar}
            alt={user.fullName || user.username}
            size={96}
            className="w-24 h-24 rounded-full mx-auto object-cover mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.fullName || user.username}</h1>
          <div className="text-gray-500 mb-4">@{user.username}</div>
          <div className="flex flex-col items-center gap-2 mb-6">
            {user.location && (
              <div className="flex items-center text-gray-600"><MapPin className="w-4 h-4 mr-2" />{user.location}</div>
            )}
            {user.dateOfBirth && (
              <div className="flex items-center text-gray-600"><Calendar className="w-4 h-4 mr-2" />Ngày sinh: {user.dateOfBirth}</div>
            )}
          </div>
          {user.education && (
            <div className="mb-2"><span className="font-semibold text-gray-700">Trình độ học vấn: </span><span className="text-gray-600">{user.education}</span></div>
          )}
          {user.interests && user.interests.length > 0 && (
            <div className="mb-2"><span className="font-semibold text-gray-700">Sở thích: </span><span className="text-gray-600">{user.interests.join(', ')}</span></div>
          )}
          {user.experience && (
            <div className="mb-2"><span className="font-semibold text-gray-700">Kinh nghiệm: </span><span className="text-gray-600">{user.experience}</span></div>
          )}
          {user.availability && (
            <div className="mb-2"><span className="font-semibold text-gray-700">Thời gian có thể tham gia: </span><span className="text-gray-600">{user.availability}</span></div>
          )}
          {user.motivation && (
            <div className="mb-2 w-full block overflow-x-auto"><span className="font-semibold text-gray-700">Động lực: </span><span className="text-gray-600 break-all whitespace-pre-line pr-2">{user.motivation}</span></div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PublicProfile; 
