import React, { useState } from 'react'
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

  const topPerformers = [
    {
      id: 1,
      name: 'Trần Văn Bình',
      username: 'tranvanbinh4',
      avatar: null,
      points: 4850,
      rank: 1,
      level: 'Diamond',
      programsCompleted: 45,
      hoursVolunteered: 320,
      location: 'TP. Hồ Chí Minh',
      joinDate: '2023-06-15',
      achievements: ['Công dân toàn cầu', 'Lãnh đạo cộng đồng', 'Tình nguyện viên xuất sắc'],
      specialties: ['charity', 'education']
    },
    {
      id: 2,
      name: 'Lê Thị Cẩm',
      username: 'lethicam4',
      avatar: null,
      points: 4320,
      rank: 2,
      level: 'Platinum',
      programsCompleted: 38,
      hoursVolunteered: 285,
      location: 'Hà Nội',
      joinDate: '2023-08-20',
      achievements: ['Công dân toàn cầu', 'Tình nguyện viên tích cực'],
      specialties: ['environment', 'health']
    },
    {
      id: 3,
      name: 'Nguyễn Thị Anh',
      username: 'nguyenthianh4',
      avatar: null,
      points: 3840,
      rank: 3,
      level: 'Gold',
      programsCompleted: 32,
      hoursVolunteered: 240,
      location: 'Đà Nẵng',
      joinDate: '2024-01-15',
      achievements: ['Công dân toàn cầu'],
      specialties: ['education', 'charity']
    }
  ]

  const leaderboardData = [
    {
      id: 4,
      name: 'Phạm Văn Dũng',
      username: 'phamvandung4',
      avatar: null,
      points: 3560,
      rank: 4,
      level: 'Gold',
      programsCompleted: 28,
      hoursVolunteered: 210,
      location: 'Hải Phòng',
      joinDate: '2023-11-10',
      achievements: ['Tình nguyện viên tích cực'],
      specialties: ['environment']
    },
    {
      id: 5,
      name: 'Hoàng Thị Mai',
      username: 'hoangthimai4',
      avatar: null,
      points: 3240,
      rank: 5,
      level: 'Silver',
      programsCompleted: 25,
      hoursVolunteered: 180,
      location: 'Cần Thơ',
      joinDate: '2024-02-01',
      achievements: ['Người mới bắt đầu'],
      specialties: ['health', 'charity']
    },
    {
      id: 6,
      name: 'Vũ Hoàng Nam',
      username: 'vuhoangnam4',
      avatar: null,
      points: 2980,
      rank: 6,
      level: 'Silver',
      programsCompleted: 22,
      hoursVolunteered: 165,
      location: 'TP. Hồ Chí Minh',
      joinDate: '2023-12-05',
      achievements: ['Tình nguyện viên tích cực'],
      specialties: ['education']
    },
    {
      id: 7,
      name: 'Đỗ Thị Hương',
      username: 'đothihuong4',
      avatar: null,
      points: 2750,
      rank: 7,
      level: 'Silver',
      programsCompleted: 20,
      hoursVolunteered: 150,
      location: 'Hà Nội',
      joinDate: '2024-01-20',
      achievements: ['Người mới bắt đầu'],
      specialties: ['environment', 'health']
    },
    {
      id: 8,
      name: 'Lý Văn Tùng',
      username: 'lyvantung4',
      avatar: null,
      points: 2520,
      rank: 8,
      level: 'Bronze',
      programsCompleted: 18,
      hoursVolunteered: 135,
      location: 'Đà Nẵng',
      joinDate: '2024-02-15',
      achievements: ['Người mới bắt đầu'],
      specialties: ['charity']
    },
    {
      id: 9,
      name: 'Ngô Thị Lan',
      username: 'ngothilan4',
      avatar: null,
      points: 2310,
      rank: 9,
      level: 'Bronze',
      programsCompleted: 16,
      hoursVolunteered: 120,
      location: 'Hải Phòng',
      joinDate: '2024-01-10',
      achievements: ['Người mới bắt đầu'],
      specialties: ['education', 'environment']
    },
    {
      id: 10,
      name: 'Bùi Văn Hùng',
      username: 'buivanhung4',
      avatar: null,
      points: 2150,
      rank: 10,
      level: 'Bronze',
      programsCompleted: 15,
      hoursVolunteered: 110,
      location: 'Cần Thơ',
      joinDate: '2024-02-20',
      achievements: ['Người mới bắt đầu'],
      specialties: ['health']
    }
  ]

  const getLevelColor = (level) => {
    switch (level) {
      case 'Diamond': return 'from-purple-400 to-pink-400'
      case 'Platinum': return 'from-gray-400 to-blue-400'
      case 'Gold': return 'from-yellow-400 to-orange-400'
      case 'Silver': return 'from-gray-300 to-gray-400'
      case 'Bronze': return 'from-yellow-600 to-orange-600'
      default: return 'from-gray-200 to-gray-300'
    }
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2: return <Medal className="w-6 h-6 text-gray-400" />
      case 3: return <Medal className="w-6 h-6 text-yellow-600" />
      default: return <span className="text-lg font-bold text-gray-600">{rank}</span>
    }
  }

  const getSpecialtyIcon = (specialty) => {
    const category = categories.find(cat => cat.id === specialty)
    return category ? category.icon : Globe
  }

  const allUsers = [...topPerformers, ...leaderboardData]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bảng xếp hạng
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tuyên dương những công dân toàn cầu xuất sắc và khuyến khích cộng đồng tham gia
          </p>
        </motion.div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id}>{period.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lĩnh vực</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="w-full flex items-end">
              <button className="w-full px-4 py-2 rounded-full border-2 border-primary-600 text-primary-600 font-semibold bg-white shadow hover:bg-primary-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 transition whitespace-nowrap text-sm flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Lọc
              </button>
            </div>
          </div>
        </div>

        {/* Top 3 Performers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Top 3 Xuất sắc</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPerformers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`card p-6 text-center ${index === 0 ? 'ring-2 ring-yellow-400' : ''}`}
              >
                <div className="relative mb-4">
                  <AvatarWithFallback
                    src={user.avatar}
                    alt={user.name}
                    size={96}
                    className={`w-24 h-24 rounded-full mx-auto object-cover border-4 ${
                      index === 0 ? 'border-yellow-400' : 
                      index === 1 ? 'border-gray-400' : 'border-yellow-600'
                    }`}
                  />
                  <div className="absolute -top-2 -right-2">
                    {getRankIcon(user.rank)}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <span className="text-gray-900">{user.name}</span>
                </h3>
                <div className={`inline-block bg-gradient-to-r ${getLevelColor(user.level)} text-white px-3 py-1 rounded-full text-sm font-medium mb-3`}>
                  {user.level}
                </div>

                <div className="text-3xl font-bold text-gray-900 mb-2">{user.points.toLocaleString()}</div>
                <div className="text-sm text-gray-500 mb-4">điểm</div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900">{user.programsCompleted}</div>
                    <div className="text-gray-500">Chương trình</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{user.hoursVolunteered}</div>
                    <div className="text-gray-500">Giờ</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {user.specialties.map(specialty => {
                      const Icon = getSpecialtyIcon(specialty)
                      return (
                        <div key={specialty} className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <Icon className="w-3 h-3 text-gray-600" />
                        </div>
                      )
                    })}
                  </div>
                  <div className="text-xs text-gray-500">{user.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Bảng xếp hạng đầy đủ</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Xếp hạng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thành viên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Điểm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chương trình
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giờ tình nguyện
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thành tích
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboardData.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRankIcon(user.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <AvatarWithFallback
                          src={user.avatar}
                          alt={user.name}
                          size={40}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            <span className="text-gray-900">{user.name}</span>
                          </div>
                          <div className="text-sm text-gray-500">{user.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{user.points.toLocaleString()}</div>
                      <div className={`inline-block bg-gradient-to-r ${getLevelColor(user.level)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                        {user.level}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.programsCompleted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.hoursVolunteered}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {user.achievements.slice(0, 2).map((achievement, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                          >
                            {achievement}
                          </span>
                        ))}
                        {user.achievements.length > 2 && (
                          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                            +{user.achievements.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card p-6 text-center"
          >
            <Users className="w-8 h-8 text-primary-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 mb-1">{allUsers.length}</div>
            <div className="text-sm text-gray-500">Thành viên tham gia</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card p-6 text-center"
          >
            <Target className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {allUsers.reduce((sum, user) => sum + user.programsCompleted, 0)}
            </div>
            <div className="text-sm text-gray-500">Chương trình hoàn thành</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card p-6 text-center"
          >
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {allUsers.reduce((sum, user) => sum + user.hoursVolunteered, 0)}
            </div>
            <div className="text-sm text-gray-500">Giờ tình nguyện</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card p-6 text-center"
          >
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {allUsers.reduce((sum, user) => sum + user.points, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Điểm tổng cộng</div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard 