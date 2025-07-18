import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Globe, 
  Menu, 
  X, 
  User, 
  Trophy, 
  Gamepad2, 
  FileText,
  Users,
  LogOut
} from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
    // Lấy user từ localStorage nếu có (có thể lưu khi login thành công)
    const user = localStorage.getItem('user')
    if (user) {
      const userObj = JSON.parse(user)
      setUsername(userObj.username || '')
      setFullName(userObj.fullName || '')
    } else {
      setUsername('')
      setFullName('')
    }
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUsername('')
    navigate('/')
  }

  // Tạo navItems động theo trạng thái đăng nhập
  const navItems = [
    { name: 'Trang chủ', path: '/', icon: Globe },
    { name: 'Chương trình', path: '/programs', icon: FileText },
    { name: isLoggedIn ? 'Cập nhật hồ sơ' : 'Đăng ký', path: '/register', icon: User },
    { name: 'Trò chơi', path: '/game', icon: Gamepad2 },
    { name: 'Bảng xếp hạng', path: '/leaderboard', icon: Trophy },
    { name: 'Hồ sơ', path: '/profile', icon: Users },
  ];

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center h-auto md:h-16 w-full overflow-x-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 whitespace-nowrap mr-2 mb-2 md:mb-0">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center"
            >
              <Globe className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h1 className="text-base font-bold text-gradient leading-tight">Virtual Global Citizen</h1>
              <p className="text-[11px] text-gray-500 leading-tight">Công dân toàn cầu ảo</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex flex-wrap justify-center items-center space-x-8 w-full">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-2 py-1 rounded-lg transition-all duration-200 whitespace-nowrap text-sm font-medium ${
                    isActive(item.path)
                      ? 'bg-primary-100 text-primary-700 shadow-glow'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
            {/* Auth buttons */}
            {!isLoggedIn ? (
              <div className="flex items-center space-x-2 ml-2 flex-nowrap overflow-x-auto">
                <Link to="/user-login" className="px-3 py-1 rounded-lg bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 transition text-sm whitespace-nowrap">Đăng nhập</Link>
                <Link to="/user-register" className="px-3 py-1 rounded-lg border-2 border-primary-600 text-primary-600 font-semibold bg-white shadow hover:bg-primary-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 transition text-sm whitespace-nowrap">Đăng ký</Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-2 flex-nowrap overflow-x-auto">
                <span className="text-primary-700 font-semibold text-sm whitespace-nowrap max-w-[120px] overflow-hidden text-ellipsis block" title={(fullName || username) && `Xin chào, ${fullName || username}`}>{(fullName || username) && `Xin chào, ${fullName || username}`}</span>
                <button onClick={handleLogout} className="px-3 py-1 rounded-lg bg-secondary-600 text-white font-semibold shadow hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-400 transition flex items-center space-x-1 text-sm whitespace-nowrap">
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
              {/* Auth buttons mobile */}
              {!isLoggedIn ? (
                <div className="flex flex-col space-y-2 mt-2">
                  <Link to="/user-login" className="btn-primary">Đăng nhập</Link>
                  <Link to="/user-register" className="btn-outline">Đăng ký</Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 mt-2">
                  <span className="text-primary-700 font-semibold">{(fullName || username) && `Xin chào, ${fullName || username}`}</span>
                  <button onClick={() => { setIsOpen(false); handleLogout(); }} className="btn-secondary flex items-center space-x-1">
                    <LogOut className="w-4 h-4" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 