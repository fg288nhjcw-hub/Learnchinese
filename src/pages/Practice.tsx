import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, XCircle } from 'lucide-react'

function Practice() {
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isFinished, setIsFinished] = useState(false)

  const quizSections = [
    {
      title: 'Pinyin & Tones',
      icon: '🔤',
      quizzes: [
        {
          question: 'Which is the correct Pinyin for "你好" (Hello)?',
          options: ['nǐ hāo', 'nǐ hǎo', 'ní hǎo', 'nī hǎo'],
          correct: 1,
          explanation: '"你好" is pronounced "nǐ hǎo". Both syllables use the third tone (falling-rising tone).'
        },
        {
          question: 'What does "谢谢" mean?',
          options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'],
          correct: 2,
          explanation: '"谢谢" (xièxiè) means "Thank you". One of the most useful words in Chinese!'
        },
        {
          question: 'Which Pinyin matches the character "六" (six)?',
          options: ['sān', 'sì', 'liù', 'wǔ'],
          correct: 2,
          explanation: '"六" is pronounced "liù" with a fourth tone. The other options are 三(sān), 四(sì), 五(wǔ).'
        },
        {
          question: 'What is the correct Pinyin for "再见" (Goodbye)?',
          options: ['zài jiān', 'zài jiàn', 'zhài jiàn', 'zāi jiàn'],
          correct: 1,
          explanation: '"再见" = zài jiàn. Fourth tone on "zài", fourth tone on "jiàn".'
        },
        {
          question: 'How many tones are there in Mandarin Chinese?',
          options: ['3', '4', '5', '6'],
          correct: 2,
          explanation: 'There are 4 main tones plus a neutral tone (5 total): first(¯), second(ˇ), third(˘), fourth(`), neutral.'
        }
      ]
    },
    {
      title: 'Vocabulary Quiz',
      icon: '📚',
      quizzes: [
        {
          question: 'Which word means "family member" in Chinese?',
          options: ['苹果 (apple)', '火车站 (station)', '姐姐 (older sister)', '面条 (noodles)'],
          correct: 2,
          explanation: '"姐姐" (jiějie) means "older sister". Family terms are essential vocabulary for beginners.'
        },
        {
          question: 'What does "多少钱" mean?',
          options: ['How many?', 'How much money?', 'Where is it?', 'What time?'],
          correct: 1,
          explanation: '"多少" means "how much/many". Adding "钱" (money) specifically asks about price.'
        },
        {
          question: 'Which color is "绿色" (lǜ sè)?',
          options: ['Red', 'Blue', 'Green', 'Yellow'],
          correct: 2,
          explanation: '"绿色" (lǜ sè) = Green. 红色=Red, 蓝色=Blue, 黄色=Yellow.'
        },
        {
          question: 'What day of the week is "星期五"?',
          options: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
          correct: 2,
          explanation: '星期一(Mon), 二(Tue), 三(Wed), 四(Thu), 五(Fri), 六(Sat), 日(Sun).'
        },
        {
          question: '"我想吃饭" means:',
          options: ["I don't want to eat", "I want to eat / I'm hungry", "I ate already", "I like food"],
          correct: 1,
          explanation: '"想" (xiǎng) = want/to feel like. "吃" (chī) = eat. So it means "I want to eat."'
        },
        {
          question: 'Which one is NOT a family member?',
          options: ['弟弟 (younger brother)', '朋友 (friend)', '妈妈 (mother)', '爷爷 (grandfather)'],
          correct: 1,
          explanation: '"朋友" (péngyou) = friend. All others are family members: 弟弟(younger brother), 妈妈(mother), 爷爷(grandfather).'
        },
        {
          question: '"今天天气很好" means:',
          options: ["Today's weather is very good", "Today is very hot", "It will rain today", "The temperature is low"],
          correct: 0,
          explanation: '"今天" (today) + "天气" (weather) + "很" (very) + "好" (good) = Today\'s weather is very good.'
        }
      ]
    },
    {
      title: 'Dialogue Comprehension',
      icon: '💬',
      quizzes: [
        {
          question: 'Someone says "请问，地铁站怎么走？". What do they want to know?',
          options: ['What time the subway opens', 'How far the subway station is', 'How to get to the subway station', 'The subway ticket price'],
          correct: 2,
          explanation: '"怎么走" (zěnme zǒu) literally means "how to walk/get to". They are asking for directions.'
        },
        {
          question: 'In a restaurant, you say "买单" or "结账". This means:',
          options: ['Ordering food', 'Asking for menu', 'Paying the bill', 'Making reservation'],
          correct: 2,
          explanation: '"买单" (mǎidān) and "结账" (jiézhàng) both mean "check please" / pay the bill.'
        },
        {
          question: 'If someone asks "你叫什么名字？", they want to know:',
          options: ['Your age', 'Your name', 'Where you live', 'Your job'],
          correct: 1,
          explanation: '"你叫什么名字？" (Nǐ jiào shénme míngzi?) = What\'s your name? / What are you called?'
        },
        {
          question: '"不好意思" can be used as:',
          options: ['Only an apology', 'Excuse me / Sorry — multiple uses', 'A greeting phrase', 'Saying goodbye'],
          correct: 1,
          explanation: '"不好意思" is versatile! It can mean "excuse me", "sorry", or be used when politely getting attention.'
        },
        {
          question: 'When someone says "慢慢吃" at a meal, they mean:',
          options: ['Eat slowly because it is hot', 'Enjoy your meal / Take your time eating', 'Hurry up eating', 'Don\'t eat too much'],
          correct: 1,
          explanation: '"慢慢吃" (mànmàn chī) is a common Chinese phrase meaning "enjoy your meal" or "take your time eating."'
        },
        {
          question: '"我听不懂" means:',
          options: ['I understand', "I don't understand / I can't follow", "I'm listening", 'Please speak louder'],
          correct: 1,
          explanation: '"听不懂" (tīng bù dǒng) = I can\'t understand (what I hear). Very useful when learning Chinese!'
        }
      ]
    }
  ]

  // Flatten all quizzes
  const allQuizzes = quizSections.flatMap(section => section.quizzes)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    if (answerIndex === allQuizzes[currentQuiz].correct) {
      setScore(score + 1)
    }
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentQuiz < allQuizzes.length - 1) {
      setCurrentQuiz(currentQuiz + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setIsFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuiz(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setIsFinished(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost">← Back to Home</Button>
            </Link>
            <h1 className="text-2xl font-bold text-red-600">Interactive Practice</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {!isFinished ? (
            <>
              {/* Section indicator & Progress */}
              <div className="mb-6 space-y-3">
                {quizSections.map((section) => {
                  const startIdx = quizSections.slice(0, quizSections.indexOf(section)).reduce((sum, s) => sum + s.quizzes.length, 0)
                  const endIdx = startIdx + section.quizzes.length - 1
                  const currentInSection = currentQuiz >= startIdx && currentQuiz <= endIdx
                  const completedBefore = Math.min(currentQuiz, endIdx) - startIdx + (currentInSection && showResult ? 1 : 0)

                  return (
                    <div key={section.title} className={`rounded-lg p-3 transition-all ${currentInSection ? 'bg-red-100 border-2 border-red-400' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-sm">{section.icon} {section.title}</span>
                        <span className="text-xs text-gray-500">{section.quizzes.length} questions</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`rounded-full h-2 transition-all ${currentInSection ? 'bg-red-600' : 'bg-green-400'}`}
                          style={{
                            width: `${Math.max(0, Math.min(completedBefore / section.quizzes.length * 100, 100))}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Question counter */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Question {currentQuiz + 1} of {allQuizzes.length}</span>
                  <span>✅ Score: {score}</span>
                </div>
              </div>

              {/* Quiz Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg leading-relaxed">{allQuizzes[currentQuiz].question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {allQuizzes[currentQuiz].options.map((option, index) => {
                      let variantClass: "outline" | "default" | "destructive"
                      if (!showResult) {
                        variantClass = 'outline'
                      } else if (index === allQuizzes[currentQuiz].correct) {
                        variantClass = 'default'
                      } else if (index === selectedAnswer) {
                        variantClass = 'destructive'
                      } else {
                        variantClass = 'outline'
                      }

                      return (
                        <Button
                          key={index}
                          variant={variantClass}
                          className="w-full justify-start text-left h-auto py-3 px-6"
                          onClick={() => !showResult && handleAnswer(index)}
                          disabled={showResult}
                        >
                          <span className="mr-3 font-bold w-6">{String.fromCharCode(65 + index)}.</span>
                          <span className="flex-1">{option}</span>
                          {showResult && index === allQuizzes[currentQuiz].correct && (
                            <CheckCircle2 className="w-5 h-5 ml-2 flex-shrink-0" />
                          )}
                          {showResult && index === selectedAnswer && index !== allQuizzes[currentQuiz].correct && (
                            <XCircle className="w-5 h-5 ml-2 flex-shrink-0" />
                          )}
                        </Button>
                      )
                    })}
                  </div>

                  {showResult && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>📖 Explanation:</strong> {allQuizzes[currentQuiz].explanation}
                      </p>
                    </div>
                  )}

                  {showResult && (
                    <div className="mt-6 flex justify-end">
                      <Button onClick={handleNext}>
                        {currentQuiz < allQuizzes.length - 1 ? 'Next Question →' : 'View Results 🏆'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            /* Final Result */
            <Card>
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl">Practice Complete!</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="my-8">
                  <div className="text-7xl mb-4">
                    {score === allQuizzes.length ? '🎉' : score >= allQuizzes.length * 0.7 ? '👍' : score >= allQuizzes.length * 0.4 ? '💪' : '📚'}
                  </div>
                  <p className="text-xl font-bold text-gray-800 mb-2">
                    Score: {score} / {allQuizzes.length}
                  </p>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    ({Math.round(score / allQuizzes.length * 100)}%)
                  </p>
                  <p className="text-gray-600 mt-4 max-w-md mx-auto">
                    {score === allQuizzes.length
                      ? 'Amazing! Perfect score! You have mastered these topics!'
                      : score >= allQuizzes.length * 0.7
                      ? 'Great job! You have a solid understanding. Keep practicing to improve further!'
                      : score >= allQuizzes.length * 0.4
                      ? 'Good effort! Review the explanations above and try again. Practice makes perfect!'
                      : "Keep studying! Try reviewing the Vocabulary and Dialogue sections before practicing again."
                    }
                  </p>
                </div>

                {/* Breakdown by section */}
                <div className="grid grid-cols-3 gap-3 my-6 max-w-md mx-auto">
                  {quizSections.map(section => (
                    <div key={section.title} className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xl mb-1">{section.icon}</div>
                      <div className="text-xs font-medium text-gray-700">{section.title}</div>
                      <div className="text-sm font-bold text-red-600">{section.quizzes.length} Q</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 justify-center mt-8">
                  <Button onClick={handleRestart}>Try Again 🔄</Button>
                  <Link to="/">
                    <Button variant="outline">Back to Home 🏠</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Tips card */}
        {!isFinished && (
          <div className="max-w-2xl mx-auto mt-10">
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-base">💡 Study Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-red-900">
                  <li><strong>Don't guess:</strong> If you're unsure, think through each option carefully</li>
                  <li><strong>Read explanations:</strong> Each answer includes a detailed explanation</li>
                  <li><strong>Review mistakes:</strong> Pay extra attention to questions you got wrong</li>
                  <li><strong>Practice regularly:</strong> A little every day beats cramming once a week</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

export default Practice
