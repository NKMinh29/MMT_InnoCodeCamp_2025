export const achievements = [
  {
    id: 'first_blood',
    name: 'Người mới bắt đầu',
    description: 'Hoàn thành nhiệm vụ đầu tiên.',
    condition: { completedTasks: 1 },
    points: 50,
    icon: 'Star',
    color: 'text-yellow-50',
    unlocked: false
  },
  {
    id: 'task_master',
    name: 'Bậc thầy nhiệm vụ',
    description: 'Hoàn thành 10 nhiệm vụ.',
    condition: { completedTasks: 10 },
    points: 200,
    icon: 'Trophy',
    color: 'text-orange-50',
    unlocked: false
  },
  {
    id: 'course_expert',
    name: 'Chuyên gia khóa học',
    description: 'Hoàn thành 5 khóa học.',
    condition: { completedCourses: 5 },
    points: 30,
    icon: 'GraduationCap',
    color: 'text-blue-50',
    unlocked: false
  },
  {
    id: 'certificate_collector',
    name: 'Nhà sưu tập chứng chỉ',
    description: 'Sở hữu 5 chứng chỉ.',
    condition: { certificates: 5 },
    points: 400,
    icon: 'Award',
    color: 'text-purple-50',
    unlocked: false
  },
  {
    id: 'volunteer_champion',
    name: 'Nhà tình nguyện xuất sắc',
    description: 'Tham gia 20 giờ tình nguyện.',
    condition: { volunteerHours: 20 },
    points: 500,
    icon: 'Heart',
    color: 'text-red-50',
    unlocked: false
  },
  {
    id: 'point_master',
    name: 'Bậc thầy điểm số',
    description: 'Đạt 1000 điểm tổng cộng.',
    condition: { totalPoints: 1000 },
    points: 200,
    icon: 'Zap',
    color: 'text-yellow-400',
    unlocked: false
  },
  {
    id: 'daily_streak',
    name: 'Chuỗi đăng nhập',
    description: 'Đăng nhập 30 ngày liên tiếp.',
    condition: { consecutiveLogins: 30 },
    points: 300,
    icon: 'Calendar',
    color: 'text-green-50',
    unlocked: false
  },
  {
    id: 'quiz_master',
    name: 'Bậc thầy Quiz',
    description: 'Hoàn thành 20 bài quiz.',
    condition: { completedQuizzes: 20 },
    points: 250,
    icon: 'HelpCircle',
    color: 'text-indigo-50',
    unlocked: false
  }
]; 