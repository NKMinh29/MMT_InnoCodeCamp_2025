const express = require('express');
const Program = require('../models/Program');
const User = require('../models/User');
const router = express.Router();

// Middleware kiểm tra quyền admin
function adminOnly(req, res, next) {
  // Giả sử user có trường isAdmin, lấy từ token hoặc userId
  // Ở đây demo: lấy userId từ req.userId (đã xác thực), kiểm tra user.isAdmin
  if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });
  User.findById(req.userId).then(user => {
    if (!user || !user.isAdmin) return res.status(403).json({ message: 'Admin only' });
    next();
  }).catch(() => res.status(500).json({ message: 'Server error' }));
}

// Thêm chương trình mới (admin)
router.post('/', adminOnly, async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const program = new Program({
      title,
      description,
      image,
      createdBy: req.userId
    });
    await program.save();
    res.status(201).json(program);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Sửa chương trình (admin)
router.put('/:id', adminOnly, async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!program) return res.status(404).json({ message: 'Not found' });
    res.json(program);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Xóa chương trình (admin)
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Lấy danh sách chương trình (ai cũng xem được)
router.get('/', async (req, res) => {
  try {
    const programs = await Program.find().populate('createdBy', 'username').sort({ createdAt: -1 });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Lấy chi tiết chương trình (ai cũng xem được)
router.get('/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id).populate('lessons');
    if (!program) return res.status(404).json({ message: 'Not found' });
    res.json(program);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 