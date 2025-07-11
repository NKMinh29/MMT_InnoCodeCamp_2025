import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Trophy, 
  Award,
  Star,
  Target,
  Users,
  Clock,
  Heart,
  TreePine,
  GraduationCap,
  Stethoscope,
  Globe,
  Edit,
  Download,
  Share2,
  TrendingUp,
  Activity
} from 'lucide-react'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock user data
  const user = {
    name: 'Nguyễn Thị Anh',
    email: 'anh.nguyen@email.com',
    phone: '0123456789',
    location: 'Hà Nội, Việt Nam',
    joinDate: '2024-01-15',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    level: 'Gold',
    totalPoints: 2840,
    rank: 15,
    programsCompleted: 23,
    hoursVolunteered: 156,
    certificates: 8
  }

  const stats = [
    { label: 'Điểm tổng cộng', value: user.totalPoints, icon: Trophy, color: 'text-yellow-600' },
    { label: 'Chương trình hoàn thành', value: user.programsCompleted, icon: Target, color: 'text-green-600' },
    { label: 'Giờ tình nguyện', value: user.hoursVolunteered, icon: Clock, color: 'text-blue-600' },
    { label: 'Chứng chỉ', value: user.certificates, icon: Award, color: 'text-purple-600' }
  ]

  const certificates = [
    {
      id: 1,
      name: 'Chứng chỉ Công dân toàn cầu',
      category: 'Leadership',
      date: '2024-02-15',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop',
      description: 'Hoàn thành khóa học về trách nhiệm công dân toàn cầu'
    },
    {
      id: 2,
      name: 'Chứng chỉ Tình nguyện viên xuất sắc',
      category: 'Volunteering',
      date: '2024-01-30',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop',
      description: 'Ghi nhận đóng góp xuất sắc trong các hoạt động thiện nguyện'
    },
    {
      id: 3,
      name: 'Chứng chỉ Bảo vệ môi trường',
      category: 'Environment',
      date: '2024-01-20',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      description: 'Hoàn thành các chương trình bảo vệ môi trường'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'program',
      title: 'Tham gia "Trồng cây xanh - Vì môi trường tương lai"',
      date: '2024-03-10',
      points: 150,
      icon: TreePine,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'game',
      title: 'Hoàn thành Virtual Global Citizen Game',
      date: '2024-03-08',
      points: 200,
      icon: Globe,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'certificate',
      title: 'Nhận chứng chỉ "Công dân toàn cầu"',
      date: '2024-03-05',
      points: 100,
      icon: Award,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'volunteer',
      title: 'Tình nguyện tại "Dạy học cho trẻ em vùng cao"',
      date: '2024-03-01',
      points: 180,
      icon: GraduationCap,
      color: 'text-orange-600'
    }
  ]

  const achievements = [
    {
      id: 1,
      name: 'Người mới bắt đầu',
      description: 'Hoàn thành chương trình đầu tiên',
      icon: Star,
      unlocked: true,
      date: '2024-01-20'
    },
    {
      id: 2,
      name: 'Tình nguyện viên tích cực',
      description: 'Tham gia 10 chương trình',
      icon: Heart,
      unlocked: true,
      date: '2024-02-15'
    },
    {
      id: 3,
      name: 'Công dân toàn cầu',
      description: 'Đạt 2000 điểm',
      icon: Globe,
      unlocked: true,
      date: '2024-03-01'
    },
    {
      id: 4,
      name: 'Lãnh đạo cộng đồng',
      description: 'Dẫn dắt 5 chương trình',
      icon: Users,
      unlocked: false
    }
  ]

  const tabs = [
    { id: 'overview', name: 'Tổng quan', icon: Activity },
    { id: 'certificates', name: 'Chứng chỉ', icon: Award },
    { id: 'achievements', name: 'Thành tích', icon: Trophy },
    { id: 'activities', name: 'Hoạt động', icon: TrendingUp }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Recent Activities */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ${activity.color} mr-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+{activity.points}</p>
                  <p className="text-xs text-gray-500">điểm</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderCertificates = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Chứng chỉ của bạn</h3>
        <button className="btn-outline text-sm">
          <Download className="w-4 h-4 mr-2" />
          Tải tất cả
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card overflow-hidden"
          >
            <div className="relative h-32">
              <img
                src={cert.image}
                alt={cert.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1">
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{cert.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{cert.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{cert.date}</span>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderAchievements = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Thành tích đạt được</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`card p-6 ${achievement.unlocked ? '' : 'opacity-50'}`}
            >
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400' 
                    : 'bg-gray-200'
                }`}>
                  <Icon className={`w-6 h-6 ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{achievement.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                  {achievement.unlocked && (
                    <p className="text-xs text-green-600">Đạt được: {achievement.date}</p>
                  )}
                </div>
                {achievement.unlocked && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white fill-current" />
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )

  const renderActivities = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Lịch sử hoạt động</h3>
      
      <div className="space-y-4">
        {recentActivities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color} mr-4`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+{activity.points}</p>
                  <p className="text-xs text-gray-500">điểm</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Edit className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {user.level}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center justify-center md:justify-start">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{user.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Phone className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{user.phone}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{user.location}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Tham gia: {user.joinDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.rank}</div>
                  <div className="text-sm text-gray-500">Xếp hạng</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.totalPoints}</div>
                  <div className="text-sm text-gray-500">Điểm tổng</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'certificates' && renderCertificates()}
            {activeTab === 'achievements' && renderAchievements()}
            {activeTab === 'activities' && renderActivities()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 