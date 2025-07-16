const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Middleware xác thực token
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

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