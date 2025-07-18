const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Program = require('../models/Program');
const UserProgress = require('../models/UserProgress');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Đã xóa function authMiddleware ở đây

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Thêm route lấy profile user
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cập nhật thông tin user
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const allowedFields = [
      'username', 'fullName', 'phone', 'dateOfBirth', 'location', 'education', 'interests', 'experience', 'availability', 'motivation', 'avatar'
    ];
    const updateData = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) updateData[key] = req.body[key];
    }
    const user = await User.findByIdAndUpdate(req.userId, updateData, { new: true, runValidators: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Lấy hồ sơ công khai theo username
router.get('/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password -email');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Lấy danh sách chương trình đã đăng ký và tiến độ học của user
router.get('/user/my-programs', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    // Lấy tất cả progress của user
    const progresses = await UserProgress.find({ userId }).populate('programId');
    // Map sang dạng trả về: thông tin chương trình + progress
    const result = progresses.map(p => {
      const program = p.programId;
      return {
        programId: program._id,
        title: program.title,
        description: program.description,
        image: program.image,
        totalLessons: program.lessons ? program.lessons.length : 0,
        completedCount: p.completedLessons ? p.completedLessons.length : 0,
        percent: (program.lessons && program.lessons.length > 0) ? Math.round((p.completedLessons.length / program.lessons.length) * 100) : 0,
        isCompleted: (program.lessons && program.lessons.length > 0) ? p.completedLessons.length === program.lessons.length : false
      };
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Hàm loại bỏ dấu và ký tự đặc biệt, chỉ giữ a-z, 0-9
function toSafeUsername(str) {
  return str
    .replace(/đ/g, 'd').replace(/Đ/g, 'D') // Thay thế đ/Đ thành d/D
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
}

// Tạo tài khoản cho tất cả user trên bảng xếp hạng (chỉ dùng cho dev, không public)
router.post('/dev/create-leaderboard-users', async (req, res) => {
  // Danh sách user mẫu lấy từ frontend (Leaderboard.jsx)
  const leaderboardUsers = [
    { name: 'Trần Văn Bình', location: 'TP. Hồ Chí Minh' },
    { name: 'Lê Thị Cẩm', location: 'Hà Nội' },
    { name: 'Nguyễn Thị Anh', location: 'Đà Nẵng' },
    { name: 'Phạm Văn Dũng', location: 'Hải Phòng' },
    { name: 'Hoàng Thị Mai', location: 'Cần Thơ' },
    { name: 'Vũ Hoàng Nam', location: 'TP. Hồ Chí Minh' },
    { name: 'Đỗ Thị Hương', location: 'Hà Nội' },
    { name: 'Lý Văn Tùng', location: 'Đà Nẵng' },
    { name: 'Ngô Thị Lan', location: 'Hải Phòng' },
    { name: 'Bùi Văn Hùng', location: 'Cần Thơ' },
  ];
  try {
    const created = [];
    for (let i = 0; i < leaderboardUsers.length; i++) {
      const user = leaderboardUsers[i];
      // Tạo username không dấu, chỉ a-z, 0-9, viết liền, thêm số thứ tự nếu trùng
      let baseUsername = toSafeUsername(user.name);
      let username = baseUsername;
      let count = 1;
      while (await User.findOne({ username })) {
        username = baseUsername + count;
        count++;
      }
      // Email dạng username@vgc.dev
      const email = username + '@vgc.dev';
      // Password mặc định: '12345678' (nên đổi sau khi đăng nhập)
      const password = await bcrypt.hash('12345678', 10);
      // Không tạo lại nếu đã tồn tại email
      if (await User.findOne({ email })) continue;
      const newUser = new User({
        username,
        fullName: user.name,
        email,
        password,
        location: user.location
      });
      await newUser.save();
      created.push({ username, email, password: '12345678' });
    }
    res.json({ message: 'Created leaderboard users', users: created });
  } catch (err) {
    res.status(500).json({ message: 'Error creating users', error: err.message });
  }
});

module.exports = router; 