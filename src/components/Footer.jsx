import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Chương trình': [
      { name: 'Thiện nguyện', path: '/programs?type=charity' },
      { name: 'Môi trường', path: '/programs?type=environment' },
      { name: 'Giáo dục', path: '/programs?type=education' },
      { name: 'Y tế', path: '/programs?type=health' },
    ],
    'Cộng đồng': [
      { name: 'Bảng xếp hạng', path: '/leaderboard' },
      { name: 'Thành viên xuất sắc', path: '/leaderboard' },
      { name: 'Chứng chỉ', path: '/profile' },
      { name: 'Tin tức', path: '/news' },
    ],
    'Hỗ trợ': [
      { name: 'Hướng dẫn', path: '/help' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Liên hệ', path: '/contact' },
      { name: 'Báo lỗi', path: '/report' },
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center"
              >
                <Globe className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold">Virtual Global Citizen</h3>
                <p className="text-sm text-gray-400">Công dân toàn cầu ảo</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-4">
              Trải nghiệm hành trình làm công dân toàn cầu thông qua các hoạt động thiện nguyện và mô phỏng tương tác.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary-400" />
              <span className="text-gray-400">info@virtualglobalcitizen.org</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-primary-400" />
              <span className="text-gray-400">+84 123 456 789</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary-400" />
              <span className="text-gray-400">Hà Nội, Việt Nam</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Virtual Global Citizen. Được tạo với{' '}
            <Heart className="inline w-4 h-4 text-red-500" /> bởi đội ngũ phát triển.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 