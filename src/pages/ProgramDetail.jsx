import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById } from '../data/courses';
import { syncUserToLeaderboard, addVolunteerHours } from '../services/taskService';

// Helper: sinh key localStorage cho từng user
const getUserKey = (key, username) => `${key}_${username}`;

const ProgramDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const courseData = getCourseById(id);
    if (courseData) {
      setCourse(courseData);
      // Get progress from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const username = user.username || '';
      const savedProgress = localStorage.getItem(getUserKey(`courseProgress_${id}`, username));
      if (savedProgress) {
        try {
          setProgress(JSON.parse(savedProgress));
        } catch (e) {
          setProgress({
            completedLessons: [],
            totalLessons: courseData.lessons.length,
            percent: 0,
            isCompleted: false
          });
        }
      } else {
        setProgress({
          completedLessons: [],
          totalLessons: courseData.lessons.length,
          percent: 0,
          isCompleted: false
        });
      }
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="text-center py-12">Đang tải...</div>;
  }

  if (!course) {
    return <div className="text-center py-12">Không tìm thấy khóa học.</div>;
  }

  // Calculate progress
  const completedCount = progress.completedLessons.length;
  const percent = Math.round((completedCount / progress.totalLessons) * 100);
  const isCompleted = percent === 100;
  // Find next lesson to learn
  const nextLesson = course.lessons.find(lesson => !progress.completedLessons.includes(lesson.id));

  // Thêm kiểm tra đã nhận chứng chỉ
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const username = user.username || '';
  const certificates = JSON.parse(localStorage.getItem(getUserKey('certificates', username)) || '[]');
  const hasCertificate = certificates.some(
    cert => cert.courseId === course.id && cert.username === (user.username || user.fullName)
  );

  // Hàm nhận chứng chỉ
  const handleGetCertificate = () => {
    const newCert = {
      id: `${course.id}_${Date.now()}`,
      courseId: course.id,
      courseTitle: course.title,
      username: user.username || '',
      fullName: user.fullName || '',
      date: new Date().toISOString().slice(0, 10)
    };
    const updated = [...certificates, newCert];
    localStorage.setItem(getUserKey('certificates', username), JSON.stringify(updated));
    
    // Add points for completing course
    const currentPoints = parseInt(localStorage.getItem(getUserKey('totalPoints', username)) || '0');
    const pointsEarned = 50; // 50 points for completing a course
    localStorage.setItem(getUserKey('totalPoints', username), currentPoints + pointsEarned);
    
    // Nếu là khóa học thiện nguyện, cộng giờ thiện nguyện
    if (course.id === 'volunteer_program' && course.volunteerHours) {
      addVolunteerHours(course.id, course.volunteerHours);
    }
    
    // Log activity
    const activities = JSON.parse(localStorage.getItem(getUserKey('activities', username)) || '[]');
    activities.push({
      id: Date.now(),
      type: 'certificate',
      title: `Hoàn thành khóa học: ${course.title}`,
      points: pointsEarned,
      date: new Date().toISOString().slice(0, 10)
    });
    localStorage.setItem(getUserKey('activities', username), JSON.stringify(activities));
    
    // Cập nhật lên bảng xếp hạng
    syncUserToLeaderboard();
    
    window.location.reload(); // reload để cập nhật trạng thái
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Banner & Info */}
      <div className="mb-8">
        <img src={course.image} alt={course.title} className="w-full h-64 object-cover rounded-xl mb-6" />
        <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
        <p className="text-gray-700">{course.description}</p>
        {/* Course Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-blue-600 font-medium">Thời lượng</div>
            <div className="text-lg font-semibold">{course.duration}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-green-600 font-medium">Độ khó</div>
            <div className="text-lg font-semibold">{course.level}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm text-purple-600 font-medium">Học viên</div>
            <div className="text-lg font-semibold">{course.enrolledCount}</div>
          </div>
          {course.volunteerHours && (
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm text-orange-600 font-medium">Giờ thiện nguyện</div>
              <div className="text-lg font-semibold">{course.volunteerHours} giờ</div>
            </div>
          )}
        </div>
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">Tiến độ học</span>
            <span className="text-sm text-gray-600">
              {completedCount}/{progress.totalLessons} bài ({percent}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
          {isCompleted ? (
            <div className="text-green-600 font-semibold mb-2">🎉 Đã hoàn thành khóa học!</div>
          ) : (
            nextLesson && (
              <Link
                to={`/lessons/${id}/${nextLesson.id}`}
                className="inline-block mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              >
                Tiếp tục học: {nextLesson.title}
              </Link>
            )
          )}
          {/* Nút nhận chứng chỉ */}
          {isCompleted && (
            hasCertificate ? (
              <button className="mt-2 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold cursor-not-allowed" disabled>
                Đã hoàn thành
              </button>
            ) : (
              <button onClick={handleGetCertificate} className="mt-2 px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">
                Nhận chứng chỉ
              </button>
            )
          )}
        </div>
      </div>
      {/* Lessons List */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Nội dung khóa học</h2>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4">
              <ul className="space-y-3">
                {course.lessons.map((lesson, lessonIndex) => {
                  const isCompleted = progress.completedLessons.includes(lesson.id);
                  const isQuiz = lesson.type === 'quiz';
                  return (
                    <li
                      key={lesson.id}
                      className={`flex items-center p-3 rounded-lg border transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-50 border-green-300' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center flex-1">
                        <span className="font-medium flex items-center gap-2">
                          <span className="text-lg font-bold">{lessonIndex + 1}.</span>
                          {/* Hiển thị icon nếu có */}
                          {lesson.icon && <span className="text-xl">{lesson.icon}</span>}
                          <span>{lesson.title}</span>
                          {isQuiz && <span className="ml-2 text-yellow-600">❓</span>}
                        </span>
                        <span className="ml-3 text-xs text-gray-400">({lesson.duration})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isCompleted ? (
                          <span className="text-green-600 font-semibold">✓ Hoàn thành</span>
                        ) : (
                          <Link
                            to={`/lessons/${id}/${lesson.id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Học bài →
                          </Link>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Link to="/programs" className="text-blue-600 hover:underline">
          ← Quay lại danh sách khóa học
        </Link>
      </div>
    </div>
  );
};

export default ProgramDetail; 