import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Link } from 'react-router-dom'
import { learningPlan } from '@/data/pinyinData'
import { getProgress, getCompletionPercentage } from '@/utils/progress'
import { useEffect, useState } from 'react'
import { CheckCircle, Lock, Play } from 'lucide-react'

function Pinyin() {
  const [progress, setProgress] = useState(getProgress())
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    setProgress(getProgress())
    setPercentage(getCompletionPercentage())
  }, [])

  const isDayUnlocked = (day: number) => {
    if (day === 1) return true
    return progress.completedDays.includes(day - 1) || progress.completedDays.length >= day - 1
  }

  const isDayCompleted = (day: number) => {
    return progress.completedDays.includes(day)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost">← Back to Home</Button>
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-green-600">Pinyin Course</h1>
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                FREE
              </span>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Progress Overview */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>
                Day {Math.min(progress.currentDay, 15)} of 15 • Streak: {progress.streak} days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Completion</span>
                    <span>{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-3" />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Completed: {progress.completedDays.length} / 15 days</span>
                  <span>Total Studied: {progress.totalDaysStudied} days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Plan */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">15-Day Learning Plan</h2>
          <div className="space-y-4">
            {learningPlan.map((lesson) => {
              const unlocked = isDayUnlocked(lesson.day)
              const completed = isDayCompleted(lesson.day)
              const isCurrent = lesson.day === progress.currentDay && !completed

              return (
                <Card
                  key={lesson.day}
                  className={`${!unlocked ? 'opacity-50' : ''} ${isCurrent ? 'border-green-500 border-2' : ''}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-shrink-0">
                          {completed ? (
                            <CheckCircle className="h-8 w-8 text-green-500" />
                          ) : !unlocked ? (
                            <Lock className="h-8 w-8 text-gray-400" />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                              <Play className="h-4 w-4 text-green-600" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {lesson.description}
                          </p>
                          <div className="flex gap-2 mt-2">
                            {lesson.initials.length > 0 && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                {lesson.initials.length} initials
                              </span>
                            )}
                            {lesson.finals.length > 0 && (
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                {lesson.finals.length} finals
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {!unlocked ? (
                          <Button disabled variant="outline">
                            Locked
                          </Button>
                        ) : completed ? (
                          <Link to={`/lesson/${lesson.day}`}>
                            <Button variant="outline">Review</Button>
                          </Link>
                        ) : (
                          <Link to={`/lesson/${lesson.day}`}>
                            <Button>
                              {isCurrent ? 'Start' : 'Continue'}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Tips */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="bg-green-50">
            <CardHeader>
              <CardTitle>Learning Tips 💡</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Complete one lesson per day for best results</li>
                <li>Practice pronunciation out loud - don't just read silently</li>
                <li>Use the 🔊 audio button to hear correct pronunciation</li>
                <li>If you miss a day, don't worry! Just continue from where you left off</li>
                <li>Review previous lessons regularly to reinforce learning</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Pinyin
