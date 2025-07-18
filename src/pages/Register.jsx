import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap,
  Heart,
  TreePine,
  Stethoscope,
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles
} from 'lucide-react'
import { getUserProfile } from '../services/userService';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    location: '',
    education: '',
    interests: [],
    experience: '',
    availability: '',
    motivation: ''
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updateMsg, setUpdateMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (token) {
      getUserProfile().then(user => {
        setFormData({
          fullName: user.fullName || '',
          email: user.email || '',
          phone: user.phone || '',
          dateOfBirth: user.dateOfBirth || '',
          location: user.location || '',
          education: user.education || '',
          interests: user.interests || [],
          experience: user.experience || '',
          availability: user.availability || '',
          motivation: user.motivation || ''
        });
        setLoading(false);
      }).catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const interests = [
    { id: 'charity', name: 'Thiện nguyện', icon: Heart, color: 'text-red-500' },
    { id: 'environment', name: 'Môi trường', icon: TreePine, color: 'text-green-500' },
    { id: 'education', name: 'Giáo dục', icon: GraduationCap, color: 'text-blue-500' },
    { id: 'health', name: 'Y tế', icon: Stethoscope, color: 'text-purple-500' },
    { id: 'global', name: 'Vấn đề toàn cầu', icon: Globe, color: 'text-orange-500' },
  ]

  const educationLevels = [
    'Trung học phổ thông',
    'Cao đẳng',
    'Đại học',
    'Sau đại học',
    'Khác'
  ]

  const locations = [
    'Hà Nội',
    'TP. Hồ Chí Minh',
    'Đà Nẵng',
    'Hải Phòng',
    'Cần Thơ',
    'Khác'
  ]

  const availabilityOptions = [
    'Cuối tuần',
    'Buổi tối',
    'Cả ngày',
    'Linh hoạt',
    'Chỉ trực tuyến'
  ]

  const recommendedPrograms = [
    {
      id: 1,
      title: 'Trồng cây xanh - Vì môi trường tương lai',
      category: 'environment',
      match: 95,
      description: 'Phù hợp với sở thích môi trường và khả năng tham gia cuối tuần của bạn.',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Dạy học cho trẻ em vùng cao',
      category: 'education',
      match: 88,
      description: 'Tận dụng kinh nghiệm giáo dục và có thể tham gia trực tuyến.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Quyên góp sách cho thư viện cộng đồng',
      category: 'charity',
      match: 82,
      description: 'Hoạt động thiện nguyện phù hợp với lịch trình linh hoạt.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop'
    }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleInterestToggle = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowRecommendations(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getInterestIcon = (interestId) => {
    const interest = interests.find(i => i.id === interestId)
    return interest ? interest.icon : Globe
  }

  const getInterestColor = (interestId) => {
    const interest = interests.find(i => i.id === interestId)
    return interest ? interest.color : 'text-gray-500'
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      // Update user info
      try {
        setUpdateMsg('');
        setLoading(true);
        const token = localStorage.getItem('token');
        await axios.put('http://localhost:5001/api/profile', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUpdateMsg('Cập nhật thông tin thành công!');
      } catch (err) {
        setUpdateMsg('Cập nhật thất bại!');
      } finally {
        setLoading(false);
      }
    } else {
      // ... giữ nguyên logic đăng ký cũ ...
    }
  }

  // Helper: sinh key localStorage cho từng user
  const getUserKey = (key, username) => `${key}_${username}`;
  // (Nếu có thao tác lưu registeredPrograms, certificates... thì dùng getUserKey(key, username) để lưu/đọc theo user)

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Thông tin cá nhân</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nhập họ và tên"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="0123456789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày sinh
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa điểm
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Chọn địa điểm</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trình độ học vấn
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={formData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Chọn trình độ</option>
                    {educationLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Sở thích và kinh nghiệm</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Lĩnh vực quan tâm (chọn nhiều)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {interests.map(interest => {
                  const Icon = interest.icon
                  const isSelected = formData.interests.includes(interest.id)
                  return (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => handleInterestToggle(interest.id)}
                      className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className={`w-6 h-6 mr-3 ${interest.color}`} />
                        <span className="font-medium">{interest.name}</span>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 ml-auto text-primary-500" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kinh nghiệm tình nguyện (nếu có)
              </label>
              <textarea
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Mô tả kinh nghiệm tình nguyện trước đây..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thời gian có thể tham gia
              </label>
              <select
                value={formData.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Chọn thời gian</option>
                {availabilityOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Động lực tham gia</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tại sao bạn muốn tham gia Virtual Global Citizen? *
              </label>
              <textarea
                value={formData.motivation}
                onChange={(e) => handleInputChange('motivation', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Chia sẻ động lực và mong muốn của bạn khi tham gia..."
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Sparkles className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">AI sẽ phân tích thông tin của bạn</h4>
                  <p className="text-blue-700 text-sm">
                    Dựa trên sở thích, kinh nghiệm và động lực, chúng tôi sẽ gợi ý những chương trình phù hợp nhất cho bạn.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isLoggedIn ? 'Cập nhật thông tin' : 'Đăng ký tham gia'}
          </h1>
          <p className="text-xl text-gray-600">
            {isLoggedIn ? 'Cập nhật thông tin cá nhân của bạn' : 'Trở thành công dân toàn cầu và bắt đầu hành trình của bạn'}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">
              Bước {currentStep} / 3
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / 3) * 100)}% hoàn thành
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {loading ? (
            <div className="text-center py-12">
              <p>Đang tải thông tin...</p>
            </div>
          ) : (
            <>
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap shadow ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400'
                  }`}
                >
                  Quay lại
                </button>

                {currentStep === 3 ? (
                  isLoggedIn ? (
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-3 rounded-full bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 transition flex items-center whitespace-nowrap text-base"
                      disabled={loading}
                    >
                      {loading ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
                    </button>
                  ) : (
                    <button
                      onClick={nextStep}
                      className="px-6 py-3 rounded-full bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 transition flex items-center whitespace-nowrap text-base"
                    >
                      Hoàn thành
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  )
                ) : (
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 rounded-full bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 transition flex items-center whitespace-nowrap text-base"
                  >
                    Tiếp theo
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                )}
              </div>
              {updateMsg && (
                <div className={`mt-4 text-center font-medium ${updateMsg.includes('thành công') ? 'text-green-600' : 'text-red-600'}`}>{updateMsg}</div>
              )}
            </>
          )}
        </div>

        {/* AI Recommendations */}
        {showRecommendations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Gợi ý chương trình phù hợp
                </h2>
                <p className="text-gray-600">
                  Dựa trên thông tin bạn cung cấp, đây là những chương trình phù hợp nhất
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedPrograms.map((program, index) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card overflow-hidden"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        {program.match}% phù hợp
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {program.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {program.description}
                      </p>
                      <button className="w-full px-5 py-3 rounded-full bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 transition text-sm whitespace-nowrap">
                        Tham gia ngay
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className="px-6 py-3 rounded-full border-2 border-primary-600 text-primary-600 font-semibold bg-white shadow hover:bg-primary-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 transition whitespace-nowrap">
                  Xem tất cả chương trình
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Register 