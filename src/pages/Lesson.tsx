import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { learningPlan, allInitials, allFinals, tones } from '@/data/pinyinData'
import { checkInToday, getProgress } from '@/utils/progress'
import SpeechButton from '@/components/SpeechButton'
import { CheckCircle } from 'lucide-react'

function Lesson() {
  const { day } = useParams<{ day: string }>()
  const dayNum = parseInt(day || '1')
  const lesson = learningPlan.find(l => l.day === dayNum)
  
  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const progress = getProgress()
    if (progress.completedDays.includes(dayNum)) {
      setCompleted(true)
    }
  }, [dayNum])

  if (!lesson) {
    return <div>Lesson not found</div>
  }

  const totalSteps = 3 // Learn → Practice → Check-in
  const initialsToShow = lesson.initials.length > 0 ? lesson.initials : allInitials.slice(0, 4)
  const finalsToShow = lesson.finals.length > 0 ? lesson.finals : allFinals.slice(0, 2)

  const handleCheckIn = () => {
    checkInToday(dayNum)
    setCompleted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/pinyin">
              <Button variant="ghost">← Back to Course</Button>
            </Link>
            <h1 className="text-2xl font-bold text-green-600">
              Day {dayNum}: {lesson.title.split(':')[1]}
            </h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Progress</span>
            <Progress value={(currentStep / totalSteps) * 100} className="flex-1 h-2" />
            <span className="text-sm text-gray-600">{currentStep + 1} / {totalSteps}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Step 0: Learn */}
          {currentStep === 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">📖 Learn Today's Content</h2>
              
              {/* Initials */}
              {initialsToShow.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Initials (声母)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {initialsToShow.map((item) => (
                      <Card key={item.letter}>
                        <CardHeader>
                          <CardTitle className="text-3xl text-center">{item.letter}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-2xl font-bold">{item.chinese}</span>
                            <SpeechButton text={item.audioText || item.chinese} />
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{item.sound}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Finals */}
              {finalsToShow.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Finals (韵母)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {finalsToShow.map((item) => (
                      <Card key={item.letter}>
                        <CardHeader>
                          <CardTitle className="text-3xl text-center">{item.letter}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-2xl font-bold">{item.chinese}</span>
                            <SpeechButton text={item.audioText || item.chinese} />
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Tones */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Tones (声调)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {tones.filter(t => lesson.tonePractice.includes(tones.indexOf(t) + 1)).map((tone) => (
                    <Card key={tone.tone}>
                      <CardHeader>
                        <CardTitle className={`text-4xl text-center ${tone.color}`}>{tone.tone}</CardTitle>
                        <CardDescription className="text-center font-semibold">{tone.name}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-sm text-gray-600">{tone.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setCurrentStep(1)}>
                  Next: Practice →
                </Button>
              </div>
            </div>
          )}

          {/* Step 1: Practice */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">✍️ Practice</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-600 mb-6">
                    Practice quiz coming soon! For now, try to pronounce each initial and final out loud.
                  </p>
                  <div className="space-y-4">
                    {initialsToShow.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold">Can you pronounce "{item.letter}"?</p>
                        <div className="flex items-center gap-2 mt-2">
                          <SpeechButton text={item.audioText || item.chinese} />
                          <span className="text-sm text-gray-600">Click to hear, then try to say it yourself</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setCurrentStep(0)}>← Back to Learn</Button>
                <Button onClick={() => setCurrentStep(2)}>Next: Check-in →</Button>
              </div>
            </div>
          )}

          {/* Step 2: Check-in */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">✅ Daily Check-in</h2>
              <Card className="text-center">
                <CardContent className="pt-6">
                  {!completed ? (
                    <>
                      <div className="text-6xl mb-4">🎯</div>
                      <h3 className="text-xl font-semibold mb-4">Ready to complete today's lesson?</h3>
                      <p className="text-gray-600 mb-6">
                        Make sure you've practiced pronouncing today's initials, finals, and tones.
                      </p>
                      <Button size="lg" onClick={handleCheckIn} className="bg-green-600 hover:bg-green-700">
                        Complete Day {dayNum} ✓
                      </Button>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-4">Day {dayNum} Completed! 🎉</h3>
                      <p className="text-gray-600 mb-6">Great job! Keep up the good work.</p>
                      <div className="flex gap-4 justify-center">
                        {dayNum < 15 && (
                          <Link to={`/lesson/${dayNum + 1}`}>
                            <Button>Next Lesson: Day {dayNum + 1} →</Button>
                          </Link>
                        )}
                        <Link to="/pinyin">
                          <Button variant="outline">Back to Course</Button>
                        </Link>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Lesson
