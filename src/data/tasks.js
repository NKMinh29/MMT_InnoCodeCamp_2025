export const tasks = [
  {
    id: 'complete_first_course',
    name: 'Hoàn thành khóa học đầu tiên',
    description: 'Hoàn thành bất kỳ khóa học nào để nhận thưởng.',
    type: 'course',
    condition: { completedCourses: 1 },
    points: 10,
    icon: 'GraduationCap',
    color: 'text-blue-600'
  },
  {
    id: 'complete_3_courses',
    name: 'Học viên chăm chỉ',
    description: 'Hoàn thành 3 khóa học để nhận thưởng.',
    type: 'course',
    condition: { completedCourses: 3 },
    points: 300,
    icon: 'BookOpen',
    color: 'text-green-600'
  },
  {
    id: 'complete_5_quizzes',
    name: 'Chuyên gia Quiz',
    description: 'Hoàn thành 5 bài quiz để nhận thưởng.',
    type: 'quiz',
    condition: { completedQuizzes: 5 },
    points: 150,
    icon: 'HelpCircle',
    color: 'text-yellow-600'
  },
  {
    id: 'get_first_certificate',
    name: 'Chứng chỉ đầu tiên',
    description: 'Nhận chứng chỉ đầu tiên để nhận thưởng.',
    type: 'certificate',
    condition: { certificates: 1 },
    points: 200,
    icon: 'Award',
    color: 'text-purple-600'
  },
  {
    id: 'get_3_certificates',
    name: 'Bộ sưu tập chứng chỉ',
    description: 'Nhận 3 chứng chỉ để nhận thưởng.',
    type: 'certificate',
    condition: { certificates: 3 },
    points: 500,
    icon: 'Trophy',
    color: 'text-orange-600'
  },
  {
    id: 'volunteer_5_hours',
    name: 'Tình nguyện viên',
    description: 'Tham gia 5 giờ hoạt động thiện nguyện.',
    type: 'volunteer',
    condition: { volunteerHours: 5 },
    points: 250,
    icon: 'Heart',
    color: 'text-red-600'
  },
  {
    id: 'volunteer_10_hours',
    name: 'Tình nguyện viên tích cực',
    description: 'Tham gia 10 giờ hoạt động thiện nguyện.',
    type: 'volunteer',
    condition: { volunteerHours: 10 },
    points: 500,
    icon: 'Users',
    color: 'text-indigo-600'
  },
  {
    id: 'reach_1000_points',
    name: 'Đạt 1000 điểm',
    description: 'Tích lũy được 1000 điểm tổng cộng.',
    type: 'points',
    condition: { totalPoints: 1000 },
    points: 100,
    icon: 'Star',
    color: 'text-yellow-500'
  },
  {
    id: 'reach_2000_points',
    name: 'Đạt 2000 điểm',
    description: 'Tích lũy được 2000 điểm tổng cộng.',
    type: 'points',
    condition: { totalPoints: 2000 },
    points: 200,
    icon: 'Zap',
    color: 'text-blue-500'
  },
  {
    id: 'login_7days',
    name: 'Đăng nhập 7 ngày liên tiếp',
    description: 'Đăng nhập vào hệ thống 7 ngày liên tục.',
    type: 'login',
    condition: { consecutiveLogins: 7 },
    points: 100,
    icon: 'Calendar',
    color: 'text-green-500'
  }
]; 