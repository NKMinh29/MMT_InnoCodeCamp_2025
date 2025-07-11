import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  Heart,
  TreePine,
  GraduationCap,
  Stethoscope,
  Globe,
  ArrowRight,
  Star
} from 'lucide-react'

const Programs = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  const categories = [
    { id: 'all', name: 'Tất cả', icon: Globe },
    { id: 'charity', name: 'Thiện nguyện', icon: Heart },
    { id: 'environment', name: 'Môi trường', icon: TreePine },
    { id: 'education', name: 'Giáo dục', icon: GraduationCap },
    { id: 'health', name: 'Y tế', icon: Stethoscope },
  ]

  const locations = [
    { id: 'all', name: 'Tất cả địa điểm' },
    { id: 'hanoi', name: 'Hà Nội' },
    { id: 'hcm', name: 'TP. Hồ Chí Minh' },
    { id: 'danang', name: 'Đà Nẵng' },
    { id: 'online', name: 'Trực tuyến' },
  ]

  const programs = [
    {
      id: 1,
      title: 'Trồng cây xanh - Vì môi trường tương lai',
      category: 'environment',
      location: 'hanoi',
      date: '2024-03-15',
      duration: '4 giờ',
      participants: 50,
      maxParticipants: 100,
      rating: 4.8,
      description: 'Tham gia trồng cây xanh tại công viên Hồ Tây, góp phần tạo môi trường xanh sạch đẹp cho thành phố.',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop',
      tags: ['Môi trường', 'Cộng đồng', 'Thực hành'],
      difficulty: 'Dễ',
      impact: 'Cao'
    },
    {
      id: 2,
      title: 'Dạy học cho trẻ em vùng cao',
      category: 'education',
      location: 'online',
      date: '2024-03-20',
      duration: '2 giờ',
      participants: 25,
      maxParticipants: 30,
      rating: 4.9,
      description: 'Dạy học trực tuyến cho trẻ em vùng cao, giúp các em tiếp cận kiến thức mới.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop',
      tags: ['Giáo dục', 'Trực tuyến', 'Trẻ em'],
      difficulty: 'Trung bình',
      impact: 'Cao'
    },
    {
      id: 3,
      title: 'Khám bệnh miễn phí cho người nghèo',
      category: 'health',
      location: 'hcm',
      date: '2024-03-25',
      duration: '6 giờ',
      participants: 15,
      maxParticipants: 20,
      rating: 4.7,
      description: 'Tham gia khám bệnh miễn phí cho người nghèo tại các khu vực khó khăn.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      tags: ['Y tế', 'Cộng đồng', 'Nhân đạo'],
      difficulty: 'Khó',
      impact: 'Rất cao'
    },
    {
      id: 4,
      title: 'Thu gom rác thải nhựa tại bãi biển',
      category: 'environment',
      location: 'danang',
      date: '2024-03-30',
      duration: '3 giờ',
      participants: 40,
      maxParticipants: 60,
      rating: 4.6,
      description: 'Thu gom rác thải nhựa tại bãi biển Mỹ Khê, bảo vệ môi trường biển.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      tags: ['Môi trường', 'Biển', 'Rác thải'],
      difficulty: 'Dễ',
      impact: 'Trung bình'
    },
    {
      id: 5,
      title: 'Quyên góp sách cho thư viện cộng đồng',
      category: 'charity',
      location: 'hanoi',
      date: '2024-04-05',
      duration: '2 giờ',
      participants: 30,
      maxParticipants: 50,
      rating: 4.5,
      description: 'Quyên góp sách và tổ chức thư viện cộng đồng cho trẻ em.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
      tags: ['Thiện nguyện', 'Sách', 'Giáo dục'],
      difficulty: 'Dễ',
      impact: 'Trung bình'
    },
    {
      id: 6,
      title: 'Hỗ trợ người khuyết tật học nghề',
      category: 'education',
      location: 'hcm',
      date: '2024-04-10',
      duration: '5 giờ',
      participants: 10,
      maxParticipants: 15,
      rating: 4.9,
      description: 'Hỗ trợ người khuyết tật học nghề và tìm việc làm phù hợp.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop',
      tags: ['Giáo dục', 'Người khuyết tật', 'Nghề nghiệp'],
      difficulty: 'Khó',
      impact: 'Rất cao'
    }
  ]

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory
    const matchesLocation = selectedLocation === 'all' || program.location === selectedLocation
    
    return matchesSearch && matchesCategory && matchesLocation
  })

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.icon : Globe
  }

  const getLocationName = (locationId) => {
    const location = locations.find(loc => loc.id === locationId)
    return location ? location.name : 'Không xác định'
  }

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
            Chương trình thiện nguyện
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá và tham gia các chương trình thiện nguyện phù hợp với sở thích và khả năng của bạn
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm chương trình..."
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
                {filteredPrograms.length} chương trình
              </span>
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program, index) => {
            const CategoryIcon = getCategoryIcon(program.category)
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <CategoryIcon className="w-5 h-5 text-primary-600" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      {program.rating}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {program.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {program.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.tags.map(tag => (
                      <span
                        key={tag}
                        className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      {getLocationName(program.location)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(program.date).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      {program.participants}/{program.maxParticipants} người tham gia
                    </div>
                  </div>

                  {/* Difficulty and Impact */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm">
                      <span className="text-gray-500">Độ khó: </span>
                      <span className={`font-medium ${
                        program.difficulty === 'Dễ' ? 'text-green-600' :
                        program.difficulty === 'Trung bình' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {program.difficulty}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Tác động: </span>
                      <span className={`font-medium ${
                        program.impact === 'Cao' || program.impact === 'Rất cao' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {program.impact}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full btn-primary flex items-center justify-center">
                    Tham gia ngay
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredPrograms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không tìm thấy chương trình
            </h3>
            <p className="text-gray-600">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Programs 