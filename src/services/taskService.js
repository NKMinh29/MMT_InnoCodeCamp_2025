import { tasks } from '../data/tasks';
import { achievements } from '../data/achievements';

// Helper: sinh key localStorage cho từng user
const getUserKey = (key, username) => `${key}_${username}`;

// Lấy thống kê user từ localStorage
export const getUserStats = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const username = user.username || '';
  const certificates = JSON.parse(localStorage.getItem(getUserKey('certificates', username)) || '[]');
  const userCertificates = certificates.filter(
    cert => cert.username === user.username || cert.fullName === user.fullName
  );

  // Đếm khóa học đã hoàn thành
  const completedCourses = userCertificates.length;

  // Đếm quiz đã hoàn thành
  const courseProgress = [];
  const registeredPrograms = JSON.parse(localStorage.getItem(getUserKey('registeredPrograms', username)) || '[]');
  registeredPrograms.forEach(courseId => {
    const progress = localStorage.getItem(getUserKey(`courseProgress_${courseId}`, username));
    if (progress) {
      try {
        courseProgress.push(JSON.parse(progress));
      } catch (e) {}
    }
  });
  const completedQuizzes = courseProgress.reduce((total, progress) => {
    return total + (progress.completedLessons?.filter(lessonId => lessonId.includes('quiz')).length || 0);
  }, 0);

  // Đếm giờ tình nguyện (mặc định 0, có thể cập nhật sau)
  const volunteerHours = parseInt(localStorage.getItem(getUserKey('volunteerHours', username)) || '0');

  // Đếm nhiệm vụ đã hoàn thành
  const completedTasks = JSON.parse(localStorage.getItem(getUserKey('completedTasks', username)) || '[]').length;

  // Điểm tổng cộng
  const totalPoints = parseInt(localStorage.getItem(getUserKey('totalPoints', username)) || '0');

  // Chuỗi đăng nhập
  const consecutiveLogins = parseInt(localStorage.getItem(getUserKey('consecutiveLogins', username)) || '0');

  return {
    completedCourses,
    completedQuizzes,
    volunteerHours,
    completedTasks,
    totalPoints,
    consecutiveLogins,
    certificates: userCertificates.length
  };
};

// Kiểm tra điều kiện nhiệm vụ
const checkTaskCondition = (task, stats) => {
  const condition = task.condition;
  console.log('Checking task:', task.name, 'Stats:', stats, 'Condition:', condition);
  for (const [key, requiredValue] of Object.entries(condition)) {
    const currentValue = stats[key] || 0;
    console.log(`  ${key}: current=${currentValue}, required=${requiredValue}, result=${currentValue >= requiredValue}`);
    if (currentValue >= requiredValue) {
      console.log(`  ✓ ${key} condition met: ${currentValue} >= ${requiredValue}`);
    } else {
      console.log(`  ✗ ${key} condition failed: ${currentValue} < ${requiredValue}`);
      return false;
    }
  }
  console.log(`  ✓ All conditions met for task: ${task.name}`);
  return true;
};

// Kiểm tra điều kiện thành tích
const checkAchievementCondition = (achievement, stats) => {
  const condition = achievement.condition;
  console.log('Checking achievement:', achievement.name, 'Stats:', stats, 'Condition:', condition);
  for (const [key, requiredValue] of Object.entries(condition)) {
    const currentValue = stats[key] || 0;
    console.log(`  ${key}: current=${currentValue}, required=${requiredValue}, result=${currentValue >= requiredValue}`);
    if (currentValue >= requiredValue) {
      console.log(`  ✓ ${key} condition met: ${currentValue} >= ${requiredValue}`);
    } else {
      console.log(`  ✗ ${key} condition failed: ${currentValue} < ${requiredValue}`);
      return false;
    }
  }
  console.log(`  ✓ All conditions met for achievement: ${achievement.name}`);
  return true;
};

// Lấy danh sách nhiệm vụ với trạng thái
export const getTasksWithStatus = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const username = user.username || '';
  const stats = getUserStats();
  const completedTaskIds = JSON.parse(localStorage.getItem(getUserKey('completedTasks', username)) || '[]');
  return tasks.map(task => ({
    ...task,
    isCompleted: completedTaskIds.includes(task.id),
    canClaim: !completedTaskIds.includes(task.id) && checkTaskCondition(task, stats)
  }));
};

// Lấy danh sách thành tích với trạng thái
export const getAchievementsWithStatus = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const username = user.username || '';
  const stats = getUserStats();
  const unlockedAchievementIds = JSON.parse(localStorage.getItem(getUserKey('unlockedAchievements', username)) || '[]');
  console.log('=== GET ACHIEVEMENTS WITH STATUS ===');
  console.log('Stats:', stats);
  console.log('Unlocked achievements:', unlockedAchievementIds);
  
  const result = achievements.map(achievement => {
    const unlocked = unlockedAchievementIds.includes(achievement.id);
    const canUnlock = !unlocked && checkAchievementCondition(achievement, stats);
    console.log(`${achievement.name}: unlocked=${unlocked}, canUnlock=${canUnlock}`);
    return {
      ...achievement,
      unlocked,
      canUnlock
    };
  });
  
  console.log('=== END GET ACHIEVEMENTS ===');
  return result;
};

// Đồng bộ user hiện tại vào bảng xếp hạng (localStorage key 'users')
export const syncUserToLeaderboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user || !user.username) return;
  const stats = getUserStats();
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const idx = users.findIndex(u => u.username === user.username);
  const userData = {
    ...user,
    totalPoints: stats.totalPoints,
    completedCourses: stats.completedCourses,
    volunteerHours: stats.volunteerHours,
    certificates: stats.certificates,
    // có thể bổ sung các trường khác nếu muốn
  };
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...userData };
  } else {
    users.push(userData);
  }
  localStorage.setItem('users', JSON.stringify(users));
};

