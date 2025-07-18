import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCourseById, getLessonById } from '../data/courses';
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Clock } from 'lucide-react';
import { gradeEssayWithAI } from '../services/userService';

// Helper: sinh key localStorage cho từng user
const getUserKey = (key, username) => `${key}_${username}`;

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [essayScores, setEssayScores] = useState({});
  const [essayFeedbacks, setEssayFeedbacks] = useState({});
  const [grading, setGrading] = useState(false);
  const [gradingError, setGradingError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const courseData = getCourseById(courseId);
    if (courseData) {
      setCourse(courseData);
      const lessonData = getLessonById(courseId, lessonId);
      if (lessonData) {
        setLesson(lessonData);
        // Check if lesson is already completed
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const username = user.username || '';
        const savedProgress = localStorage.getItem(getUserKey(`courseProgress_${courseId}`, username));
        if (savedProgress) {
          try {
            const progress = JSON.parse(savedProgress);
            setLessonCompleted(progress.completedLessons.includes(lessonId));
          } catch (e) {}
        }
      }
    }
    setLoading(false);
  }, [courseId, lessonId]);

  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleQuizSubmit = async () => {
    if (!lesson.questions) return;
    setGradingError('');
    setGrading(true);
    let correctAnswers = 0;
    let newEssayScores = {};
    let newEssayFeedbacks = {};
    for (const question of lesson.questions) {
      const userAnswer = quizAnswers[question.id];
      if (question.type === 'text') {
        try {
          const aiResult = await gradeEssayWithAI({ essay: userAnswer || '', question: question.question });
          newEssayScores[question.id] = aiResult.score;
          newEssayFeedbacks[question.id] = aiResult.feedback;
          if (aiResult.score > 5) correctAnswers++;
        } catch (e) {
          setGradingError('Lỗi khi chấm điểm AI. Vui lòng thử lại.');
          setGrading(false);
          return;
        }
      } else if (question.type === 'multiple_choice') {
        if (userAnswer === question.correctAnswer) {
          correctAnswers++;
        }
      }
    }
    setEssayScores(newEssayScores);
    setEssayFeedbacks(newEssayFeedbacks);
    setGrading(false);
    const score = Math.round((correctAnswers / lesson.questions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
    if (score >= 80) markLessonAsCompleted();
  };

  const markLessonAsCompleted = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.username || '';
    const savedProgress = localStorage.getItem(getUserKey(`courseProgress_${courseId}`, username));
    let progress = savedProgress ? JSON.parse(savedProgress) : {
      completedLessons: [],
      totalLessons: course.lessons.length,
      percent: 0,
      isCompleted: false
    };
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      progress.percent = Math.round((progress.completedLessons.length / progress.totalLessons) * 100);
      progress.isCompleted = progress.percent === 100;
      localStorage.setItem(getUserKey(`courseProgress_${courseId}`, username), JSON.stringify(progress));
      setLessonCompleted(true);
    }
  };

  const getAllLessons = () => {
    if (!course) return [];
    return course.lessons;
  };

  const getNextLesson = () => {
    const allLessons = getAllLessons();
    const idx = allLessons.findIndex(l => l.id === lessonId);
    return idx < allLessons.length - 1 ? allLessons[idx + 1] : null;
  };
  const getPrevLesson = () => {
    const allLessons = getAllLessons();
    const idx = allLessons.findIndex(l => l.id === lessonId);
    return idx > 0 ? allLessons[idx - 1] : null;
  };

  if (loading) return <div className="text-center py-12">Đang tải...</div>;
  if (!course || !lesson) return <div className="text-center py-12">Không tìm thấy bài học.</div>;

  const nextLesson = getNextLesson();
  const prevLesson = getPrevLesson();
  const isQuiz = lesson.type === 'quiz';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link to={`/programs/${courseId}`} className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Về nội dung khóa học
            </Link>
            {lessonCompleted && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                Đã hoàn thành
              </div>
            )}
          </div>
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
            <div className="flex items-center text-gray-600 text-sm">
              <BookOpen className="w-4 h-4 mr-1" />
              <span className="mr-4">{course.title}</span>
              <Clock className="w-4 h-4 mr-1" />
              <span>{lesson.duration}</span>
            </div>
          </div>
          {/* Progress indicator */}
          <div className="flex items-center space-x-4">
            {prevLesson && (
              <Link to={`/lessons/${courseId}/${prevLesson.id}`} className="flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Bài trước
              </Link>
            )}
            <div className="flex-1 text-center text-sm text-gray-600">
              {getAllLessons().findIndex(l => l.id === lessonId) + 1} / {getAllLessons().length}
            </div>
            {nextLesson && (
              <Link to={`/lessons/${courseId}/${nextLesson.id}`} className="flex items-center text-blue-600 hover:text-blue-800">
                Bài tiếp
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            )}
          </div>
        </div>
        {/* Lesson Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          {isQuiz ? (
            <div>
              <h2 className="text-xl font-semibold mb-6">❓ Mini Quiz</h2>
              {!quizSubmitted ? (
                <div>
                  {lesson.questions && lesson.questions.map((question, index) => (
                    <div key={question.id} className="mb-8">
                      <h3 className="text-lg font-medium mb-4">
                        Câu {index + 1}: {question.question}
                      </h3>
                      {question.type === 'text' ? (
                        <>
                          <input
                            type="text"
                            placeholder="Nhập câu trả lời của bạn..."
                            value={quizAnswers[question.id] || ''}
                            onChange={e => handleQuizAnswer(question.id, e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={quizSubmitted}
                          />
                          {quizSubmitted && (
                            <div className="mt-2 text-sm">
                              <span className="font-semibold">Điểm AI: </span>
                              <span className={essayScores[question.id] > 5 ? 'text-green-600' : 'text-red-600'}>
                                {essayScores[question.id] ?? '-'} / 10
                              </span>
                              {essayFeedbacks[question.id] && (
                                <span className="ml-2 italic text-gray-600">{essayFeedbacks[question.id]}</span>
                              )}
                              {essayFeedbacks[question.id]?.includes('bảo trì') && (
                                <div className="mt-1 text-xs text-blue-600">
                                  ⚠️ Đang dùng hệ thống chấm điểm tự động
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      ) : question.type === 'multiple_choice' ? (
                        <div className="space-y-3">
                          {question.options.map((option, optionIndex) => (
                            <label key={optionIndex} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                              <input
                                type="radio"
                                name={question.id}
                                value={optionIndex}
                                checked={quizAnswers[question.id] === optionIndex}
                                onChange={e => handleQuizAnswer(question.id, optionIndex)}
                                className="mr-3"
                                disabled={quizSubmitted}
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                  {grading && <div className="text-blue-600 font-semibold mb-4">Đang chấm điểm AI...</div>}
                  {gradingError && <div className="text-red-600 font-semibold mb-4">{gradingError}</div>}
                  <button
                    onClick={handleQuizSubmit}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Nộp bài
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-6">
                    <div className={`text-4xl font-bold mb-2 ${quizScore >= 80 ? 'text-green-600' : 'text-red-600'}`}>{quizScore}%</div>
                    <div className="text-lg text-gray-600">
                      {quizScore >= 80 ? '🎉 Chúc mừng! Bạn đã hoàn thành bài quiz!' : 'Cần cải thiện thêm. Hãy thử lại!'}
                    </div>
                  </div>
                  {quizScore >= 80 && !lessonCompleted && (
                    <button
                      onClick={markLessonAsCompleted}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      Đánh dấu hoàn thành
                    </button>
                  )}
                  {nextLesson && (
                    <Link
                      to={`/lessons/${courseId}/${nextLesson.id}`}
                      className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Bài tiếp theo
                    </Link>
                  )}
                  <button
                    onClick={() => navigate(`/programs/${courseId}`)}
                    className="inline-block mt-4 ml-4 bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
                  >
                    Về nội dung khóa học
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="prose prose-lg max-w-none lesson-content" dangerouslySetInnerHTML={{ __html: lesson.content }} />
              <style>{`
                .lesson-content img {
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
                  margin-top: 1.5rem;
                  margin-bottom: 1.5rem;
                  border-radius: 12px;
                  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
                  max-width: 100%;
                  height: auto;
                }
              `}</style>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={markLessonAsCompleted}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Đánh dấu hoàn thành
                </button>
                {nextLesson && (
                  <Link
                    to={`/lessons/${courseId}/${nextLesson.id}`}
                    className="inline-block ml-4 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Bài tiếp theo
                  </Link>
                )}
                <button
                  onClick={() => navigate(`/programs/${courseId}`)}
                  className="inline-block ml-4 bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
                >
                  Về nội dung khóa học
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lesson; 