import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Medal, 
  Star, 
  Users, 
  Target, 
  Clock,
  Award,
  TrendingUp,
  Filter,
  Search,
  Calendar,
  MapPin,
  Heart,
  TreePine,
  GraduationCap,
  Stethoscope,
  Globe
} from 'lucide-react'
import DefaultAvatar from '../components/DefaultAvatar';
import AvatarWithFallback from '../components/AvatarWithFallback';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Lấy danh sách user từ localStorage, sắp xếp theo totalPoints giảm dần
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    usersData.sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
    setUsers(usersData);
  }, []);

  const periods = [
    { id: 'all', name: 'Tất cả thời gian' },
    { id: 'month', name: 'Tháng này' },
    { id: 'week', name: 'Tuần này' },
    { id: 'year', name: 'Năm 2024' }
  ]

  const categories = [
    { id: 'all', name: 'Tất cả', icon: Globe },
    { id: 'charity', name: 'Thiện nguyện', icon: Heart },
    { id: 'environment', name: 'Môi trường', icon: TreePine },
    { id: 'education', name: 'Giáo dục', icon: GraduationCap },
    { id: 'health', name: 'Y tế', icon: Stethoscope }
  ]

  // Hiển thị top 3
  const topPerformers = users.slice(0, 3);
  // Hiển thị các user còn lại
  const leaderboardData = users.slice(3);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Medal className="w-6 h-6 text-yellow-400" />
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-400" />
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Bảng xếp hạng</h1>
        {/* Top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {topPerformers.map((user, idx) => (
            <motion.div
              key={user.username}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-white rounded-xl shadow-lg p-6 flex flex-col items-center ${idx === 0 ? 'border-2 border-yellow-400' : ''}`}
            >
              <div className="mb-2">{getRankIcon(idx + 1)}</div>
              <AvatarWithFallback avatar={user.avatar} name={user.fullName || user.username} size={64} />
              <h2 className="mt-2 text-xl font-bold text-gray-900">{user.fullName || user.username}</h2>
              <div className="text-gray-500">{user.email}</div>
              <div className="mt-2 text-lg font-semibold text-yellow-600">{user.totalPoints || 0} điểm</div>
              <div className="text-sm text-gray-400">{user.level || ''}</div>
            </motion.div>
          ))}
        </div>
        {/* Bảng xếp hạng còn lại */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hạng</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tên</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Điểm</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Khóa học</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Giờ TN</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Chứng chỉ</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, idx) => (
                <tr key={user.username} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-bold">{idx + 4}</td>
                  <td className="px-4 py-2">{user.fullName || user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 text-yellow-700 font-semibold">{user.totalPoints || 0}</td>
                  <td className="px-4 py-2">{user.completedCourses || 0}</td>
                  <td className="px-4 py-2">{user.volunteerHours || 0}</td>
                  <td className="px-4 py-2">{user.certificates || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard 