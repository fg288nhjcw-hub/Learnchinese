import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Practice() {
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isFinished, setIsFinished] = useState(false)

  const quizzes = [
    {
      question: 'Which of the following is the correct Pinyin for "你好" (Hello)?',
      options: ['nǐ hāo', 'nǐ hǎo', 'ní hǎo', 'nī hǎo'],
      correct: 1,
      explanation: 'The correct Pinyin for "你好" is "nǐ hǎo". The third tone is a falling-rising tone.'
    },
    {
      question: 'What does "谢谢" mean?',
      options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'],
      correct: 2,
      explanation: '"谢谢" means "Thank you". It is used to express gratitude.'
    },
    {
      question: 'Which of the following is the correct Pinyin for the number?',
      options: ['三 - sān', '四 - sì', '五 - wú', '六 - liù'],
      correct: 3,
      explanation: 'The correct Pinyin for "六" (six) is "liù". The tone mark is on the "u".'
    },
    {
      question: 'What is the Pinyin for "再见" (Goodbye)?',
      options: ['zài jiān', 'zài jiàn', 'zhài jiàn', 'zāi jiàn'],
      correct: 1,
      explanation: 'The Pinyin for "再见" is "zài jiàn", which means goodbye.'
    },
    {
      question: 'Which of the following is a family member?',
      options: ['苹果 (apple)', '火车站 (train station)', '姐姐 (older sister)', '面条 (noodles)'],
      correct: 2,
      explanation: '"姐姐" is a family member, meaning "older sister".'
    }
  ]

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    if (answerIndex === quizzes[currentQuiz].correct) {
      setScore(score + 1)
    }
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentQuiz < quizzes.length - 1) {
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
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Question {currentQuiz + 1} / {quizzes.length}</span>
                  <span>Score: {score}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuiz + 1) / quizzes.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Quiz Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{quizzes[currentQuiz].question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {quizzes[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={
                          showResult
                            ? index === quizzes[currentQuiz].correct
                              ? 'default'
                              : index === selectedAnswer
                              ? 'destructive'
                              : 'outline'
                            : 'outline'
                        }
                        className="w-full justify-start text-left h-auto py-4 px-6"
                        onClick={() => !showResult && handleAnswer(index)}
                        disabled={showResult}
                      >
                        <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showResult && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Explanation:</strong> {quizzes[currentQuiz].explanation}
                      </p>
                    </div>
                  )}

                  {showResult && (
                    <div className="mt-6 flex justify-end">
                      <Button onClick={handleNext}>
                        {currentQuiz < quizzes.length - 1 ? 'Next Question' : 'View Results'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            /* Final Result */
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Practice Complete!</CardTitle>
                <CardDescription className="text-xl mt-4">
                  Your Score: {score} / {quizzes.length}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="my-8">
                  <div className="text-6xl mb-4">
                    {score === quizzes.length ? '🎉' : score >= quizzes.length / 2 ? '👍' : '💪'}
                  </div>
                  <p className="text-gray-600">
                    {score === quizzes.length
                      ? 'Excellent! You got all questions right!'
                      : score >= quizzes.length / 2
                      ? 'Good job! Keep practicing!'
                      : 'Don\'t give up, practice makes perfect!'}
                  </p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button onClick={handleRestart}>Try Again</Button>
                  <Link to="/">
                    <Button variant="outline">Back to Home</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

export default Practice
