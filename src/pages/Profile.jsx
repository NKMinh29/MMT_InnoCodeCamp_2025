import React, { useState, useEffect } from 'react'
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
import DefaultAvatar from '../components/DefaultAvatar';
import { getUserProfile } from '../services/userService';
import { getTasksWithStatus, claimTaskReward, getUserStats, getAchievementsWithStatus, unlockAchievement, getActivities, updateStats, syncUserToLeaderboard } from '../services/taskService';
import jsPDF from 'jspdf';

// Helper: sinh key localStorage cho từng user
const getUserKey = (key, username) => `${key}_${username}`;

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tasks, setTasks] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [taskMessage, setTaskMessage] = useState('');
  const [achievementMessage, setAchievementMessage] = useState('');
  const [activities, setActivities] = useState([]);
  const [statsUpdate, setStatsUpdate] = useState(0);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
        // Cập nhật thống kê và kiểm tra thành tích
        updateStats();
      } catch (err) {
        setError('Không thể tải thông tin hồ sơ.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    setTasks(getTasksWithStatus());
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'achievements') {
      setAchievements(getAchievementsWithStatus());
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'activities') {
      setActivities(getActivities());
    }
  }, [activeTab]);

  // Cập nhật stats khi có thay đổi
  useEffect(() => {
    if (activeTab === 'overview') {
      // Force re-render để cập nhật stats
      setTasks(getTasksWithStatus());
    }
  }, [activeTab, statsUpdate]);

  useEffect(() => {
    // Load avatar from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.username || '';
    const savedAvatar = localStorage.getItem(getUserKey('avatar', username));
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatar(ev.target.result);
      // Lưu vào localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const username = user.username || '';
      localStorage.setItem(getUserKey('avatar', username), ev.target.result);
      // Cập nhật avatar cho user trong localStorage (nếu có bảng xếp hạng dùng avatar)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const idx = users.findIndex(u => u.username === username);
      if (idx !== -1) {
        users[idx].avatar = ev.target.result;
        localStorage.setItem('users', JSON.stringify(users));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClaimTask = (taskId) => {
    const result = claimTaskReward(taskId);
    setTaskMessage(result.message);
    setTasks(getTasksWithStatus());
    // Cập nhật thống kê sau khi hoàn thành nhiệm vụ
    updateStats();
    setStatsUpdate(prev => prev + 1);
  };

  const handleUnlockAchievement = (achievementId) => {
    const result = unlockAchievement(achievementId);
    setAchievementMessage(result.message);
    // Cập nhật thống kê sau khi mở khóa thành tích
    updateStats();
    // Refresh achievements list
    setAchievements(getAchievementsWithStatus());
    setStatsUpdate(prev => prev + 1);
  };

  // Hàm reset localStorage cho dev/test (chỉ xóa dữ liệu của user hiện tại)
  const handleResetProgress = () => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const currentUsername = currentUser.username || '';
    localStorage.removeItem(getUserKey('totalPoints', currentUsername));
    localStorage.removeItem(getUserKey('completedTasks', currentUsername));
    localStorage.removeItem(getUserKey('unlockedAchievements', currentUsername));
    localStorage.removeItem(getUserKey('activities', currentUsername));
    // Cũng xóa chứng chỉ để test lại
    localStorage.removeItem(getUserKey('certificates', currentUsername));
    // Xóa progress các khóa học
    const registeredPrograms = JSON.parse(localStorage.getItem(getUserKey('registeredPrograms', currentUsername)) || '[]');
    registeredPrograms.forEach(courseId => {
      localStorage.removeItem(getUserKey(`courseProgress_${courseId}`, currentUsername));
    });
    
    // Cập nhật lại bảng xếp hạng sau khi reset
    syncUserToLeaderboard();
    
    window.location.reload();
  };

  if (loading) return <div className="text-center py-20">Đang tải hồ sơ...</div>;
  if (error) return <div className="text-center text-red-600 py-20">{error}</div>;
  if (!user) return null;

  const username = user.username || '';

  // Lấy thống kê thực từ taskService (force re-render khi statsUpdate thay đổi)
  const userStats = getUserStats();
  
  // Tính xếp hạng hiện tại của user
  const getCurrentRanking = () => {
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    usersData.sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
    const userIndex = usersData.findIndex(u => u.username === username);
    return userIndex !== -1 ? userIndex + 1 : 'N/A';
  };
  
  const currentRanking = getCurrentRanking();
  
  const stats = [
    { label: 'Xếp hạng hiện tại', value: `#${currentRanking}`, icon: TrendingUp, color: 'text-orange-600' },
    { label: 'Điểm tổng cộng', value: userStats.totalPoints, icon: Trophy, color: 'text-yellow-600' },
    { label: 'Khóa học hoàn thành', value: userStats.completedCourses, icon: Target, color: 'text-green-600' },
    { label: 'Giờ tình nguyện', value: userStats.volunteerHours, icon: Clock, color: 'text-blue-600' },
    { label: 'Chứng chỉ', value: userStats.certificates, icon: Award, color: 'text-purple-600' }
  ]

  // Lấy chứng chỉ từ localStorage theo user
  const userCertificates = JSON.parse(localStorage.getItem(getUserKey('certificates', username)) || '[]').filter(
    cert =>
      (user.fullName && cert.username === user.fullName) ||
      (user.username && cert.username === user.username)
  );

  // Hàm chuyển tiếng Việt sang ASCII để tránh lỗi font PDF
  const convertToASCII = (text) => {
    if (!text) return '';
    return text
      .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
      .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
      .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
      .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
      .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
      .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
      .replace(/Đ/g, 'D');
  };

  // Hàm tải PDF chứng chỉ
  const handleDownloadCertificate = (cert) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('CERTIFICATE OF COMPLETION', 20, 30);
    doc.setFontSize(16);
    doc.text(`Full Name: ${convertToASCII(cert.fullName || 'Not Updated')}`, 20, 50);
    doc.text(`Username: ${cert.username}`, 20, 65);
    doc.text(`Course: ${convertToASCII(cert.courseTitle)}`, 20, 80);
    doc.text(`Date Received: ${cert.date}`, 20, 95);
    doc.text(`Certificate ID: ${cert.id}`, 20, 110);
    doc.setFontSize(12);
    doc.text('Congratulations on successfully completing this course!', 20, 130);
    doc.save(`certificate_${cert.courseId}_${cert.username}.pdf`);
  };

  // Hàm cập nhật họ tên cho tất cả chứng chỉ của user
  const handleUpdateCertificateNames = () => {
    if (!user || !user.fullName) return;
    const allCerts = JSON.parse(localStorage.getItem(getUserKey('certificates', username)) || '[]');
    const updatedCerts = allCerts.map(cert => {
      if ((cert.username === user.username || cert.fullName === user.fullName) && cert.fullName !== user.fullName) {
        return { ...cert, fullName: user.fullName };
      }
      return cert;
    });
    localStorage.setItem(getUserKey('certificates', username), JSON.stringify(updatedCerts));
    window.location.reload();
  };

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

  // Lấy hoạt động thực từ localStorage
  const allActivities = getActivities();
  const recentActivities = allActivities
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4)
    .map(activity => ({
      id: activity.id,
      type: activity.type,
      title: activity.title,
      date: activity.date,
      points: activity.points,
      volunteerHours: activity.volunteerHours,
      icon: activity.type === 'task' ? Target : 
            activity.type === 'achievement' ? Trophy : 
            activity.type === 'certificate' ? Award : 
            activity.type === 'volunteer' ? Heart : 
            activity.type === 'course' ? GraduationCap : Globe,
      color: activity.type === 'task' ? 'text-blue-600' :
             activity.type === 'achievement' ? 'text-purple-600' :
             activity.type === 'certificate' ? 'text-green-600' :
             activity.type === 'volunteer' ? 'text-red-600' :
             activity.type === 'course' ? 'text-indigo-600' : 'text-yellow-600'
    }));



  const tabs = [
    { id: 'overview', name: 'Tổng quan', icon: Activity },
    { id: 'tasks', name: 'Nhiệm vụ', icon: Target },
    { id: 'certificates', name: 'Chứng chỉ', icon: Award },
    { id: 'achievements', name: 'Thành tích', icon: Trophy },
    { id: 'activities', name: 'Hoạt động', icon: TrendingUp }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
                  {activity.volunteerHours ? (
                    <>
                      <p className="font-semibold text-orange-600">+{activity.volunteerHours}</p>
                      <p className="text-xs text-gray-500">giờ thiện nguyện</p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-green-600">+{activity.points}</p>
                      <p className="text-xs text-gray-500">điểm</p>
                    </>
                  )}
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
      {userCertificates.length === 0 ? (
        <div className="text-gray-600">Bạn chưa nhận chứng chỉ nào.</div>
      ) : (
        <>
          {user.fullName && (
            <button
              onClick={handleUpdateCertificateNames}
              className="mb-4 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Cập nhật họ tên cho tất cả chứng chỉ
            </button>
          )}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userCertificates.map(cert => (
              <li key={cert.id} className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-purple-700 mb-2">{cert.courseTitle}</h3>
                  <div className="text-gray-700 mb-1">
                    <span>Họ tên: <span className="font-semibold">{cert.fullName || 'Chưa cập nhật'}</span></span><br />
                    <span>Username: <span className="font-mono">{cert.username}</span></span>
                  </div>
                  <div className="text-gray-700 mb-1">Ngày nhận: <span className="font-semibold">{cert.date}</span></div>
                  <div className="text-gray-700 mb-1">Mã chứng chỉ: <span className="font-mono">{cert.id}</span></div>
                </div>
                <button
                  onClick={() => handleDownloadCertificate(cert)}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Tải về
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )

  const renderAchievements = () => (
    <div className="space-y-6">
      {achievementMessage && <div className="text-green-600 font-semibold mb-2">{achievementMessage}</div>}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map(ach => (
          <li key={ach.id} className={`bg-white rounded-xl shadow p-6 flex flex-col justify-between ${ach.unlocked ? '' : 'opacity-60'}`}>
            <div>
              <h3 className="text-lg font-bold mb-2">{ach.name}</h3>
              <div className="text-gray-700 mb-1">{ach.description}</div>
              <div className="text-gray-500 text-sm mb-2">Điểm: <span className="font-semibold">{ach.points}</span></div>
            </div>
            <div className="mt-4">
              {ach.unlocked ? (
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">Đã mở khóa</span>
              ) : ach.canUnlock ? (
                <button
                  onClick={() => handleUnlockAchievement(ach.id)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Mở khóa
                </button>
              ) : (
                <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg font-semibold">Chưa đủ điều kiện</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderActivities = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Lịch sử hoạt động</h3>
      {activities.length === 0 ? (
        <div className="text-gray-600">Chưa có hoạt động nào.</div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                    activity.type === 'task' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'achievement' ? 'bg-purple-100 text-purple-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {activity.type === 'task' ? '📋' : 
                     activity.type === 'achievement' ? '🏆' : '⭐'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  {activity.volunteerHours ? (
                    <>
                      <p className="font-semibold text-orange-600">+{activity.volunteerHours}</p>
                      <p className="text-xs text-gray-500">giờ thiện nguyện</p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-green-600">+{activity.points}</p>
                      <p className="text-xs text-gray-500">điểm</p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )

  const renderTasks = () => (
    <div className="space-y-6">
      <button
        onClick={handleResetProgress}
        className="mb-4 px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
      >
        Reset nhiệm vụ/thành tích/điểm (dev)
      </button>
      {taskMessage && <div className="text-green-600 font-semibold mb-2">{taskMessage}</div>}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map(task => (
          <li key={task.id} className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-2">{task.name}</h3>
              <div className="text-gray-700 mb-1">{task.description}</div>
              <div className="text-gray-500 text-sm mb-2">Điểm: <span className="font-semibold">{task.points}</span></div>
            </div>
            <div className="mt-4">
              {task.isCompleted ? (
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">Đã nhận thưởng</span>
              ) : task.canClaim ? (
                <button
                  onClick={() => handleClaimTask(task.id)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Nhận thưởng
                </button>
              ) : (
                <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg font-semibold">Chưa đủ điều kiện</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

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
            <div className="relative group">
              {avatar ? (
                <img
                  src={avatar}
                  alt={user.fullName || user.username}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <DefaultAvatar size={128} />
              )}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center cursor-pointer group-hover:scale-110 transition">
                <Edit className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  title="Tải ảnh đại diện"
                />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{user.fullName || user.username}</h1>
                {user.level && (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {user.level}
                  </div>
                )}
              </div>
              {/* 2 dòng, mỗi dòng 2 mục */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                  <span className="text-gray-600">Ngày sinh: {user.dateOfBirth}</span>
                </div>
              </div>
              {/* Dòng riêng cho học vấn, sở thích, kinh nghiệm, thời gian tham gia */}
              <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  {user.education && (
                    <div className="mb-2">
                      <span className="font-semibold text-gray-700">Trình độ học vấn: </span>
                      <span className="text-gray-600">{user.education}</span>
                    </div>
                  )}
                  {user.interests && user.interests.length > 0 && (
                    <div className="mb-2">
                      <span className="font-semibold text-gray-700">Sở thích: </span>
                      <span className="text-gray-600">{user.interests.join(', ')}</span>
                    </div>
                  )}
                </div>
                <div>
                  {user.experience && (
                    <div className="mb-2">
                      <span className="font-semibold text-gray-700">Kinh nghiệm: </span>
                      <span className="text-gray-600">{user.experience}</span>
                    </div>
                  )}
                  {user.availability && (
                    <div className="mb-2">
                      <span className="font-semibold text-gray-700">Thời gian có thể tham gia: </span>
                      <span className="text-gray-600">{user.availability}</span>
                    </div>
                  )}
                </div>
              </div>
              {/* Động lực chiếm cả dòng */}
              {user.motivation && (
                <div className="mb-2 w-full block overflow-x-auto">
                  <span className="font-semibold text-gray-700">Động lực: </span>
                  <span className="text-gray-600 break-all whitespace-pre-line pr-2">{user.motivation}</span>
                </div>
              )}
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
            {activeTab === 'tasks' && renderTasks()}
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