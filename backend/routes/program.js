const express = require('express');
const Program = require('../models/Program');
const User = require('../models/User');
const router = express.Router();
const UserProgress = require('../models/UserProgress');
const authMiddleware = require('../middleware/auth');
const { Configuration, OpenAIApi } = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

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

// Đăng ký học chương trình (user phải đăng nhập)
router.post('/:programId/register', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const programId = req.params.programId;
    // Kiểm tra đã đăng ký chưa
    const existing = await UserProgress.findOne({ userId, programId });
    if (existing) {
      return res.status(200).json({ message: 'Đã đăng ký chương trình này', progress: existing });
    }
    // Tạo mới progress
    const progress = new UserProgress({ userId, programId, completedLessons: [] });
    await progress.save();
    res.status(201).json({ message: 'Đăng ký thành công', progress });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Lấy tiến độ học của user cho chương trình (yêu cầu đăng nhập)
router.get('/:programId/progress', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const programId = req.params.programId;
    const program = await Program.findById(programId).populate('lessons');
    if (!program) return res.status(404).json({ message: 'Program not found' });
    const progress = await UserProgress.findOne({ userId, programId });
    if (!progress) return res.status(404).json({ message: 'User chưa đăng ký chương trình này' });
    const totalLessons = program.lessons.length;
    const completedLessons = progress.completedLessons || [];
    const completedCount = completedLessons.length;
    const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    const isCompleted = percent === 100;
    res.json({
      programId,
      totalLessons,
      completedCount,
      percent,
      isCompleted,
      completedLessons
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// AI chấm điểm tự luận dùng Gemini REST API
router.post('/ai/grade-essay', async (req, res) => {
  const { essay, question } = req.body;
  if (!essay || !question) {
    return res.status(400).json({ error: 'Thiếu nội dung câu hỏi hoặc bài làm.' });
  }
  try {
    console.log('Gemini API key:', process.env.GEMINI_API_KEY);
    console.log('Using REST API with gemini-1.5-flash (free model)');
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Bạn là giáo viên chấm điểm bài tự luận. Hãy chấm điểm theo thang 0-10 và đưa ra nhận xét chi tiết về:

1. Điểm số: [số điểm]/10
2. Nhận xét chi tiết:
   - Ưu điểm: [liệt kê những điểm tốt]
   - Hạn chế: [liệt kê những điểm cần cải thiện]
   - Gợi ý cải thiện: [đưa ra lời khuyên cụ thể]

Câu hỏi: ${question}
Bài làm: ${essay}

Hãy trả lời bằng tiếng Việt và đưa ra nhận xét chi tiết, hữu ích cho học sinh.`
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    const aiResponse = response.data.candidates[0].content.parts[0].text.trim();
    console.log('AI Response:', aiResponse);
    
    // Tách điểm và nhận xét chi tiết
    const scoreMatch = aiResponse.match(/Điểm số:\s*([0-9]{1,2})([.,][0-9])?/);
    let score = 0;
    let feedback = aiResponse;
    
    if (scoreMatch) {
      score = parseFloat(scoreMatch[1] + (scoreMatch[2] || ''));
      // Lấy toàn bộ nhận xét chi tiết
      feedback = aiResponse.replace(/^.*?Điểm số:\s*[0-9.,]+/s, '').trim();
    } else {
      // Fallback: tìm số điểm ở đầu response
      const fallbackMatch = aiResponse.match(/^([0-9]{1,2})([.,][0-9])?/);
      if (fallbackMatch) {
        score = parseFloat(fallbackMatch[1] + (fallbackMatch[2] || ''));
        feedback = aiResponse.replace(/^[0-9.,]+\s*/, '').trim();
      }
    }
    
    // Đảm bảo điểm trong khoảng 0-10
    score = Math.min(10, Math.max(0, score));
    
    res.json({ score, feedback, detailed: true });
  } catch (err) {
    console.error('Gemini AI error:', err.response?.data || err.message);
    console.error('Error stack:', err.stack);
    
    // Fallback logic cho demo - khi AI bị lỗi quota
    if (err.response?.status === 429) {
      console.log('AI quota exceeded, using fallback scoring...');
      // Logic chấm điểm đơn giản dựa trên độ dài và từ khóa
      let score = 5; // Điểm cơ bản
      const essayText = essay.toLowerCase();
      const questionText = question.toLowerCase();
      
      // Tăng điểm nếu có nội dung
      if (essayText.length > 10) score += 1;
      if (essayText.length > 50) score += 1;
      if (essayText.length > 100) score += 1;
      
      // Tăng điểm nếu có từ khóa liên quan
      const keywords = ['thiện nguyện', 'môi trường', 'giáo dục', 'cộng đồng', 'giúp đỡ', 'bảo vệ'];
      keywords.forEach(keyword => {
        if (essayText.includes(keyword)) score += 0.5;
      });
      
      score = Math.min(10, Math.max(0, score)); // Giới hạn 0-10
      
      res.json({ 
        score: Math.round(score * 10) / 10, 
        feedback: 'Điểm được tính tự động do AI đang bảo trì. Nội dung có ý nghĩa và phù hợp với chủ đề.',
        fallback: true 
      });
    } else {
      res.status(500).json({ error: 'Lỗi AI hoặc mạng', detail: err.message });
    }
  }
});

module.exports = router; 