// Nhận thưởng nhiệm vụ
export const claimTaskReward = (taskId) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const username = user.username || '';
  const completedTasks = JSON.parse(localStorage.getItem(getUserKey('completedTasks', username)) || '[]');
  if (completedTasks.includes(taskId)) {
    return { success: false, message: 'Nhiệm vụ đã được hoàn thành!' };
  }
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return { success: false, message: 'Không tìm thấy nhiệm vụ!' };
  }
  const stats = getUserStats();
  if (!checkTaskCondition(task, stats)) {
    return { success: false, message: 'Chưa đủ điều kiện hoàn thành nhiệm vụ!' };
  }
  // Cộng điểm
  const currentPoints = parseInt(localStorage.getItem(getUserKey('totalPoints', username)) || '0');
  localStorage.setItem(getUserKey('totalPoints', username), currentPoints + task.points);
  // Đánh dấu hoàn thành
  completedTasks.push(taskId);
  localStorage.setItem(getUserKey('completedTasks', username), JSON.stringify(completedTasks));
  // Ghi log hoạt động
  const activities = JSON.parse(localStorage.getItem(getUserKey('activities', username)) || '[]');
  activities.push({
    id: Date.now(),
    type: 'task',
    title: `Hoàn thành nhiệm vụ: ${task.name}`,
    points: task.points,
    date: new Date().toISOString().slice(0, 10)
  });
  localStorage.setItem(getUserKey('activities', username), JSON.stringify(activities));
  // Đồng bộ user vào leaderboard
  syncUserToLeaderboard();
  return { success: true, message: `Nhận thưởng ${task.points} điểm!` };
};

// Mở khóa thành tích
export const unlockAchievement = (achievementId) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const username = user.username || '';
  const unlockedAchievements = JSON.parse(localStorage.getItem(getUserKey('unlockedAchievements', username)) || '[]');
  if (unlockedAchievements.includes(achievementId)) {
    return { success: false, message: 'Thành tích đã được mở khóa!' };
  }
  const achievement = achievements.find(a => a.id === achievementId);
  if (!achievement) {
    return { success: false, message: 'Không tìm thấy thành tích!' };
  }
  const stats = getUserStats();
  if (!checkAchievementCondition(achievement, stats)) {
    return { success: false, message: 'Chưa đủ điều kiện mở khóa thành tích!' };
  }
  // Cộng điểm
  const currentPoints = parseInt(localStorage.getItem(getUserKey('totalPoints', username)) || '0');
  localStorage.setItem(getUserKey('totalPoints', username), currentPoints + achievement.points);
  // Mở khóa thành tích
  unlockedAchievements.push(achievementId);
  localStorage.setItem(getUserKey('unlockedAchievements', username), JSON.stringify(unlockedAchievements));
  // Ghi log hoạt động
  const activities = JSON.parse(localStorage.getItem(getUserKey('activities', username)) || '[]');
  activities.push({
    id: Date.now(),
    type: 'achievement',
    title: `Mở khóa thành tích: ${achievement.name}`,
    points: achievement.points,
    date: new Date().toISOString().slice(0, 10)
  });
  localStorage.setItem(getUserKey('activities', username), JSON.stringify(activities));
  // Đồng bộ user vào leaderboard
  syncUserToLeaderboard();
  return { success: true, message: `Mở khóa thành tích và nhận ${achievement.points} điểm!` };
};

// Lấy lịch sử hoạt động
export const getActivities = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const username = user.username || '';
  return JSON.parse(localStorage.getItem(getUserKey('activities', username)) || '[]');
};

// Cập nhật giờ thiện nguyện khi hoàn thành khóa học thiện nguyện
export const addVolunteerHours = (courseId, hours) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const username = user.username || '';
  const currentHours = parseInt(localStorage.getItem(getUserKey('volunteerHours', username)) || '0');
  const newHours = currentHours + hours;
  localStorage.setItem(getUserKey('volunteerHours', username), newHours);
  
  // Ghi log hoạt động
  const activities = JSON.parse(localStorage.getItem(getUserKey('activities', username)) || '[]');
  activities.push({
    id: Date.now(),
    type: 'volunteer',
    title: `Hoàn thành khóa học thiện nguyện: ${courseId}`,
    points: 0,
    volunteerHours: hours,
    date: new Date().toISOString().slice(0, 10)
  });
  localStorage.setItem(getUserKey('activities', username), JSON.stringify(activities));
  
  // Đồng bộ user vào leaderboard
  syncUserToLeaderboard();
  
  return { success: true, message: `Đã cộng ${hours} giờ thiện nguyện!` };
};

// Cập nhật thống kê (gọi khi có hành động mới)
export const updateStats = () => {
  const stats = getUserStats();
  console.log('=== UPDATE STATS ===');
  console.log('Current stats:', stats);
  
  // Kiểm tra và mở khóa thành tích tự động
  const achievementsList = getAchievementsWithStatus();
  console.log('Checking achievements:', achievementsList.length);
  
  achievementsList.forEach(achievement => {
    console.log(`Checking achievement: ${achievement.name}, canUnlock: ${achievement.canUnlock}`);
    if (achievement.canUnlock) {
      console.log(`Unlocking achievement: ${achievement.name}`);
      const result = unlockAchievement(achievement.id);
      console.log('Unlock result:', result);
    }
  });
  
  console.log('=== END UPDATE STATS ===');
  return stats;
}; 