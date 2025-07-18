const mongoose = require('mongoose');
const Program = require('../models/Program');
require('dotenv').config();

const programs = [
  {
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
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Program.insertMany(programs);
  console.log('Đã thêm các chương trình mẫu!');
  await mongoose.disconnect();
}

seed(); 