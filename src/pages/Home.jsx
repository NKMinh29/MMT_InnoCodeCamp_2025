import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Globe, 
  Users, 
  Trophy, 
  Gamepad2, 
  Heart, 
  Target, 
  Award,
  ArrowRight,
  Play,
  Star
} from 'lucide-react'
import DefaultAvatar from '../components/DefaultAvatar';
import AvatarWithFallback from '../components/AvatarWithFallback';
import { getUserProfile } from '../services/userService';
import { courses } from '../data/courses';

// Helper: sinh key localStorage cho từng user
const getUserKey = (key, username) => `${key}_${username}`;

const Home = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (token) {
      setLoading(true);
      setError('');
      getUserProfile()
        .then(user => {
          setUserName(user.fullName || user.username || '');
          const username = user.username || '';
          // Lấy danh sách chương trình đã đăng ký từ localStorage theo user
          const savedPrograms = localStorage.getItem(getUserKey('registeredPrograms', username));
          let registeredIds = [];
          if (savedPrograms) {
            try {
              registeredIds = JSON.parse(savedPrograms);
            } catch (e) {}
          }
          // Lấy thông tin từng khóa học và tiến độ
          const registeredCourses = courses.filter(c => registeredIds.includes(c.id));
          const programProgress = registeredCourses.map(course => {
            const progressRaw = localStorage.getItem(getUserKey(`courseProgress_${course.id}`, username));
            let progress = {
              completedLessons: [],
            };
            if (progressRaw) {
              try {
                progress = JSON.parse(progressRaw);
              } catch (e) {}
            }
            return {
              programId: course.id,
              completedLessons: progress.completedLessons || [],
            };
          });
          setPrograms(programProgress);
          setLoading(false);
        })
        .catch(() => {
          setUserName('');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [location]);

  if (loading) return <div className="text-center py-12">Đang tải...</div>;
  if (error) return <div className="text-center text-red-600 py-12">{error}</div>;

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          {userName && (
            <div className="text-xl font-semibold mb-4">
              Hello, {userName}!
            </div>
          )}
          <h1 className="text-2xl font-bold mb-6">Tiến độ các chương trình đã đăng ký</h1>
          {Array.isArray(programs) && programs.length === 0 ? (
            <div className="text-gray-600">Bạn chưa đăng ký chương trình nào.</div>
          ) : Array.isArray(programs) ? (
            <ul className="space-y-6">
              {programs.map(program => {
                // Tìm bài học tiếp theo chưa hoàn thành
                const course = courses.find(c => c.id === program.programId);
                let nextLesson = null;
                if (course) {
                  const progressRaw = localStorage.getItem(getUserKey(`courseProgress_${course.id}`, userName));
                  let completedLessons = [];
                  if (progressRaw) {
                    try {
                      completedLessons = JSON.parse(progressRaw).completedLessons || [];
                    } catch (e) {}
                  }
                  nextLesson = course.lessons.find(lesson => !completedLessons.includes(lesson.id));
                }
                return (
                  <li key={program.programId} className="bg-white rounded-xl shadow p-6">
                    <div className="flex items-center mb-2">
                      <img src={course?.image} alt={course?.title} className="w-16 h-16 rounded-lg object-cover mr-4" />
                      <div>
                        <h2 className="text-lg font-semibold">{course?.title}</h2>
                        <p className="text-gray-500 text-sm">{course?.description}</p>
                      </div>
                    </div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Tiến độ: {program.completedLessons.length}/{course?.lessons.length} bài</span>
                      <span>{program.completedLessons.length / course?.lessons.length * 100}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${program.completedLessons.length / course?.lessons.length * 100}%` }}></div>
                    </div>
                    {program.completedLessons.length === course?.lessons.length && (
                      <div className="text-green-600 font-semibold mt-1">Đã hoàn thành chương trình!</div>
                    )}
                    {/* Nút tiếp tục học */}
                    {nextLesson && (
                      <Link
                        to={`/lessons/${program.programId}/${nextLesson.id}`}
                        className="inline-block mt-3 px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                      >
                        Tiếp tục học
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : null}
          {/* Nút xem thêm khóa học */}
          <div className="text-center mt-8">
            <Link
              to="/programs"
              className="inline-block px-8 py-3 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 transition"
            >
              Xem thêm khóa học
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: Globe,
      title: 'Trải nghiệm toàn cầu',
      description: 'Mô phỏng các tình huống xuyên quốc gia như di cư, cứu trợ nhân đạo, khủng hoảng môi trường.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Cộng đồng kết nối',
      description: 'Tham gia cùng hàng nghìn công dân toàn cầu khác trong các hoạt động thiện nguyện.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Trophy,
      title: 'Thành tích & Chứng chỉ',
      description: 'Nhận chứng chỉ và được tuyên dương cho những đóng góp xuất sắc.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Gamepad2,
      title: 'Trò chơi tương tác',
      description: 'Học hỏi thông qua webgame tương tác với các tình huống thực tế.',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Thành viên', icon: Users },
    { number: '500+', label: 'Chương trình', icon: Target },
    { number: '50+', label: 'Quốc gia', icon: Globe },
    { number: '1,000+', label: 'Chứng chỉ', icon: Award }
  ]

  const testimonials = [
    {
      name: 'Nguyễn Thị Anh',
      role: 'Sinh viên Đại học',
      content: 'Virtual Global Citizen đã giúp tôi hiểu rõ hơn về các vấn đề toàn cầu và cách đóng góp tích cực.',
      avatar: null
    },
    {
      name: 'Trần Văn Bình',
      role: 'Nhân viên công ty',
      content: 'Trải nghiệm game tương tác rất thú vị và giáo dục. Tôi đã học được nhiều kỹ năng ra quyết định.',
      avatar: null
    },
    {
      name: 'Lê Thị Cẩm',
      role: 'Giáo viên',
      content: 'Đây là một nền tảng tuyệt vời để giáo dục học sinh về trách nhiệm công dân toàn cầu.',
      avatar: null
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-secondary-600 to-global-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Trở thành{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  Công dân toàn cầu
                </span>{' '}
                ngay hôm nay
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-gray-100">
                Trải nghiệm hành trình làm công dân toàn cầu thông qua các hoạt động thiện nguyện và mô phỏng tương tác.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="px-8 py-4 rounded-full bg-yellow-400 text-primary-900 font-bold shadow-lg flex items-center justify-center text-lg hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition whitespace-nowrap">
                  Bắt đầu ngay
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/game" className="px-8 py-4 rounded-full border-2 border-white text-white font-bold shadow-lg flex items-center justify-center text-lg hover:bg-white hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 transition whitespace-nowrap">
                  <Play className="mr-2 w-5 h-5" />
                  Thử trò chơi
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="w-full h-96 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
                  <div className="text-center">
                    <Globe className="w-20 h-20 mx-auto mb-4 text-yellow-300" />
                    <h3 className="text-2xl font-bold mb-2">Virtual Global Citizen</h3>
                    <p className="text-gray-200 mb-6">Nền tảng giáo dục và tương tác toàn cầu</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-2xl font-bold text-yellow-300">10K+</div>
                        <div className="text-sm text-gray-200">Thành viên</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-300">500+</div>
                        <div className="text-sm text-gray-200">Chương trình</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full opacity-20"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full opacity-20"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn Virtual Global Citizen?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi cung cấp một nền tảng toàn diện để bạn trở thành công dân toàn cầu tích cực
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 text-center"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Những gì thành viên nói
            </h2>
            <p className="text-xl text-gray-600">
              Khám phá trải nghiệm của những công dân toàn cầu đã tham gia
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <AvatarWithFallback
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    size={48}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Sẵn sàng trở thành công dân toàn cầu?
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Tham gia ngay hôm nay và bắt đầu hành trình của bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors">
                Đăng ký miễn phí
              </Link>
              <Link to="/programs" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors">
                Xem chương trình
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home 