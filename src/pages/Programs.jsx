import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  MapPin,
  Globe
} from 'lucide-react';
import { courses } from '../data/courses';

const Programs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [registeringId, setRegisteringId] = useState(null);
  const [registeredPrograms, setRegisteredPrograms] = useState([]);

  // Load programs from local data instead of backend API
  useEffect(() => {
    setPrograms(courses);
    setLoading(false);
  }, []);

  // Load user's registered programs from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.username || '';
    const savedPrograms = localStorage.getItem(getUserKey('registeredPrograms', username));
    if (savedPrograms) {
      try {
        const programIds = JSON.parse(savedPrograms);
        setRegisteredPrograms(programIds);
      } catch (e) {
        // Ignore parse error
      }
    }
  }, []);

  // Helper: sinh key localStorage cho từng user
  const getUserKey = (key, username) => `${key}_${username}`;

  // Check if program is registered
  const isProgramRegistered = (programId) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.username || '';
    const registeredPrograms = JSON.parse(localStorage.getItem(getUserKey('registeredPrograms', username)) || '[]');
    return registeredPrograms.includes(programId);
  };

  // Filters
  const categories = [
    { id: 'all', name: 'Tất cả', icon: Globe },
    { id: 'charity', name: 'Thiện nguyện', icon: Globe },
    { id: 'environment', name: 'Môi trường', icon: Globe },
    { id: 'education', name: 'Giáo dục', icon: Globe },
    { id: 'health', name: 'Y tế', icon: Globe },
  ];
  const locations = [
    { id: 'all', name: 'Tất cả địa điểm' },
    { id: 'hanoi', name: 'Hà Nội' },
    { id: 'hcm', name: 'TP. Hồ Chí Minh' },
    { id: 'danang', name: 'Đà Nẵng' },
    { id: 'online', name: 'Trực tuyến' },
  ];

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (program.description && program.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || program.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Register for a program (local only)
  const handleRegister = async (programId) => {
    setRegisteringId(programId);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Bạn cần đăng nhập để đăng ký học!');
        setRegisteringId(null);
        return;
      }
      // Simulate registration success
      setMessage('Đăng ký thành công!');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const username = user.username || '';
      const registeredPrograms = JSON.parse(localStorage.getItem(getUserKey('registeredPrograms', username)) || '[]');
      const newRegisteredPrograms = [...registeredPrograms, programId];
      setRegisteredPrograms(newRegisteredPrograms);
      localStorage.setItem(getUserKey('registeredPrograms', username), JSON.stringify(newRegisteredPrograms));
      setRegisteringId(null);
    } catch (e) {
      setMessage('Đã có lỗi xảy ra khi đăng ký.');
      setRegisteringId(null);
    }
  };

  // Lấy user và chứng chỉ
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const username = user.username || '';
  const certificates = JSON.parse(localStorage.getItem(getUserKey('certificates', username)) || '[]');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Khóa học thiện nguyện
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá và tham gia các khóa học thiện nguyện phù hợp với sở thích và khả năng của bạn
          </p>
        </motion.div>

        {/* Thông báo */}
        {message && (
          <div className="mb-4 text-center text-blue-600 font-semibold">{message}</div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm khóa học..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                {locations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Results Count */}
            <div className="flex items-center justify-center">
              <span className="text-gray-600">
                {filteredPrograms.length} khóa học
              </span>
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-3 text-center">Đang tải...</div>
          ) : filteredPrograms.length === 0 ? (
            <div className="col-span-3 text-center">Không có khóa học nào phù hợp.</div>
          ) : filteredPrograms.map((program, index) => {
            // Kiểm tra đã nhận chứng chỉ chưa
            const hasCertificate = certificates.some(
              cert => cert.courseId === program.id && cert.username === (user.username || user.fullName)
            );
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card overflow-hidden bg-white rounded-xl shadow-lg flex flex-col relative"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {/* Rating Star at top-right */}
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full px-3 py-1 flex items-center shadow">
                    <span className="text-yellow-500 text-lg mr-1">★</span>
                    <span className="text-gray-800 font-semibold">{program.rating || 'N/A'}</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col h-full justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{program.title}</h2>
                    <p className="text-gray-600 mb-2">{program.description}</p>
                    {/* Thông tin khóa học */}
                    <div className="flex items-center text-gray-500 mb-1">
                      <span className="font-semibold mr-1">Thời lượng:</span>
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-500 mb-1">
                      <span className="font-semibold mr-1">Độ khó:</span>
                      <span className="mr-3">{program.level}</span>
                      <span className="font-semibold mr-1">Học viên:</span>
                      <span>{program.enrolledCount}</span>
                    </div>
                    {/* Modules count */}
                    <div className="flex items-center text-gray-500 mb-2">
                      <span className="font-semibold mr-1">Số module:</span>
                      <span>{program.modules?.length || 0}</span>
                    </div>
                    {/* Category tag */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                        {program.category}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    {isProgramRegistered(program.id) && (
                      hasCertificate ? (
                        <span className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold cursor-not-allowed inline-flex items-center justify-center">
                          Đã hoàn thành
                        </span>
                      ) : (
                        <Link
                          to={`/programs/${program.id}`}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                          Vào học
                        </Link>
                      )
                    )}
                    {!isProgramRegistered(program.id) && (
                      <button
                        onClick={() => handleRegister(program.id)}
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
                        disabled={registeringId === program.id}
                      >
                        {registeringId === program.id ? 'Đang đăng ký...' : 'Đăng ký'}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Programs; 