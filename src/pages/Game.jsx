import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Trophy, 
  Heart,
  Globe,
  Users,
  Target,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info
} from 'lucide-react'

const Game = () => {
  const [gameState, setGameState] = useState('menu') // menu, playing, paused, completed
  const [currentScenario, setCurrentScenario] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [gameHistory, setGameHistory] = useState([])

  const scenarios = [
    {
      id: 1,
      title: 'Khủng hoảng di cư',
      description: 'Bạn là một nhà ngoại giao phải đưa ra quyết định về việc tiếp nhận người tị nạn từ một quốc gia láng giềng đang trong tình trạng khủng hoảng.',
      background: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop',
      choices: [
        {
          id: 'a',
          text: 'Mở cửa biên giới và tiếp nhận tất cả người tị nạn',
          impact: { humanitarian: 10, economic: -5, social: -3, diplomatic: 2 },
          explanation: 'Quyết định này thể hiện tinh thần nhân đạo cao nhưng có thể gây áp lực về kinh tế và xã hội.'
        },
        {
          id: 'b',
          text: 'Chỉ tiếp nhận một số lượng hạn chế và yêu cầu hỗ trợ quốc tế',
          impact: { humanitarian: 6, economic: -2, social: -1, diplomatic: 8 },
          explanation: 'Cân bằng giữa trách nhiệm nhân đạo và khả năng đáp ứng, đồng thời tăng cường hợp tác quốc tế.'
        },
        {
          id: 'c',
          text: 'Đóng cửa biên giới và từ chối tiếp nhận',
          impact: { humanitarian: -8, economic: 2, social: 1, diplomatic: -5 },
          explanation: 'Bảo vệ lợi ích quốc gia nhưng có thể gây tổn hại đến uy tín quốc tế và tinh thần nhân đạo.'
        }
      ]
    },
    {
      id: 2,
      title: 'Khủng hoảng môi trường',
      description: 'Một thảm họa môi trường xảy ra ở khu vực biển, ảnh hưởng đến nhiều quốc gia. Bạn phải đưa ra chiến lược ứng phó.',
      background: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      choices: [
        {
          id: 'a',
          text: 'Huy động tất cả nguồn lực để khắc phục ngay lập tức',
          impact: { environmental: 10, economic: -8, social: 5, diplomatic: 7 },
          explanation: 'Ưu tiên bảo vệ môi trường nhưng có thể gây thiệt hại kinh tế lớn.'
        },
        {
          id: 'b',
          text: 'Phối hợp với các quốc gia láng giềng để giải quyết chung',
          impact: { environmental: 8, economic: -4, social: 3, diplomatic: 10 },
          explanation: 'Giải pháp hợp tác quốc tế hiệu quả, chia sẻ gánh nặng và tăng cường quan hệ.'
        },
        {
          id: 'c',
          text: 'Tập trung vào phát triển kinh tế và bỏ qua vấn đề môi trường',
          impact: { environmental: -10, economic: 5, social: -3, diplomatic: -8 },
          explanation: 'Có thể mang lại lợi ích kinh tế ngắn hạn nhưng gây hại lâu dài cho môi trường và quan hệ quốc tế.'
        }
      ]
    },
    {
      id: 3,
      title: 'Cứu trợ nhân đạo',
      description: 'Một quốc gia đang phải đối mặt với nạn đói nghiêm trọng. Bạn phải quyết định cách thức viện trợ.',
      background: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
      choices: [
        {
          id: 'a',
          text: 'Viện trợ lương thực và y tế ngay lập tức',
          impact: { humanitarian: 10, economic: -6, social: 8, diplomatic: 6 },
          explanation: 'Đáp ứng nhu cầu cấp thiết nhưng có thể gây áp lực về ngân sách.'
        },
        {
          id: 'b',
          text: 'Viện trợ kết hợp với hỗ trợ phát triển bền vững',
          impact: { humanitarian: 8, economic: -3, social: 6, diplomatic: 9 },
          explanation: 'Giải pháp toàn diện, vừa cứu trợ khẩn cấp vừa hỗ trợ phát triển lâu dài.'
        },
        {
          id: 'c',
          text: 'Từ chối viện trợ do lo ngại về tình hình chính trị',
          impact: { humanitarian: -8, economic: 2, social: -5, diplomatic: -7 },
          explanation: 'Bảo vệ lợi ích quốc gia nhưng có thể gây tổn hại đến uy tín và quan hệ quốc tế.'
        }
      ]
    }
  ]

  useEffect(() => {
    let timer
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      endGame()
    }
    return () => clearTimeout(timer)
  }, [gameState, timeLeft])

  const startGame = () => {
    setGameState('playing')
    setCurrentScenario(0)
    setScore(0)
    setTimeLeft(300)
    setGameHistory([])
  }

  const pauseGame = () => {
    setGameState('paused')
  }

  const resumeGame = () => {
    setGameState('playing')
  }

  const endGame = () => {
    setGameState('completed')
  }

  const resetGame = () => {
    setGameState('menu')
    setCurrentScenario(0)
    setScore(0)
    setTimeLeft(300)
    setSelectedChoice(null)
    setShowResult(false)
    setGameHistory([])
  }

  const selectChoice = (choice) => {
    setSelectedChoice(choice)
    setShowResult(true)
    
    // Calculate score based on impact
    const totalImpact = Object.values(choice.impact).reduce((sum, value) => sum + value, 0)
    const newScore = Math.max(0, score + totalImpact)
    setScore(newScore)
    
    // Add to history
    setGameHistory(prev => [...prev, {
      scenario: scenarios[currentScenario],
      choice: choice,
      score: totalImpact
    }])
  }

  const nextScenario = () => {
    setSelectedChoice(null)
    setShowResult(false)
    
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1)
    } else {
      endGame()
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const renderMenu = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <Globe className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Virtual Global Citizen Game
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Trải nghiệm các tình huống xuyên quốc gia và học cách đưa ra quyết định như một công dân toàn cầu thực thụ.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <Target className="w-8 h-8 text-primary-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">3 Tình huống</h3>
          <p className="text-gray-600 text-sm">Khám phá các vấn đề toàn cầu khác nhau</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Hệ thống điểm</h3>
          <p className="text-gray-600 text-sm">Đánh giá quyết định của bạn</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <Users className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Tương tác</h3>
          <p className="text-gray-600 text-sm">Học hỏi từ kết quả</p>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button onClick={startGame} className="px-8 py-4 rounded-full bg-primary-600 text-white font-bold shadow-lg flex items-center justify-center text-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 transition whitespace-nowrap">
          <Play className="w-5 h-5 mr-2" />
          Bắt đầu chơi
        </button>
      </div>
    </motion.div>
  )

  const renderGame = () => {
    const scenario = scenarios[currentScenario]
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Game Header */}
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={gameState === 'playing' ? pauseGame : resumeGame}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {gameState === 'playing' ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <div>
                <div className="text-sm text-gray-500">Thời gian</div>
                <div className="font-mono text-lg font-bold">{formatTime(timeLeft)}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-500">Điểm</div>
              <div className={`text-lg font-bold ${getScoreColor(score)}`}>{score}</div>
            </div>
          </div>
        </div>

        {/* Scenario */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-48">
            <img
              src={scenario.background}
              alt={scenario.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-2xl font-bold mb-1">{scenario.title}</h2>
              <p className="text-sm opacity-90">Tình huống {currentScenario + 1} / {scenarios.length}</p>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-700 mb-6 leading-relaxed">
              {scenario.description}
            </p>

            {!showResult ? (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 mb-4">Chọn quyết định của bạn:</h3>
                {scenario.choices.map((choice, index) => (
                  <motion.button
                    key={choice.id}
                    onClick={() => selectChoice(choice)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold mr-3">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="font-medium">{choice.text}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Kết quả quyết định</h4>
                      <p className="text-blue-700">{selectedChoice.explanation}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(selectedChoice.impact).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className={`text-lg font-bold ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {value >= 0 ? '+' : ''}{value}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {key === 'humanitarian' ? 'Nhân đạo' :
                         key === 'economic' ? 'Kinh tế' :
                         key === 'social' ? 'Xã hội' :
                         key === 'diplomatic' ? 'Ngoại giao' :
                         key === 'environmental' ? 'Môi trường' : key}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={nextScenario}
                  className="w-full btn-primary flex items-center justify-center"
                >
                  {currentScenario < scenarios.length - 1 ? 'Tình huống tiếp theo' : 'Kết thúc'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  const renderCompleted = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <Trophy className="w-12 h-12 text-white" />
      </div>
      
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Chúc mừng!
      </h1>
      
      <div className="bg-white rounded-lg p-6 shadow-lg mb-6 max-w-md mx-auto">
        <div className={`text-3xl font-bold mb-2 ${getScoreColor(score)}`}>
          {score} điểm
        </div>
        <div className="text-gray-600">
          {score >= 80 ? 'Xuất sắc! Bạn là một công dân toàn cầu thực thụ!' :
           score >= 60 ? 'Tốt! Bạn có khả năng đưa ra quyết định cân bằng.' :
           'Cần cải thiện! Hãy học hỏi thêm về các vấn đề toàn cầu.'}
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={resetGame}
          className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-secondary-500 text-white font-bold shadow-lg flex items-center justify-center text-lg hover:from-primary-700 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 transition whitespace-nowrap"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Chơi lại
        </button>
        
        <div className="text-sm text-gray-500">
          Chia sẻ kết quả với bạn bè và khuyến khích họ tham gia!
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && renderMenu()}
          {(gameState === 'playing' || gameState === 'paused') && renderGame()}
          {gameState === 'completed' && renderCompleted()}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Game 